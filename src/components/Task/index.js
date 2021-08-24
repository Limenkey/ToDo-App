/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable max-classes-per-file */
import React from "react"
import PropTypes from 'prop-types'
import "./task.css"


const Task = ({ todo, onDelete, completeTask }) => (
  <div className="view">
    <Toggle completeTask={ () => completeTask(todo.id) }/>
    <label>
      <span className="description">{todo.text}</span>
      <span className="created">{todo.created}</span>
    </label>
    <button type="button" className="icon icon-edit" />
    <button type="button" className="icon icon-destroy" onClick={() => onDelete(todo.id)} />
  </div>    
)  

Task.defaultProps = {
  todo: {},
  onDelete: () => {},
}

Task.propTypes = {
  todo: PropTypes.object,
  onDelete: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  completeTask: PropTypes.func
}

const Toggle = ({completeTask}) => (
  <input className="toggle" type="checkbox" onClick={ () => completeTask() }/> 
)

Toggle.propTypes = {
  // eslint-disable-next-line react/require-default-props
  completeTask: PropTypes.func
}

export default Task
