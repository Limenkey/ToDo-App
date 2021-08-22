import React, {Component} from "react"
import { formatDistanceToNow } from 'date-fns'
import '../Task/task.css'

class Task extends Component {

  state = {
    done: false
  }
  
  

  

  render() {
    const { todo, onDelete, completeTask } = this.props
    return (
      <div className="view">
        <Toggle completeTask={(completed) => completeTask(todo.id, completed)}/>
        <label>
          <span className="description">{todo.text}</span>
          <span className="created">Created {formatDistanceToNow(new Date())} ago</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={() => onDelete(todo.id)}></button>
      </div>    
)
  }  
}

class Toggle extends Component {
  state = {
    completed: false
  }

  changeToComplete() {
    this.setState(({completed}) => {
      return {
        completed: !completed
      }
    })
  }

  render() {
    const {completed} = this.state
    const {completeTask} = this.props
    return (
      <input className="toggle" type="checkbox" onClick={() => {
        this.changeToComplete()
        completeTask(completed)
      }}/> 
    )
  }
}

export default Task
