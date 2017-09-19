import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reseted: true,
      user: ''
    }

    this.submitForm = this.submitForm.bind(this);
    this.resetUser = this.resetUser.bind(this);
    this.handleChange = this.handleChange.bind(this);


  }
  // ----------------------------------

  handleChange(event) {
    let val = event.target.value;

    this.setState( () => {
      return {
        user: val
      }
    })
  }
  // ----------------------------------

  submitForm(event) {
    event.preventDefault();

    this.props.handleSubmit(this.state.user);

    this.setState( () => {
      return {
        reseted: false
      }
    })
  }
  // ----------------------------------

  resetUser(event) {
    this.setState( () => {
      return {
        reseted: true,
        user: ''

      }
    });

    this.props.handleSubmit('');
  }
  // ----------------------------------

  render() {
    return (
      <div className="page-sidebar">
      {this.state.reseted &&
        <form onSubmit={this.submitForm} className="form">
          <label className="title" htmlFor="userName">GitHub user</label>
          <input type="text" 
            id="userName" 
            autoComplete="off"
            onChange={this.handleChange}
            className="form-input"
          />
          <button type="submit" className="button">Submit</button>
        </form>
      }

      {!this.state.reseted &&
        <button onClick={this.resetUser} className="button">Change user</button>
      }
      </div>
      
      
    )
  }
}

export default Form;