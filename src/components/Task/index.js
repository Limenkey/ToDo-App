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
        <Toggle completeTask={ () => completeTask(todo.id) }/>
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

  render() {
    const {completeTask} = this.props
    return (
      <input className="toggle" type="checkbox" onClick={ () => completeTask() }/> 
    )
  }
}

export default Task
