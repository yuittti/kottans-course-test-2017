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
      <div className="userForm">
      {this.state.reseted &&
        <form onSubmit={this.submitForm}>
          <label>GitHub user</label>
          <input type="text" 
            id="userName" 
            autoComplete="off"
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      }

      {!this.state.reseted &&
        <button onClick={this.resetUser}>Change user</button>
      }
      </div>
      
      
    )
  }
}

export default Form;