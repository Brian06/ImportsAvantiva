import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setLoggedUser } from '../../actions/index.actions';
import { baseApi } from '../../app.constants';
import { Field, reduxForm, formValueSelector, SubmissionError } from 'redux-form';
import axios from 'axios';
import Redirect from 'react-router-dom/Redirect';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import logo from '../../assets/logo.png';
import './login.container.css';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailError: 'Requires valid email',
      password: '',
      passwordError: '',
      failedLogin: false,
      redirect: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);   
    this.login = this.login.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  getValidationEmailState() {
    if (this.state.email.length === 0) 
        return null;
    else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email))) {
        return 'error';
    }
    return 'success';
  }

  getValidationPasswordState() {
    if (this.state.password.length === 0) 
        return null;
    else if (this.state.password.length < 6) 
        return 'warning'; 
    return 'success'
  }

  setEnableButton() {
    const emailState = this.getValidationEmailState();
    const passwordState = this.getValidationPasswordState();

    return  emailState === 'success' && (passwordState === 'success' || 
            passwordState === 'warning') ? false : true;
  }

  login() {
    this.setState({ failedLogin: false });
    let credentials = { userNameOrEmail: this.props.email, password: this.props.password };
    return axios.post(`${baseApi}/login`, credentials)
      .then(response => {
        console.log(response)
        let data = response.data;
        if (data && data.successful) {
          this.props.setLoggedUser(data.user);
          this.props.reset();
          this.setState({ redirect: true });
        } else {
          this.setState({ failedLogin: true, password: '' });
          throw new SubmissionError({
            email: 'User does not exist',
            _error: 'Login failed!'
          })
        }
      })
      .catch(error => {
        this.setState({ password: '' });
        throw new SubmissionError({
          email: 'User does not exist',
          _error: 'Login failed!'
          })
      });
  }

    

    render() {

      if (this.state.redirect) {
        return <Redirect to="/" />;
      }

      //start redux form const
      const { error, submitting, handleSubmit, email, password } = this.props;

      return (
        <div className="login-page">
          <div className="form">
            <img src={ logo } alt="Avantica" width="60%"/>
            <form className="login-form" onSubmit={handleSubmit(this.login)}>  
                <Field name="email" component={renderFieldInputs} type="text" label="Email/UserName"/>
                <Field name="password" component={renderFieldPassword} type="password" label="Password"/>
                {error && <strong>{error}</strong>}
                <button className="btn loginButton" type="submit" disabled={!email || !password || submitting} >Login</button> 
            </form>
          </div>
        </div>
      )
  }

}

function mapStateToProps(state) {
    return {
      loggedUser: state.loggedUser,
      isUserLogged: state.isUserLogged
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setLoggedUser:setLoggedUser }, dispatch);
}

//start redux form const
const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'This field is required.'
  } 
  if (!values.password) {
    errors.password = 'This field is required.'
  }
  return errors
}

const styles = {
  passwordText: {
    'WebkitTextSecurity': 'disc',
  },
  floatingText: {
    color: '#302E46'
  }
};

const renderFieldInputs = ({ name, input, label, type, meta: { touched, error, warning }, ...custom }) => (
  <div>
    <MuiThemeProvider>
        <div>
        <TextField 
        hintText="Email/Username"
        floatingLabelText={label}
        errorText={touched && error}
        floatingLabelFocusStyle={styles.floatingText}
        fullWidth
        {...input}
        {...custom}
        />
        </div>
    </MuiThemeProvider>
  </div>
)

const renderFieldPassword = ({ name, input, label, type, meta: { touched, error, warning }, ...custom }) => (
  <div>
    <MuiThemeProvider>
      <div>
        <TextField 
        hintText="Password"
        errorText={touched && error}
        floatingLabelText={label}
        inputStyle={styles.passwordText}
        floatingLabelFocusStyle={styles.floatingText}
        fullWidth
        {...input}
        {...custom}
        />
      </div>
    </MuiThemeProvider>
  </div>
)

Login = reduxForm({
  form: 'login', 
  validate
})(Login);

const selector = formValueSelector('login')
Login = connect(
state => {
  const { email, password } = selector(state, 'email', 'password')
  return {
    email,
    password
  }
}
)(Login)
//redux form end

export default connect(mapStateToProps, mapDispatchToProps)(Login);
