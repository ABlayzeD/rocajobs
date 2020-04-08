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
import applyToJob from '../../../scripts/applyToJob';


  // configure algolia
  const searchClient = algoliasearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_API_KEY
  );


const index = process.env.ALGOLIA_JOB_OPENINGS;

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
        applyToJob(props.hit.objectID)
        }
      }>
        Apply!
      </Button>
    </div>
  );
}


class HomeBody extends Component {
    render() {
        return (
              <div css={homeCls}>
                <div className="ais-InstantSearch">
                  <InstantSearch searchClient={searchClient} indexName={index}>
                  <div className="left-panel">
                    <ClearRefinements />
                    <h2>Salary</h2>
                    <RefinementList attribute="Salary" />
                    <h2>State</h2>
                    <RefinementList attribute="State" />
                    <h2>Level of Education</h2>
                    <RefinementList attribute="LevelEducation" />
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

export default HomeBody;