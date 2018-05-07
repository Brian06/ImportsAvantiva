import React, { Component } from 'react';
import './projectList.component.css';
import axios from 'axios';
import { baseApi } from '../../app.constants';
import ProjectPreview from '../projectPreview/projectPreview.component';

class ProjectList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      projects: []
    };

   this.getProjects = this.getProjects.bind(this);   
  }

  componentDidMount() {
    this.getProjects();
  }

  getProjects() {
    //this.$Progress.start();
    axios.get(`${baseApi}/projects`)
        .then(response => {
          let data = response.data;
          this.setState({ projects:data });
          //this.$Progress.finish();
        })
        .catch(error => {
          //this.$Progress.fail();
        });
  }

  render() {

    const projects = this.state.projects.map((project) =>
      <ProjectPreview key={project.id} project={project}></ProjectPreview>
    );

    const showProjects = !projects.length ? (
      <div className="container-fluid">
        <h2 className="noProjectsMsg">There is no proyects yet, to add please login and click on add project</h2>
      </div> 
    ) : (
      <div className="container-fluid">
          <div className="row searchContainer">
            <div className="col-xs-12">
              <div id="custom-search-input">
                <div className="input-group col-md-12">
                  <input type="text" className="form-control input-lg searchInput" placeholder="Search" v-model="search" />
                  <span className="input-group-btn">
                    <button className="btn btn-lg" type="button">
                      <i className="glyphicon glyphicon-search"></i>
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            { projects }
          </div>
        </div>
    );

    return (
      <div>
        { showProjects }
      </div>
    )
  }

}


export default ProjectList;