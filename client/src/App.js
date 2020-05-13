import React, { PureComponent } from 'react';
import './css/App.css'

class App extends PureComponent {
  constructor(props) {
    super(props)
    this.errors = []
  }
  createFieldLayoutItem = (labelText, textType, submitText) => {
    return (
      <div className='fieldLayout'>
        {
          !submitText ?
            <div className='labelHeader'>
              {
                labelText ? <label>{labelText}: </label> : null
              }
            </div> :
            <div></div>
        }
        <div>
          {
            submitText ?
              <input
                type={textType}
                className='textbox'
                value={submitText}>
              </input>
              :
              <input
                type={textType}
                className='textbox'
                onChange={this.validateUsername}>
              </input>
          }
        </div>
      </div>
    )
  }

  validateUsername = (e) => {
    if (e.target.value.split('').length > 15) {
      this.errors.push('Username must be no more than 15 characters')
      this.generateErrorReport()
    }
  }

  generateErrorReport = () => {
    console.log(this.errors.length)
    if (!this.errors.length) {
      return null
    }
    const formErrors = this.errors.map((item, ix) => {
      return <li className='errors' key={ix}>{item}</li>
    })
    return (
      <div className='fieldLayout'>
        <div></div>
        <div className='errorResults'>
          <ul>
            {formErrors}
            {/* <span className='errors'>hi</span> */}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className='divLayout'>
        <div>
          <h2>Create your Lightfeather Code Challenge Account</h2>
        </div>
        <div className='itemLayout'>
          {
            this.createFieldLayoutItem('Username', 'text')
          }
          {
            this.createFieldLayoutItem('Email', 'text')
          }
          {
            this.createFieldLayoutItem('Password', 'password')
          }
          {
            this.createFieldLayoutItem('Confirm Password', 'password')
          }
          {
            this.createFieldLayoutItem('', 'submit', 'Sign Up!')
          }
        </div>
      </div >
    );
  }
}

export default App;
