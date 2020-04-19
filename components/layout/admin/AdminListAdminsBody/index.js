import algoliasearch from 'algoliasearch';
import React, { Component } from 'react';
import {homeCls} from './styles';
import Link from 'next/link';
import deleteAdmin from '../../../../scripts/adminscripts/deleteAdmin';
import Router from 'next/router';
import {
    InstantSearch,
    Hits,
    SearchBox,
    Pagination,
    Highlight,
    ClearRefinements,
    RefinementList,
    Configure,
  } from 'react-instantsearch-dom';
import {Button} from 'antd';
import reindexAdminsFirebaseToAlgolia from '../../../../scripts/adminscripts/indexingalgoliascripts/reindexAdminsFirebaseToAlgolia';
import {db, auth} from '../../../../services/firebase'


  // configure algolia
  const searchClient = algoliasearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_API_KEY
  );

function Hit(props) {
  return (
    <div css="homeCls">
      <div className="hit-name">
        <Highlight attribute="Name" hit={props.hit} />
      </div>
      <b>User ID:</b>
      <div className="hit-uid">
        <Highlight attribute="uid" hit={props.hit} />
      </div>
      <b>Search Committee:</b>
      <div className="hit-searchcommittee">
        <Highlight attribute="SearchCommittee_ID_FK" hit={props.hit} />
      </div>
      <Button type="dashed" onClick={function(){
        deleteAdmin(props.hit.uid);
        db.ref("Admins").once("value", snapshot => {
          return reindexAdminsFirebaseToAlgolia();
        });
      }}>
        <Link href='/admin_console'>
            <a>Remove from List</a>
        </Link>
      </Button>
    </div>
  );
}

class AdminJobListingsBody extends Component{
    static async getInitialProps(){
      await db.ref("Admins/".concat(auth.currentUser.uid)).once("value", snapshot => {
        return reindexAdminsFirebaseToAlgolia();
    })
    }
    constructor(props){
        super(props);
        this.state={
          index: "",
          loading: true
      }
    }
    async componentDidMount(){
      await this.getIndex()
    }
    async getIndex(){
      await db.ref("Admins/").once("value", snapshot => {
          reindexAdminsFirebaseToAlgolia();
          this.setState({index: "ADMINS", loading: false})
      });
  }

    render(){
        
        return this.state.loading ? (
                <div>
                    Loading...
                </div>
        ) : (
              <div css={homeCls}>
                <Button
                type="ghost"
                onClick={function(){
                    Router.push("/admin_addadmin")
                }
                }>
                    Add an employee as admin/employer
                </Button>
                <div className="ais-InstantSearch">
                  <InstantSearch
                  searchClient={searchClient}
                  indexName={this.state.index}
                  initialUiState= {{
                    indexName: {
                      query: '5',
                      }
                  }}>
                  <div className="left-panel">
                    <Configure hitsPerPage={8} />
                  </div>
                  <div className="right-panel">   
                    <SearchBox />
                    <Hits hitComponent={Hit}/>
                    <Pagination />
                  </div>
                  </InstantSearch>
                </div>   
            </div>
        );
    }
}
export default AdminJobListingsBody;