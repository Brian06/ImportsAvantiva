import React, { Component } from 'react';
import './importProject.component.css';
import axios from 'axios';
import { baseApi } from '../../app.constants';
import ProjectDetail from '../../containers/projectDetail/projectDetail.container';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

class ImportProject extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ticketNumber: '',
      existProject: false,
      project: {},
      error: {}
    };

   this.importProject = this.importProject.bind(this);   
   this.cancel = this.cancel.bind(this);   
   this.saveProject = this.saveProject.bind(this);   
   this.closeError = this.closeError.bind(this);  
   this.handleInputChange = this.handleInputChange.bind(this);  
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  importProject() {
    if (this.state.ticketNumber.length) {
      //this.$Progress.start();
      this.setState({ error: {} });
      axios.get(`${baseApi}/import/${this.state.ticketNumber}`)
        .then(response => {
          let data = response.data;
          if (data) {
            this.setState({ existProject: true, project: data })
          } else {
          }
          //this.$Progress.finish();
        })
        .catch(error => {
          this.setState({ error: { exist: true, message: 'Ticket not found, please try again!' } });
        });
    }
  }

  cancel(){
    this.setState({ project: {}, existProject: {}, ticketNumber: '', error: {} });
  }

  saveProject() {
    if (this.state.ticketNumber.length) {
      this.setState({ error: {} });
      //this.$Progress.start();
      let data = {
        project: this.state.project
      };

      axios.post(`${baseApi}/import`, this.state.project)
        .then(response => {
          let data = response.data;
          if (data && !data.haveErrors) {
            //this.$router.push({ path: '/projects' });
          } else {
            this.setState({ error: { exist: true, message: data.message } });
          }
          //this.$Progress.finish();
        })
        .catch(error => {
          this.setState({ error: { exist: true, message: 'Something went wrong, please try again!' } });
          //this.$Progress.fail();
        });
    }
  }

  closeError(){
    this.setState({ error: {exist: false, message: '' } });
  }

  render() {
    const { isUserLogged } = this.props;

    if (!isUserLogged) {
      return <Redirect to="/" />;
    }

    const searchTicket = !this.state.existProject ? (
      <div className="container">
        <h4 className="justifyText">To import projects from Jira please type in the ticket number!</h4>
        <div className="row searchContainer">
          <div className="col-xs-12">
            <div id="custom-search-input">
              <div className="input-group col-md-12">
                <input 
                  type="text" 
                  className="form-control input-lg searchInput" 
                  placeholder="Ticket Number" 
                  name="ticketNumber" 
                  value={ this.state.ticketNumber } 
                  onChange={this.handleInputChange} 
                />
                <span className="input-group-btn">
                  <button className="btn btn-lg" type="button" onClick={this.importProject}>
                    Import
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div>
        <ProjectDetail projectAux={this.state.project} key={this.state.project.id}></ProjectDetail>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <button onClick={this.cancel} className="btn cancel">Cancel</button>
              <button onClick={this.saveProject} className="btn success">Continue</button>
            </div>
          </div>
        </div>
      </div>
    );

    const error = this.state.error.exist ? (
      <div className="row">
        <div className="col-xs-12 errorContainer">
          <div className="alert alert-danger alert-dismissible" role="alert">
            <button type="button" className="close" onClick="closeError"><span>&times;</span></button>
            <strong>Error!</strong> { this.state.error.message }
          </div>
        </div>
      </div>
    ) : null;

    return (
      <div>
        { searchTicket }
        <div className="container">
          { error }
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

export default connect(mapStateToProps)(ImportProject);
