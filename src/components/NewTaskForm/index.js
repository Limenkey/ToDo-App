/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import "./newtaskform.css"

export default class NewTaskForm extends Component {
    state = {
        val: ''
    }

    static defaultProps = {
        newTask: () => {}
    }

    static propTypes = {
        newTask: PropTypes.func
    }

    onValChange = (event) => {
        this.setState({
            val: event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault()
        const {props} = this
        const {val} = this.state
        if (event.key === 'Enter' && event.target.value) {
            props.newTask(val)
            // eslint-disable-next-line no-param-reassign
            event.target.value = ''
            this.setState({
                val: ''
            })
        }
        
    }


    render() {
        return <input className="new-todo" placeholder="What needs to be done?"
                      onChange={this.onValChange} onKeyUp={this.onSubmit}
                      // eslint-disable-next-line jsx-a11y/no-autofocus
                      autoFocus
               />
    }
    
}