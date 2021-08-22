import React, {Component} from "react"
import Task from "../Task"
import '../TaskList/tasklist.css'



export default class TaskList extends Component {

    render() {
        const {tasks, onDelete, completeTask} = this.props
        const elements = tasks.map((item) => {
            return (
                <li className={item.className} key={item.id}>
                    <Task todo={item} onDelete={(id) => onDelete(id)} completeTask={(id, completed) => completeTask(id, completed)} />
                </li>
            )
        })

        return (
            <ul className="todo-list">
                {elements}
            </ul>
        )
    }
    
}
