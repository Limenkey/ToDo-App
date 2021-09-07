/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from "react"
import PropTypes from 'prop-types'
import Task from "../Task"
import "./tasklist.css"




const TaskList = ({tasks, onDelete, completeTask }) => {
    const elements = tasks.map((item) => (
            <li className={item.className} key={item.id}>
                <Task todo={item}
                      onDelete={(id) => onDelete(id)} 
                      completeTask={(id) => completeTask(id) } 
                      />
            </li>
        ))
    return (
        <ul className="todo-list">
            {elements}
        </ul>
    )
    
}

TaskList.defaultProps = {
    tasks: [{},{},{}],
    onDelete: () => {},
    completeTask: () => {}
}

TaskList.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.object),
    onDelete: PropTypes.func,
    completeTask: PropTypes.func
}

export default TaskList