/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import PropTypes from 'prop-types'
import NewTaskForm from '../NewTaskForm'
import "./header.css"

const Header = ({newTask}) => (
        <header className="header">
            <h1>todos</h1>
            <NewTaskForm newTask={(val) => newTask(val)}/>
        </header>
    )

Header.defaultProps = {
    newTask: () => {}
}

Header.propTypes = {
    newTask: PropTypes.func
}

export default Header