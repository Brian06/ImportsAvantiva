import React, { Component } from 'react';
import './projectList.component.css';
import axios from 'axios';
import { baseApi } from '../../app.constants';
import ProjectPreview from '../projectPreview/projectPreview.component';
import { Link } from 'react-router-dom'
import ReactLoading from 'react-loading';

class ProjectList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      projects: [],
      loading: true
    };

   this.getProjects = this.getProjects.bind(this);   
   this.filteredProjects = this.filteredProjects.bind(this);
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

  componentDidMount() {
    this.getProjects();
  }

  getProjects() {
    axios.get(`${baseApi}/projects`)
        .then(response => {
          let data = response.data;
          this.setState({ projects:data, loading: false });
        })
        .catch(error => {
          this.setState({ loading: false });
        });
  }

  //TODO client y office se deben validar
  filteredProjects(search) {
    return this.state.projects.filter(project => {
      return project.title && project.title.toLowerCase().indexOf(search.toLowerCase()) > -1 || // search by title
              project.mainTechnology && project.mainTechnology.toLowerCase().indexOf(search.toLowerCase()) > -1 || // search by mainTechnology
              project.maxPosition && project.maxPosition.toLowerCase().indexOf(search.toLowerCase()) > -1 || // search by maxPosition
              project.minPosition && project.minPosition.toLowerCase().indexOf(search.toLowerCase()) > -1 || // search by minPosition
              project.requirements && project.requirements.toLowerCase().indexOf(search.toLowerCase()) > -1 || // search by requirements
              project.client && project.client.toLowerCase().indexOf(search.toLowerCase()) > -1 || // search by client
              project.office && project.office.toLowerCase().indexOf(search.toLowerCase()) > -1 || // search by office
              project.englishLevel && project.englishLevel.toLowerCase().indexOf(search.toLowerCase()) > -1 // search by englishLevel
    });
  }

  render() {

    const search = this.state.search;
    const filteredProjects = this.filteredProjects(search);
    

    const projects = filteredProjects.map((project) =>
      <ProjectPreview key={project.id} project={project}></ProjectPreview>
    );

    const showProjects = !this.state.projects.length ? (
      <div className="container-fluid">
        <h3 className="noProjectsMsg">There is no proyects yet, to add please login and click on import project</h3>
        <Link to={'/login'} style={{ textDecoration: 'none'}}>
          <center>
            <button className="btn loginButton noProjectsLogin" type="button">
              Login
            </button>
          </center>
        </Link>
      </div> 
    ) : (
      <div className="container-fluid">
          <div className="row searchContainer">
            <div className="col-xs-12">
              <div id="custom-search-input">
                <div className="input-group col-md-12">
                  <input 
                    type="text" 
                    className="form-control input-lg searchInput" 
                    placeholder="Search"
                    name="search"
                    value={ this.state.search }
                    onChange={this.handleInputChange}
                  />
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
        { this.state.loading ? (
          <div>
            <h3 className="loading">Loading...</h3>
            <center>
              <ReactLoading type={'spin'} color={'red'} height={200} width={100} />
            </center>
          </div>
        ) :
        <div>
        { showProjects }
        </div>
        }
      </div>
    )
  }
}

export default ProjectList;