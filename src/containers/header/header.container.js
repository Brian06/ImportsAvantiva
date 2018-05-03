import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './header.container.css';
import { setLoggedUser } from '../../actions/index.actions';
import { Link } from 'react-router-dom';




class Header extends Component {

    render() {
        
        const isUserLogged = this.props.isUserLogged;
        
        const loginOrLogout = isUserLogged ? (<li className="click" onClick={ ()=> this.props.setLoggedUser({name:'carlos'}) }><a>Logout</a></li>) : 
            (<li className="click"><Link to={'/login'}><a style={{ textDecoration: 'none'}}>Login</a></Link></li>);

        const importProyects = isUserLogged ? (<li activeclass="active" className="click"><a>Import Project</a></li>) : null;

        return (
            <nav className="navbar darkNav">
                <app-loading></app-loading>
                <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    </button>        
                    <div className="navbar-brand">
                    Avantica Project Repository
                    </div>
                </div>

                <div className="collapse navbar-collapse">
                    <ul className="nav navbar-nav">
                        <li activeclass="active" className="click"><a>Projects</a></li>
                        {importProyects}
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        {loginOrLogout}
                    </ul>
                </div>
               
                </div>
                
            </nav>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);

