import React from 'react'
import '../TasksFilter/tasksfilter.css'

const TasksFilter = ({ btn, onFilter }) => {
    return <button className={btn.class} onClick={() => onFilter(btn.filter, btn.id)}>{btn.text}</button>
}


export default TasksFilter