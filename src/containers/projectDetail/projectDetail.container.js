import React, { Component } from 'react';
import { connect } from 'react-redux';
import { baseApi } from '../../app.constants';
import { Modal, Button, ProgressBar } from 'react-bootstrap';
import Redirect from 'react-router-dom/Redirect';
import ReactLoading from 'react-loading';
import axios from 'axios';
import './projectDetail.container.css';

class ProjectDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDetailsView: true,
      project: null,
      show: false,
      loading: false,
      redirect: false,
      error: false,
      progress: 0,
      style: 'info'
    };

    this.getProject = this.getProject.bind(this);   
    this.deleteProject = this.deleteProject.bind(this);  
    this.startDate = this.startDate.bind(this); 
    this.handleClose = this.handleClose.bind(this);  
  }
    
  componentDidMount() {
    this.getProject();
  }

  handleClose() {
    this.setState({ show: false, error: false, loading: false, progress: 0 });
  }

  getProject(){
    if(!this.state.projectAux){
      //TODO: get project by fsId, change api before
      axios.get(`${baseApi}/projects/${this.props.match.params.id}`)
        .then(response => {
          let data = response.data;
          this.setState({ project:data });
          if (!this.state.project) {
            //this.$router.push({path: '/projects'});
          }
          
        })
        .catch(error => {

        });
    } else {
      //this.project = this.projectAux;
      this.isDetailsView = false;
    }
  }

  deleteProject(){
    this.setState({ loading:true, progress:60 });
    axios.delete(`${baseApi}/projects/${this.state.project.fbId}`)
    .then(response => {
      let data = response.data;
      if (data) {
      this.setState({ progress:100, loading: false, redirect:true });
      }
    })
    .catch(error => {
      this.setState({ error: true, style: 'danger' });
    });
  }

  //computed function
  startDate(project) {
    if (project && project.expectedStartDate) {
      let date = new Date(project.expectedStartDate);
      return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    }
    return '';
  }

  render() {

    if (this.state.redirect) {
        return <Redirect to="/" />;
    }

    const project = this.state.project;
    const startDate = this.startDate(project);
    
    let mainTechnology;
    let englishLevel;
    let expectedStartDate;
    let yearsOfExperience;
    let minPosition;
    let maxPosition;
    let taskDescription;
    let requirements;
    let mandatoryHardSkills;
    let mandatorySoftSkills;
    let preferableSoftSkills;
    let preferableHardSkills;
    let mandatoryKnowledge;
    let preferableKnowledge;
    let description;
    let removeProjectButton;

    if(project){

      mainTechnology = project.mainTechnology ? (
        <div className="col-xs-6 col-sm-6 col-md-4">
          <label><b>Main Technology:</b></label>
          <p>{ project.mainTechnology }</p>
        </div>
      ) : null;
        
      englishLevel = project.englishLevel ? (
        <div className="col-xs-6 col-sm-6 col-md-4">
          <label><b>English Level:</b></label>
          <p>{ project.englishLevel }</p>
        </div>
      ) : null;

      expectedStartDate = startDate ? (
        <div className="col-xs-6 col-sm-6 col-md-4">
          <label><b>Expected Start Date:</b></label>
          <p>{ startDate }</p>
        </div>
      ) : null;

      yearsOfExperience = project.yearsOfExperience ? (
        <div className="col-xs-6 col-sm-6 col-md-4">
          <label><b>Years Of Experience:</b></label>
          <p>{ project.yearsOfExperience }</p>
        </div>
      ) : null;

      minPosition = project.minPosition ? (
        <div className="col-xs-6 col-sm-6 col-md-4">
          <label><b>Min Position:</b></label>
          <p>{ project.minPosition }</p>
        </div>
      ) : null;

      maxPosition = project.maxPosition ? (
        <div className="col-xs-6 col-sm-6 col-md-4">
          <label><b>Max Position:</b></label>
          <p>{ project.maxPosition }</p>
        </div>
      ) : null;

      taskDescription = project.taskDescription ? (
        <div className="row">
          <div className="col-xs-12">
            <p><b>Task Description: </b></p>
            <p className="description">{ project.taskDescription }</p>
          </div>
        </div>
      ) : null;

      requirements = project.requirements ? (
        <div className="row">
          <div className="col-xs-12">
            <p><b>Requirements: </b></p>
            <p>{ project.requirements }</p>
          </div>
        </div>
      ) : null;

      mandatoryHardSkills = project.mandatoryKnowledge.hardSkills ? (
        <div className="col-xs-12 col-sm-12 col-md-6">
          <label><b>Hard Skills: </b></label>
          <p>{ project.mandatoryKnowledge.hardSkills }</p>
        </div>
      ) : null;

      preferableHardSkills = project.preferableKnowledge.hardSkills ? (
        <div className="col-xs-12 col-sm-12 col-md-6">
          <label><b>Hard Skills: </b></label>
          <p>{ project.preferableKnowledge.hardSkills }</p>
        </div>
      ) : null;

      mandatorySoftSkills = project.mandatoryKnowledge.softSkills ? (
        <div className="col-xs-12 col-sm-12 col-md-6">
          <label><b>Soft Skills: </b></label>
          <p>{ project.mandatoryKnowledge.softSkills }</p>
        </div>
      ) : null;

      preferableSoftSkills = project.preferableKnowledge.softSkills ? (
        <div className="col-xs-12 col-sm-12 col-md-6">
          <label><b>Soft Skills: </b></label>
          <p>{ project.preferableKnowledge.softSkills }</p>
        </div>
      ) : null;

      mandatoryKnowledge = project.mandatoryKnowledge && (project.mandatoryKnowledge.hardSkills || project.mandatoryKnowledge.softSkills) ? (
        <div className="row">
          <div className="col-xs-12">
            <p><b>Mandatory Knowledge: </b></p>
          </div>
          { mandatoryHardSkills }
          { mandatorySoftSkills }
        </div>
      ) : null;

      preferableKnowledge = project.preferableKnowledge && (project.preferableKnowledge.hardSkills || project.preferableKnowledge.softSkills) ? (
        <div className="row">
          <div className="col-xs-12">
            <p><b>Preferable Knowledge: </b></p>
          </div>
          { preferableHardSkills }
          { preferableSoftSkills }
        </div>
      ) : null;

      description = project.description ? (
        <div className="row">
          <div className="col-xs-12">
            <label><b>Project Description: </b></label>
            <p>{ project.description }</p>
          </div>
        </div>
      ) : null;

      removeProjectButton = this.props.isUserLogged && this.state.isDetailsView ? (
        <div className="row">
          <div className="col-xs-12">
            <button className="btn cancel pull-right" onClick={ ()=> {this.setState({show:true})} }>Remove Project</button>
          </div>
        </div>
      ) : null;
  }
  
  const modal = (
    <Modal className="modal modal-center" show={this.state.show} onHide={this.handleClose} animation>
    <Modal.Header closeButton>
        <Modal.Title>Are you sure?</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        This action will remove the project permanently!
    </Modal.Body>
    <Modal.Footer>
        { this.state.loading && <ProgressBar striped bsStyle={this.state.style} active={!this.state.error} now={this.state.progress} /> }
        { this.state.error && <div className="errorText">Failed delete project, try again!</div> }
        <Button bsClass="btn success pull-right" onClick={this.handleClose}>Cancel</Button>
        <Button bsClass="btn cancel pull-right" onClick={this.deleteProject}>Remove</Button>
    </Modal.Footer>
    </Modal>
  )

  const loading = (
    <div className="test">
      <h3 className="loading">Loading...</h3>
      <center>
        <ReactLoading type={'spin'} color={'red'} height={200} width={100} />
      </center>
    </div>
  )

  return (
    <div>
      {modal}
      { !project ? (
        <div>
          { loading }
        </div>
      ) :  (
        <div className="container">
          <h3>{ project.title }</h3>
          <div className="project-detail">
              <div className="row">
                { mainTechnology }
                { englishLevel }
                { expectedStartDate }
                { yearsOfExperience }
                { minPosition }
                { maxPosition }
              </div>
              { taskDescription }
              { requirements }
              { mandatoryKnowledge }
              { preferableKnowledge }
              { description }
          </div>
          { removeProjectButton }
      </div>
      )
      }
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

export default connect(mapStateToProps)(ProjectDetail);