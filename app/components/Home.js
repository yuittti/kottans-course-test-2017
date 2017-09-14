import React from 'react';
import { fetchRepos } from '../utils/api.js';
import Form from './Form';
import Repos from './Repos';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      user: '',
      page: 1,
      repos: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
    
  }

  handleSubmit(userName) {
    if (!userName || !userName.length) {
      // reset state data
      this.setState( () => {
        return {
          user: '',
          page: 1,
          repos: ''
        }
      })
    } else {
      // update state data
      fetchRepos(userName, this.state.page)
        .then( ({data}) => {
          
          let isMore = true;
          if (!data.length || data.length < 10) {
            isMore = false;
          }

          this.setState( (prevState) => {
            return {
              user: userName,
              page: isMore ? prevState.page + 1 : 0,
              repos: data
            }
          })

        });
    }
  }
  // ----------------------------------

  handleLoadMore() {
    fetchRepos(this.state.user, this.state.page)
      .then( ({data}) => {
        
        let isMore = true;
        if (!data.length || data.length < 10) {
          isMore = false;
        }

        this.setState( (prevState) => {
          return {
            page: isMore ? prevState.page + 1 : 0,
            repos: prevState.repos.concat(data)
          }
        })

      });
  }
  // ----------------------------------

  render () {
    return (
      <div className='container'>

        <Form handleSubmit={this.handleSubmit} />

        {this.state.repos && 
        <Repos repos={this.state.repos} />
        }

        {this.state.repos && this.state.page > 0 &&
        <button 
          className="load-loadMore" 
          onClick={this.handleLoadMore}>
          Load More
        </button>
        }
      </div>
    )
  }
}

export default Home;