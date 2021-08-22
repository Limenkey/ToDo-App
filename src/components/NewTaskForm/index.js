import React, { Component } from 'react';
import '../NewTaskForm/newtaskform.css'

export default class NewTaskForm extends Component {
    state = {
        val: ''
    }

    onValChange = (e) => {
        this.setState({
            val: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        if (e.key === 'Enter' && e.target.value) {
            this.props.newTask(this.state.val)
            e.target.value = ''
            this.setState({
                val: ''
            })
        }
        
    }


    render() {
        return <input className="new-todo" placeholder="What needs to be done?"
                      onChange={this.onValChange} onKeyUp={this.onSubmit}
                      autoFocus
               />
    }
    
}