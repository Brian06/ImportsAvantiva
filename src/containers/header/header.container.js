import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './header.container.css';
import { setLoggedUser } from '../../actions/index.actions';
import { Link } from 'react-router-dom';
import Login from '../login/login.container';
import ProjectList from '../../components/projectList/projectList.component';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import ProjectDetail from '../projectDetail/projectDetail.container';
import ImportProject from '../../components/importProject/importProject.component';




class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showMenu: false
        };


    }

    setInClass(){
       return this.state.showMenu ? 'in':'';
    }

    render() {
        
        const isUserLogged = this.props.isUserLogged;
        
        const loginOrLogout = isUserLogged ? (<li className="click" onClick={ ()=> this.props.setLoggedUser({name:'carlos'}) }><a>Logout</a></li>) : 
            (<li className="click"><Link to={'/login'} style={{ textDecoration: 'none'}}>Login</Link></li>);

        const importProyects = isUserLogged ? (<li activeclass="active" className="click"><Link to={'/importProject'} style={{ textDecoration: 'none'}}>Import Project</Link></li>) : null;

        return (
            <Router>
            <div>
                <nav className="navbar darkNav">
                    <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false" onClick={()=>{ this.setState({ showMenu: !this.state.showMenu }) }}>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        </button>        
                        <div className="navbar-brand">
                        Avantica Project Repository
                        </div>
                    </div>

                    <div className={'collapse navbar-collapse ' + this.setInClass()}  onClick={()=>{ this.setState({ showMenu: false }) }}>
                        <ul className="nav navbar-nav">
                            <li activeclass="active" className="click"><Link to={'/projects'} style={{ textDecoration: 'none'}}>Projects</Link></li>
                            {importProyects}
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            {loginOrLogout}
                        </ul>
                    </div>
                
                    </div>
                    
                </nav>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/projects" component={ProjectList}/>
                    <Route path="/project/:id" component={ProjectDetail}/>
                    <Route path="/importProject" component={ImportProject}/>
                    <Redirect from='*' to='/projects'/>
                </Switch>
            </div>
            </Router>
            
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

