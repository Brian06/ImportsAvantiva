import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './header.container.css';
import { logout } from '../../actions/index.actions';
import { Link } from 'react-router-dom';
import Login from '../login/login.container';
import ProjectList from '../../components/projectList/projectList.component';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import ProjectDetail from '../projectDetail/projectDetail.container';
import ImportProject from '../importProject/importProject.component';




class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showMenu: false
        };

        this.logout = this.logout.bind(this);
    }

    setInClass(){
       return this.state.showMenu ? 'in':'';
    }

    logout(){
        this.props.logout();
    }

    render() {

        const { loggedUser, isUserLogged } = this.props;
        
        const loginOrLogout = isUserLogged ? (<li className="click" onClick={ this.logout }><a>{ loggedUser.name } - Logout</a></li>) : 
            (<li className="click"><Link to={'/login'} style={{ textDecoration: 'none'}}>Login</Link></li>);

        const importProyects = isUserLogged ? (<li activeclass="active" className="click"><Link to={'/importProject'} style={{ textDecoration: 'none'}}>Import Project</Link></li>) : null;

        return (
            <Router>
            <div>
            <div>
                <nav className="navbar darkNav">
                    <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false" onClick={()=>{ this.setState({ showMenu: !this.state.showMenu }) }}>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        </button>  
                        <Link to={'/projects'} style={{ textDecoration: 'none'}}>      
                            <div className="navbar-brand">
                                Avantica Project Repository
                            </div>
                        </Link>
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
                </div>
                <div>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/projects" component={ProjectList}/>
                    <Route path="/project/:id" component={ProjectDetail}/>
                    <Route path="/importProject" component={ImportProject}/>
                    <Redirect from='*' to='/projects'/>
                </Switch>
                </div>
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
    return bindActionCreators({ logout:logout }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

