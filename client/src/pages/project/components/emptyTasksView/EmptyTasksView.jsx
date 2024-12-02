import React from 'react'
import styles from './EmptyTasksView.module.scss';

const NO_TASKS_FOUND_TEXT = 'No tasks found.';

const EmptyTasksView = () => {
  return (
    <div className={styles['empty-tasks-view']}>
      <p>{NO_TASKS_FOUND_TEXT}</p>
    </div>
  )
};

export default EmptyTasksView;
