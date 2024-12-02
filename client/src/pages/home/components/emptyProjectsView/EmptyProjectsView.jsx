import React from 'react'
import styles from './EmptyProjectsView.module.scss';

const NO_PROJECT_FOUND_TEXT = 'No projects found. Please create a new project to get started';

const EmptyProjectsView = () => {
  return (
    <div className={styles['empty-projects-view']}>
      <p>{NO_PROJECT_FOUND_TEXT}</p>
    </div>
  )
};

export default EmptyProjectsView;
