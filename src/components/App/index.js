import React, {Component} from "react"
import TaskList from "../TaskList"
import Header from "../Header"
import Footer from "../Footer"
import '../App/app.css'



export default class App extends Component {

    state = {
        demo: [
                {id:"1", text: 'Learn React', className: 'view', completed: false },
                {id:"2", text: 'Finish this block', className: 'view', completed: false },
                {id:"3", text: 'Get some sleep', className: 'view', completed: false }
              ]
    }

    deleteItem = (id) => {
        this.setState(({demo}) => {
            const idx = demo.findIndex((el) => el.id === id);
            const res = [...demo.slice(0, idx), ...demo.slice(idx+1)]
            return {
                demo: res
            }
        })
    }

    changeProp = (id, propName, propVal) => {
        this.setState(({demo}) => {
            const idx = demo.findIndex((el) => el.id === id)
            const completedItem = { ...demo[idx] }
            completedItem[propName] = propVal
            const res = [...demo.slice(0, idx), completedItem, ...demo.slice(idx+1)]
        return {
            demo: res
        }   
        })
    }

    completeTask = (id, completed) => {
        if (!completed) {
            this.changeProp(id, 'className', 'completed')
        }
        else if (completed) {
            this.changeProp(id, 'className', 'view')
        }
      }


    render() {
        const {demo} = this.state

        return (
            <section className="todoapp">
                <Header />
                <section className="main">
                    <TaskList tasks = {demo} onDelete = {(id) => this.deleteItem(id)} completeTask = {(id, completed) => this.completeTask(id, completed)} />
                    <Footer />
                </section>
            </section>
                ) 
    }
               
}

