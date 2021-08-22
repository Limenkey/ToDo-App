import React from 'react'
import NewTaskForm from '../NewTaskForm'
import '../Header/header.css'

const Header = ({newTask}) => {
    return (
        <header className="header">
            <h1>todos</h1>
            <NewTaskForm newTask={(val) => newTask(val)}/>
        </header>
    )
}

export default Header