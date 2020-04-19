import algoliasearch from 'algoliasearch';
import React, { Component } from 'react';
import {homeCls} from './styles';

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
import adminSideJobReindexFirebaseToAlgolia from '../../../../scripts/adminscripts/indexingalgoliascripts/adminSideJobReindexFirebaseToAlgolia';
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
        <Highlight attribute="title" hit={props.hit} />
      </div>
      <div className="hit-description">
        <Highlight attribute="Description" hit={props.hit} />
      </div>
      <b>Required Level of Education:</b>
      <div className="hit-leveleducation">
        <Highlight attribute="LevelEducation" hit={props.hit} />
      </div>
      <b>Salary:</b>
      <div className="hit-salary">
        <Highlight attribute="Salary" hit={props.hit} />
      </div>
      <b>State:</b>
      <div className="hit-state">
        <Highlight attribute="State" hit={props.hit} />
      </div>
      
      <Button type="dashed" onClick={function(){
            <Link   href="/adminpendingapplications">
            <a>Messages
              </a>
            </Link>
        }
      }>
        View applications!
      </Button>
      <Button type="dashed" onClick={function(){
        removeJobFromDB(props.hit.objectID);
        db.ref("Admins/".concat(auth.currentUser.uid)).once("value", snapshot => {
          return adminSideJobReindexFirebaseToAlgolia(snapshot.val().SearchCommittee_ID_FK);
        });
      }}>
        Remove from List
      </Button>
    </div>
  );
}

class AdminJobListingsBody extends Component{
    static async getInitialProps(){

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
        var index;
        await db.ref("Admins/".concat(auth.currentUser.uid)).once("value", snapshot => {
            index= "SearchCommittee".concat(snapshot.val().SearchCommittee_ID_FK).concat(" Jobs");
            this.setState({index: index, loading: false})
        });
        
    }
    render(){
        
        return this.state.loading ? (
                <h1>
                    Loading...
                </h1>
        ) : (
              <div css={homeCls}>
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