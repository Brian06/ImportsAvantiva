import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './login.container.css';
import { setLoggedUser } from '../../actions/index.actions';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';
import { baseApi } from '../../app.constants';


import { Field, reduxForm } from 'redux-form'

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

    login() {
        this.setState({ failedLogin: false });
        let credentials = { userNameOrEmail: this.state.email, password: this.state.password };
        //this.$Progress.start();
        axios.post(`${baseApi}/login`, credentials)
          .then(response => {
            console.log(response)
            let data = response.data;
            if (data && data.successful) {
              //this.$store.dispatch('setLoggedUser', data.user);
              this.props.setLoggedUser(data.user);
              this.setState({ email: '', password: '', redirect: true });
            } else {
              this.setState({ failedLogin: true, password: '' });
            }
            //this.$Progress.finish();
          })
          .catch(error => {
            this.failedLogin = true; 
            this.setState({ password: '' });
            //this.$Progress.fail();
          });
    }



    render() {

        if (this.state.redirect) {
            return <Redirect to="/" />;
        }
        
        return (
            <div className="login-page">
                <div className="form">
                    <img src="logo.png" alt="Avantica" width="60%"/>
                    <form className="login-form">

                        <FormGroup controlId="formBasicEmail"
                            validationState={this.getValidationEmailState()}>
                            <FormControl bsClass="form-group input"
                                name="email"
                                type="email"
                                value={ this.state.email }
                                placeholder="Email"
                                onChange={this.handleInputChange}/>
                            <FormControl.Feedback /> 
                        </FormGroup>

                        <FormGroup controlId="formBasicPassword"
                            validationState={this.getValidationPasswordState()}>
                            <FormControl bsClass="form-group input"
                                name="password"
                                type="password"
                                value={ this.state.password }
                                placeholder="Password"
                                onChange={this.handleInputChange}/>
                            <FormControl.Feedback /> 
                        </FormGroup>
                
                        <Button bsClass="btn loginButton" disabled={this.setEnableButton()} onClick={ this.login }>login</Button>
                        
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);






