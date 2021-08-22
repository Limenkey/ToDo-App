import React from 'react'
import '../TasksFilter/tasksfilter.css'

const TasksFilter = ({ btn }) => {
    return <button className={btn.class}>{btn.text}</button>
}


export default TasksFilter