import React from 'react';

const Filtering = (props) => {

  const onFilterChange = (event) => {
    // console.log(name);
    
    let inpFilterType = event.target.type;
    if (inpFilterType === 'checkbox') {
      let { id, checked } = event.target;
      props.onFilterChange(id, checked);
    } else {
      let { id, value } = event.target;
      props.onFilterChange(id, value);
    }
        
  }

  return (
     <div className="filterbar">
      
        <span>Filter by: </span>
        <div>
          <input 
            type="checkbox" 
            name="oIssues"
            id="oIssues" 
            checked={props.filters.oIssues} 
            onChange={onFilterChange} />
          <label htmlFor="oIssues">Has open issues</label>
        </div>

        <div>
          <input 
            type="checkbox" 
            name="topics"
            id="topics" 
            checked={props.filters.topics} 
            onChange={onFilterChange} />
          <label htmlFor="topics">Has topics</label>
        </div>

        <div>
          <label htmlFor="type">Choose type</label>

          <select id="type" onChange={onFilterChange} value={props.filters.type}>
            <option value="all">All</option>
            <option value="forks">Forks</option>
            <option value="sources">Sources</option>
          </select>
        </div>

        <div>
          <label htmlFor="lang">Choose language</label>

          <select id="lang" onChange={onFilterChange} value={props.filters.lang}>
            <option value="all">All</option>
            {props.langs.map( (lng, ind) => {
              {/*if (!!lng && !!lng.length) {*/}
                return (
                  <option value={lng.toLowerCase()} key={`${lng}-${ind}`}>{lng}</option>
                )
              {/*}*/}
            })}
          </select>
        </div>

        
    </div>
  )
}

export default Filtering;