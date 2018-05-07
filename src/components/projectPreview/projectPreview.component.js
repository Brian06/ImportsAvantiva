import React, { Component } from 'react';
import './projectPreview.component.css';
import { Link } from 'react-router-dom';

class ProjectPreview extends Component {

  skills(project){
    if(project.requirements) {
      let skills = project.requirements.split(',');
      return skills.length > 3 ? skills.slice(0,3) : skills;
    }
    return [];
  }

  render() {
    const { project } = this.props;
    const skillsFilter = this.skills(project);
    const techs = skillsFilter.map((skill) => <li key={skill} className="ellipsis"> - { skill }</li>);

    const skills = (skillsFilter.length) ? (
      <div className="row techs">
        <div className="col-xs-7 col-sm-8 techs-box">
          <ul>
            { techs }
          </ul>
        </div>  
      </div>
    ) : null;

    return (
      <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
        <div className="container-fluid previewContainer">
          <div>
            <Link to={`/project/${project.id}`} style={{ textDecoration: 'none'}}> 
              <h4 className="ellipsis title clickable" > 
                { project.title }
              </h4> 
            </Link>   
          </div>
          <div className="body">
            <h5>{ project.mainTechnology } - { project.englishLevel } - { project.office }</h5>
            <h6>{ project.minPosition } <span v-if="project.maxPosition"> - { project.maxPosition }</span></h6>
          </div>
          { skills }
          <div className="footer">
            <Link to={`/project/${project.id}`}>
              <button className="btn-review" style={{ textDecoration: 'none', color:'white'}}>
                  View More
              </button> 
            </Link>
          </div>
        </div>
      </div>
    )
  }

}


export default ProjectPreview;