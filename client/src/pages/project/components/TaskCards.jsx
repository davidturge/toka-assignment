import React from 'react'
import PropTypes from 'prop-types'
import TaskCard from './taskCard/TaskCard'
import EmptyTasksView from './emptyTasksView/EmptyTasksView'

const TaskCards = ({ values = [], projectId }) => (
  <>
    {
      values && Object.values(values).length > 0 ? (
        Object.values(values).map(({ _id: taskId, notes, state, dueDate }) => (
          <TaskCard
            key={taskId}
            taskId={taskId}
            name='Title'
            notes={notes}
            state={state}
            dueDate={dueDate}
            projectId={projectId}
            isRow={true}
          />
        ))
      ) : (
        <div>
          <EmptyTasksView/>
        </div>
      )
    }
  </>
);


export default TaskCards

TaskCards.propTypes = {
  values: PropTypes.any.isRequired,
  projectId: PropTypes.string.isRequired,
};
