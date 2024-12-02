import React from 'react';
import styles from '../Home.module.scss'
import ProjectCard from './projectCard/ProjectCard'

const ProjectCards = ({projects}) => {
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

export default ProjectCards
