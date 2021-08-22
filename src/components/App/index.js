import React, {Component} from "react"
import TaskList from "../TaskList"
import Header from "../Header"
import Footer from "../Footer"
import '../App/app.css'



export default class App extends Component {

    maxId = 10

    state = {
        demo: [
                { id: 1, text: 'Get some coffee', className:'view', completed: false },
                { id: 2, text: 'Get some food', className:'view', completed: false },
                { id: 3, text: 'Keep learning', className:'view', completed: false }
              ]
    }


    newTask = (text, className = 'view', completed = false) => {
        const newItem = {
            id: this.maxId += 1,
                text: text,
                className,
                completed
        }
        this.setState(({demo}) => {
            const res = [...demo, newItem ];
            return {
                demo: res
            }
        })
    }

    getIdx = (id) => this.state.demo.findIndex((el) => el.id === id)


    deleteItem = (id) => {
        this.setState(({demo}) => {
            const idx = this.getIdx(id);
            const res = [...demo.slice(0, idx), ...demo.slice(idx+1)]
            return {
                demo: res
            }
        })
    }

    
    changeProp = (id, propName, propVal) => {
        this.setState(({demo}) => {

            const idx = this.getIdx(id);
            const completedItem = { ...demo[idx] };

            completedItem[propName] = propVal;

            const res = [...demo.slice(0, idx), completedItem, ...demo.slice(idx+1)];
        return {
            demo: res
        }   
        })
    }

    completeTask = (id) => {
        const {demo} = this.state
        const idx = this.getIdx(id)
        if (!demo[idx].completed) {
            this.changeProp(id,'completed', !demo[idx].completed)
            this.changeProp(id, 'className', 'completed')
        }
        else if (demo[idx].completed) {
            this.changeProp(id,'completed', !demo[idx].completed)
            this.changeProp(id, 'className', 'view')    
        }
    }

    countActive = (arr) => {
        const res = arr.filter((item) => item.completed === false).length
        if (res === 1) return res + ' Item left'
        else return res + ' Items left'
        
    }

    clearCompleted = (arr) => {
        const res = arr.filter((item) => item.completed === false)
        this.setState({
            demo: res
        })
    }

    filterItems = (str) => {
      const { demo } = this.state
      const toFilterOut =  demo.filter((el) => !el.className.includes(str))
      toFilterOut.forEach((el) => this.changeProp(el.id, 'className', el.className + ' hidden'))
      demo.forEach((el) => {
          if (el.className.includes(str) || str === 'all') this.changeProp(el.id, 'className', el.className.replace(' hidden', ''))})
    }
    
    render() {
        const {demo} = this.state
        return (
            <section className="todoapp">
                <Header newTask={(val) => this.newTask(val)}/>
                <section className="main">
                    <TaskList tasks = {demo}
                              onDelete = {(id) => this.deleteItem(id)}
                              completeTask = {(id) => this.completeTask(id)}
                    />
                    <Footer countActive = {this.countActive(demo)}
                            newTask = {this.newTask}
                            onClearCompleted = {() => this.clearCompleted(demo)}
                            onFilter={(str) => this.filterItems(str)}  
                    />
                </section>
            </section>
                ) 
    }
               
}

