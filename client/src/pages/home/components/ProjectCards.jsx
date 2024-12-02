import React from 'react';
import styles from '../Home.module.scss'
import ProjectCard from './projectCard/ProjectCard'
import PropTypes from 'prop-types'

const ProjectCards = ({ projects }) => {
  return (
    <div className={styles['cards-wrapper']}>
      {Object.values(projects).map(project => (
        <ProjectCard
          key={project._id}
          {...project}
        />
      ))}
    </div>
  )
}

ProjectCards.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default ProjectCards
