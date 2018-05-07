import React, { Component } from 'react';
import { connect } from 'react-redux';
import './projectDetail.container.css';
import axios from 'axios';
import { baseApi } from '../../app.constants';

class ProjectDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
          isDetailsView: true,
          project: null
        };
    
       this.getProject = this.getProject.bind(this);  
       this.sureDelete = this.sureDelete.bind(this);  
       this.deleteProject = this.deleteProject.bind(this);  
       this.startDate = this.startDate.bind(this);  
       //this.isUserLogged = this.isUserLogged.bind(this);   
    }
    
    componentDidMount() {
        this.getProject();
    }

    getProject(){
        if(!this.state.projectAux){
            //this.$Progress.start();
            //TODO: get project by fsId, change api before
            axios.get(`${baseApi}/projects/${this.props.match.params.id}`)
              .then(response => {
                let data = response.data;
                this.setState({ project:data });
                if (!this.state.project) {
                  //this.$router.push({path: '/projects'});
                }
                //this.$Progress.finish();
              })
              .catch(error => {
                //this.$Progress.fail();
              });
        } else {
            //this.project = this.projectAux;
            this.isDetailsView = false;
        }
    }

    sureDelete(){
        this.$alertify.confirmWithTitle('Are you sure?', 'This action will remove the project permanently!', () => {
          this.deleteProject();
        });
    }

    deleteProject(){
    this.$Progress.start();
        axios.delete(`${baseApi}/projects/${this.project.fbId}`)
        .then(response => {
            let data = response.data;
            if (data) {
            this.$router.push({path: '/projects'});
            }
            this.$Progress.finish();
        })
        .catch(error => {
            this.$Progress.fail();
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
     
    //computed function  
    /*isUserLogged() {
        return this.props.isUserLogged;
    }*/

    render() {

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
                    <button className="btn cancel pull-right" onClick={ this.sureDelete }>Remove Project</button>
                    </div>
                </div>
            ) : null;
        }

        return (
            <div>
            { !project ? (<div>
                    <h3 className="loading">Loading...</h3>
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