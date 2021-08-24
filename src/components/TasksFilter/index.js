/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import PropTypes from 'prop-types'
import "./tasksfilter.css"

const TasksFilter = ({ btn, onFilter }) => <button type="button" className={btn.class} onClick={() => onFilter(btn.filter, btn.id)}>{btn.text}</button>

TasksFilter.defaultProps = {
    btn: {},
    onFilter: () => {}
}

TasksFilter.propTypes = {
    btn: PropTypes.object,
    onFilter: PropTypes.func
}

export default TasksFilter