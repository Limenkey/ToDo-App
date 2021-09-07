/* eslint-disable react/jsx-filename-extension */
import React, {useState } from 'react';
import PropTypes from 'prop-types'
import "./newtaskform.css"

const NewTaskForm = ({newTask}) => {

    const [value, setValue] = useState('')

    const onValChange = (event) => {
        setValue(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault()
        if (event.key === 'Enter' && event.target.value) {
            newTask(value)
            // eslint-disable-next-line no-param-reassign
            event.target.value = ''
            setValue('')
        }   
    }

    return <input className="new-todo" placeholder="What needs to be done?"
                    onChange={onValChange} onKeyUp={onSubmit}
                    // eslint-disable-next-line jsx-a11y/no-autofocus
                    autoFocus
            />   
}

NewTaskForm.defaultProps = {
    newTask: () => {}
}

NewTaskForm.propTypes = {
    newTask: PropTypes.func
}

export default NewTaskForm