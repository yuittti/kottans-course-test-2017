import React from 'react';

const Sorting = (props) => {

  const onSortDirChange = (event) => {
    let val = event.target.value;
    props.onSortDirChange(val);
  }
  
  const onSortParamChange = (event) => {
    let val = event.target.value;
    props.onSortParamChange(val);
  }

  return (
    <div className="sortbar">
      <div>
        <span>Sort by: </span>

        <select onChange={onSortParamChange} value={props.sortBy}>
          <option value="name">Name</option>
          <option value="stargazers_count">Stars</option>
          <option value="open_issues_count">Open Issues</option>
          <option value="updated_at">Update date</option>
        </select>
      </div>

      <div>
        <span>Sort direction: </span>

        <select onChange={onSortDirChange} value={props.sortDir}>
          <option value="desc">Desc</option>
          <option value="asc">Asc</option>
        </select>
      </div>
    </div>
  )
}

export default Sorting;