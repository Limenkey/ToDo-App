/* eslint-disable react/jsx-filename-extension */
import React, {Component} from "react"
import { formatDistanceToNow } from 'date-fns'
import TaskList from "../TaskList"
import Header from "../Header"
import Footer from "../Footer"
import "./app.css"



export default class App extends Component {

    

    state = {
        tasks: [
                { id: 1, text: 'Get some coffee', className:'view', completed: false, created: `created ${  formatDistanceToNow(new Date(2021, 7, 20))  } ago` },
                { id: 2, text: 'Get some food', className:'view', completed: false, created: `created ${  formatDistanceToNow(new Date(2021, 7, 22))  } ago`},
                { id: 3, text: 'Keep learning', className:'view', completed: false, created: `created ${  formatDistanceToNow(new Date(2021, 7, 23))  } ago`}
               ]
    }

    maxId = 10

    newTask = (text, className = 'view', completed = false, created = `created ${   formatDistanceToNow(Date.now())  } ago`  ) => {
        const newItem = {
            id: this.maxId += 1,
                text,
                className,
                completed,
                created
        }
        this.setState(({tasks}) => {
            const res = [...tasks, newItem ];
            return {
                tasks: res
            }
        })
    }

    getIdx = (id) => {
        const {tasks} = this.state
        return tasks.findIndex((el) => el.id === id)
    }


    deleteItem = (id) => {
        this.setState(({tasks}) => {
            const idx = this.getIdx(id);
            const res = [...tasks.slice(0, idx), ...tasks.slice(idx+1)]
            return {
                tasks: res
            }
        })
    }

    
    changeProp = (id, propName, propVal) => {
        this.setState(({tasks}) => {

            const idx = this.getIdx(id);
            const completedItem = { ...tasks[idx] };

            completedItem[propName] = propVal;

            const res = [...tasks.slice(0, idx), completedItem, ...tasks.slice(idx+1)];
        return {
            tasks: res
        }   
        })
    }

    completeTask = (id) => {
        const {tasks} = this.state
        const idx = this.getIdx(id)
        if (!tasks[idx].completed) {
            this.changeProp(id,'completed', !tasks[idx].completed)
            this.changeProp(id, 'className', 'completed')
        }
        else if (tasks[idx].completed) {
            this.changeProp(id,'completed', !tasks[idx].completed)
            this.changeProp(id, 'className', 'view')    
        }
    }

    countActive = (arr) => {
        const res = arr.filter((item) => item.completed === false).length
        if (res === 1) return `${res  } Item left`
        return `${res  } Items left`    
    }

    clearCompleted = (arr) => {
        const res = arr.filter((item) => item.completed === false)
        this.setState({
            tasks: res
        })
    }

    filterItems = (str) => {
      const { tasks } = this.state
      const toFilterOut =  tasks.filter((el) => !el.className.includes(str))
      toFilterOut.forEach((el) => this.changeProp(el.id, 'className', `${el.className  } hidden`))
      tasks.forEach((el) => {
          if (el.className.includes(str) || str === 'all') this.changeProp(el.id, 'className', el.className.replace(' hidden', ''))})
    }
    
    render() {
        const {tasks} = this.state
        return (
            <section className="todoapp">
                <Header newTask={(val) => this.newTask(val)}/>
                <section className="main">
                    <TaskList tasks = {tasks}
                              onDelete = {(id) => this.deleteItem(id)}
                              completeTask = {(id) => this.completeTask(id)}
                    />
                    <Footer countActive = {this.countActive(tasks)}
                            newTask = {this.newTask}
                            onClearCompleted = {() => this.clearCompleted(tasks)}
                            onFilter={(str) => this.filterItems(str)}  
                    />
                </section>
            </section>
                ) 
    }
               
}

