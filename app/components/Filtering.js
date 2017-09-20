import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

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

  const onDateChange = (date) => {
     props.onFilterChange('updated', date);
  }

  return (
     <div className="filterbar">
        <div className="filterbar-title">
          <label className="form-label">Filter by: </label>
        </div>
        <div className="filterbar-col-wrapper">
          <div className="filterbar-col">
            <div className="filterbar-item">
              <input 
                type="checkbox" 
                name="oIssues"
                id="oIssues" 
                checked={props.filters.oIssues} 
                onChange={onFilterChange} />
              <label htmlFor="oIssues" className="form-label">Has open issues</label>
            </div>

            <div className="filterbar-item">
              <input 
                type="checkbox" 
                name="topics"
                id="topics" 
                checked={props.filters.topics} 
                onChange={onFilterChange} />
              <label htmlFor="topics" className="form-label">Has topics</label>
            </div>
          </div>

          <div className="filterbar-col">
            <div className="filterbar-item">
              <label htmlFor="type" className="form-label">Choose type</label>

              <select id="type" onChange={onFilterChange} value={props.filters.type}>
                <option value="all">All</option>
                <option value="forks">Forks</option>
                <option value="sources">Sources</option>
              </select>
            </div>

            <div className="filterbar-item">
              <label htmlFor="lang" className="form-label">Choose language</label>

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

          <div className="filterbar-col">
            <div className="filterbar-item">
              <label htmlFor="starred" className="form-label">Number of stars</label>

              <input type="number" id="starred" min="0" value={props.filters.starred} onChange={onFilterChange} />
            </div>

            <div className="filterbar-item">
              <label htmlFor="starred" className="form-label">Updated after</label>

              <DatePicker 
                selected={props.filters.updated} 
                onChange={onDateChange} 
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select" />
            </div>
          </div>
        </div>
        
        

        
    </div>
  )
}

export default Filtering;