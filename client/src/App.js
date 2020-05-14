import React, { PureComponent } from 'react'
import './css/App.css'

class App extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      usernameError: false,
      invalidEmail: false,
      passwordsDontMatch: false,
      username: '',
      email: '',
      initP: '',
      confirmP: '',
      submittable: false
    }
  }

  createFieldLayoutItem = (labelText, textType, submitText, autoComplete, id) => {
    const {
      usernameError,
      invalidEmail,
      passwordsDontMatch
    } = this.state
    const hasErrors = usernameError || invalidEmail || passwordsDontMatch
    let func
    switch (labelText) {
      case 'Username':
        func = this.setUserName
        break
      case 'Email':
        func = this.setEmail
        break
      case 'Password':
        func = this.storeInitP
        break
      case 'Confirm Password':
        func = this.storeConfirmP
        break
      default:
    }
    return (
      <div className='fieldLayout'>
        {
          !submitText
            ? <div className='labelHeader'>
              {
                labelText ? <label>{labelText}: </label> : null
              }
            </div>
            : <div></div>
        }
        <div>
          {
            submitText
              ? hasErrors || !this.allFieldsPass()
                ? <input
                  type={textType}
                  className='textbox'
                  value={submitText}
                  disabled>
                </input>
                : <input
                  type={textType}
                  className='textbox'
                  value={submitText}>
                </input>
              : <input
                type={textType}
                className='textbox'
                onBlur={func}
                autoComplete={autoComplete}
                id={id}
                data-test-id={id}>
              </input>
          }
        </div>
      </div>
    )
  }

  allFieldsPass = () => {
    const {
      usernameError,
      invalidEmail,
      passwordsDontMatch
    } = this.state
    return this.state.username.trim() !== '' &&
      this.state.email.trim() !== '' &&
      this.state.initP.trim() !== '' &&
      this.state.confirmP.trim() !== '' &&
      !usernameError &&
      !invalidEmail &&
      !passwordsDontMatch
  }

  storeInitP = (e) => {
    this.setState({
      initP: e.target.value
    }, this.runPasswordValidation)
  }

  storeConfirmP = (e) => {
    this.setState({
      confirmP: e.target.value
    }, this.runPasswordValidation)
  }

  setUserName = (e) => {
    this.setState({
      username: e.target.value
    }, this.runUsernameValidation)
  }

  setEmail = (e) => {
    this.setState({
      email: e.target.value
    }, this.runEmailValidation)
  }

  runUsernameValidation = () => {
    this.setState({
      usernameError: this.state.username.split('').length > 15 || this.state.username === ''
    })
  }

  runEmailValidation = () => {
    this.setState({
      // NOTE: This is a compromise. RFC 822 may not be performant to implement.
      // I would rather accept an invalid email than not let the form be submitted.
      // Ideally, we should ask for email twice (confirm)
      invalidEmail: !/\S+@\S+\.\S+/.test(this.state.email)
    })
  }

  runPasswordValidation = () => {
    this.setState({
      passwordsDontMatch: this.state.initP !== this.state.confirmP || this.state.initP.trim() === '' ||
          this.state.confirmP.trim() === ''
    })
  }

  renderErrorBlock = () => {
    const {
      usernameError,
      passwordsDontMatch,
      invalidEmail
    } = this.state
    return (
      <ul>
        {
          usernameError ? <li className='errors'>Invalid Username (1 to 15 characters)</li> : null
        }
        {
          invalidEmail ? <li className='errors'>Email is not in correct format (user@domain.tld)</li> : null
        }
        {
          passwordsDontMatch ? <li className='errors'>Passwords do not match</li> : null
        }
      </ul>
    )
  }

  render () {
    const {
      usernameError,
      passwordsDontMatch,
      invalidEmail
    } = this.state
    const hasErrors = usernameError || passwordsDontMatch || invalidEmail
    return (
      <div className='divLayout'>
        <div>
          <h2>Create your Lightfeather Code Challenge Account</h2>
        </div>
        <form>
          <div className='itemLayout'>
            {
              this.createFieldLayoutItem('Username', 'text', '', 'username', 'username')
            }
            {
              this.createFieldLayoutItem('Email', 'text', '', 'email', 'email')
            }
            {
              this.createFieldLayoutItem('Password', 'password', '', 'new-password', 'password')
            }
            {
              this.createFieldLayoutItem('Confirm Password', 'password', '', 'new-password', 'password-confirm')
            }
            {
              this.createFieldLayoutItem('', 'submit', 'Sign Up!')
            }
            {
              hasErrors
                ? <div className='fieldLayout'>
                  <div></div>
                  <div className='errorResults'>
                    {
                      this.renderErrorBlock()
                    }
                  </div>
                </div>
                : null
            }
          </div>
        </form>
      </div >
    )
  }
}

export default App
