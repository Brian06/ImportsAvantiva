import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './login.container.css';
import { setLoggedUser } from '../../actions/index.actions';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';
import { baseApi } from '../../app.constants';
import logo from '../../assets/logo.png';
import { Field, reduxForm, formValueSelector, SubmissionError } from 'redux-form';
import { Redirect } from 'react-router-dom';

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
       this.print = this.print.bind(this);
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

        return emailState === 'success' && (passwordState === 'success' || 
               passwordState === 'warning') ? false : true;
    }

    print() {
        
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
            //this.failedLogin = true; 
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
        const { error, pristine, submitting, handleSubmit, email, password } = this.props;

        return (
            <div className="login-page">
                <div className="form">
                    <img src={ logo } alt="Avantica" width="60%"/>
                    <form className="login-form" onSubmit={this.props.handleSubmit(this.login)}>  
                        <Field name="email" component={renderField} type="text" placeholder="Email"/>
                        <Field name="password" component={renderField} type="password" placeholder="Password"/>
                        {error && <strong>{error}</strong>}
                        
                        <button className="btn loginButton" type="submit" disabled={error || submitting} >Login</button> 
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
      errors.email = '*Required'
    } 
    if (!values.password) {
      errors.password = '*Required'
    }
    return errors
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} className="form-group input" placeholder={label} type={type}/>
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
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
