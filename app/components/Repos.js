import React from 'react';
import moment from 'moment';
import Sorting from './Sorting';
import Filtering from './Filtering';
import Modal from './Modal';
import { formatDate } from '../utils/utils.js'

class Repos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fRepos: '',
      rLangs: [],
      sortBy: 'name',
      sortDir: 'asc',
      filters: {
        oIssues: false,
        topics: false,
        type: 'all',
        lang: 'all',
        starred: 0,
        updated: moment()
      },
      modalOpened: false
    }

    this.onSortParamChange = this.onSortParamChange.bind(this);
    this.onSortDirChange = this.onSortDirChange.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.sortRepos = this.sortRepos.bind(this);
    this.filterRepos = this.filterRepos.bind(this);
    this.onCardClick = this.onCardClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    // get arr of unique vals of all repos' langs
    let langs = [...new Set(this.props.repos.map( el => el.language ))];
    langs = langs.filter( el => !!el);
    // get arr of repos' upd dates and set it as filter by date after
    let updDates = [...this.props.repos.map( el => new Date(el.updated_at) )];
    let smallestDate = new Date(Math.min.apply(null, updDates));
    const newFiltersState = this.state.filters;
    newFiltersState['updated'] = moment(smallestDate);

    this.setState((prevState) => {
      return {
        fRepos: this.props.repos,
        rLangs: langs,
        filters: newFiltersState
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    // get arr of unique vals of all repos' langs
    let langs = [...new Set(nextProps.repos.map( el => el.language ))];
    langs = langs.filter( el => !!el);
    // get arr of repos' upd dates and set it as filter by date after
    let updDates = [...nextProps.repos.map( el => new Date(el.updated_at) )];
    let smallestDate = new Date(Math.min.apply(null, updDates));
    const newFiltersState = this.state.filters;
    newFiltersState['updated'] = moment(smallestDate);

    this.setState(() => {
      return {
        fRepos: nextProps.repos,
        rLangs: langs,
        filters: newFiltersState
      }
    })
  }

  onFilterChange(fName, fVal) {
    this.setState((prevState) => {
      const newFiltersState = prevState.filters;
      newFiltersState[fName] = fVal;
      return {
        filters: newFiltersState        
      }
    })
  }

  onSortDirChange(val) {
    this.setState((prevState) => {
      return {
        sortDir: val
      }
    })
  }

  onSortParamChange(val) {
    this.setState((prevState) => {
      return {
        sortBy: val
      }
    });

  }

  filterRepos(r) {
    let { oIssues, topics, type, lang, starred, updated } = this.state.filters;
    let checkArr = [];

    if (oIssues) {
      checkArr.push(r.open_issues_count > 0)
    }

    if (topics) {
      checkArr.push(r.topics.length > 0)
    }

    if (type === 'forks') {
      checkArr.push(!!r.fork)
    } else if (type === 'sources') {
      checkArr.push(!r.fork)
    } else {
      checkArr.push(true)
    }

    if (lang !== 'all') {
      checkArr.push(!!r.language && r.language.toLowerCase() === lang)
    }

    if (starred === starred) {
      checkArr.push(r.stargazers_count >= starred);
    }

    if (r.updated_at.length > 0) {
      checkArr.push(moment(r.updated_at) >= updated);
    }




    if (checkArr.length) {
      return checkArr.every( el => el );
    }

    return true;
  }

  sortRepos(r1, r2) {
    let sortParam = this.state.sortBy;
    let sortDir = this.state.sortDir;
    let a = r1[sortParam];
    let b = r2[sortParam];

    switch (sortParam) {
      case 'name':
        if (sortDir === 'asc') {
          if (a.toLowerCase() < b.toLowerCase()) return -1;
          if (a.toLowerCase() > b.toLowerCase()) return 1;
          return 0;
        } else {
          if (a.toLowerCase() > b.toLowerCase()) return -1;
          if (a.toLowerCase() < b.toLowerCase()) return 1;
          return 0;
        }
        
      case 'stargazers_count':
        if (sortDir === 'asc') {
          return a - b;
        } else {
          return b - a;
        }
        
      case 'open_issues_count':
        if (sortDir === 'asc') {
          return a - b;
        } else {
          return b - a;
        }
        
      case 'updated_at':
        if (sortDir === 'asc') {
          return new Date(a).getTime() - new Date(b).getTime();
        } else {
          return new Date(b).getTime() - new Date(a).getTime();
        }
    }
  }

  onCardClick(event) {
    this.setState( () => {
      return {
        modalOpened: true
      }
    })
  }

  closeModal() {
    this.setState( () => {
      return {
        modalOpened: false
      }
    })
  }



  render() {
    return (
      <div className="repos-wrapper">

        <Sorting 
          sortBy={this.state.sortBy} 
          sortDir={this.state.sortDir} 
          onSortDirChange={this.onSortDirChange} 
          onSortParamChange={this.onSortParamChange} 
        />

        <Filtering
          filters={this.state.filters}
          langs={this.state.rLangs} 
          onFilterChange={this.onFilterChange}
        />

        <div className="repos-list">
        {this.state.fRepos.filter(this.filterRepos).sort(this.sortRepos).map((repo, index) => {
          return (
          <div 
            className='repos-item'
            key={`${repo.name}-${index}`}
            onClick={this.onCardClick} >

            <div className="repos-item-line">
              <span className="repos-item-label">Repo:</span>
              <span className="repos-item-txt __name">
                {repo.name}
              </span>
            </div>
              
            <div className="repos-item-line">
              <span className="repos-item-label">Desc:</span>
              <span className="repos-item-txt">
                {repo.description}
              </span>
            </div>

            <div className="repos-item-line">
              <span className="repos-item-label">Fork:</span>
              <span className="repos-item-txt">
                {repo.fork ? 'Yeap' : 'Nope'}
              </span>
            </div>

            <div className="repos-item-line">
              <span className="repos-item-label">Rate:</span>
              <span className="repos-item-txt __stars">
                {repo.stargazers_count}
              </span>
            </div>

            <div className="repos-item-line">
              <span className="repos-item-label">Upd:</span>
              <span className="repos-item-txt">
                {formatDate(repo.updated_at)}
              </span>
            </div>

            <div className="repos-item-line">
              <span className="repos-item-label">Lang:</span>
              <span className="repos-item-txt">
                {repo.language}
              </span>
            </div>

            <div className="repos-item-line">
              <span className="repos-item-label">Open issues:</span>
              <span className="repos-item-txt">
                {repo.open_issues_count}
              </span>
            </div>
          </div>
          )
        })}
        </div>
        <Modal modalOpened={this.state.modalOpened} closeModal={this.closeModal} />
      </div>
    )
  }
}

export default Repos;