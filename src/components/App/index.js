/* eslint-disable no-return-assign */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-filename-extension */
import React, {useState} from "react"
import TaskList from "../TaskList"
import Header from "../Header"
import Footer from "../Footer"
import "./app.css"



const App = () => {

    

    const [tasks, setTasks] = useState(() => {
        let res = []
        if (localStorage.getItem('tasks')) res = JSON.parse(localStorage.getItem('tasks'))
        return res
    }  
    )

    window.addEventListener('unload', () => localStorage.setItem('tasks', JSON.stringify(tasks)))

    const newTask = (text) => {
        const timestamp = new Date()
        const [month, day, year] = [timestamp.getMonth(), timestamp.getDate(), timestamp.getFullYear()]
        const [hour, minutes, seconds] = [timestamp.getHours(), timestamp.getMinutes(), timestamp.getSeconds()]
        const newItem = {
            id: Math.floor(Math.random()*1000),
            text,
            className: "view",
            completed: false,
            created: [year, month, day, hour, minutes, seconds]
    };

    setTasks([...tasks, newItem]);
    };


    const getIdx = (id) => tasks.findIndex((el) => el.id === id)


    const deleteItem = (id) => {
        localStorage.removeItem(id)   
        setTasks(tasks.filter((el) => el.id !== id))
    };

    
    const changeProp = (id, propName, propVal) => {
        const updatedTasks = tasks.map((task) => {
        if (task.id === id) task[propName] = propVal
        return task
        }
        )
        setTasks(updatedTasks)
    }

    const completeTask = (id) => {
        const idx = getIdx(id)
        !tasks[idx].completed ? changeProp(id, 'className', 'completed') : changeProp(id, 'className', 'view')
        changeProp(id,'completed', !tasks[idx].completed) 
    }

    const countActive = (arr = []) => {
        const res = arr.filter((item) => item.completed === false).length
        if (res) return `${res  } Item left`
        return `${res  } Items left`    
    }

    const clearCompleted = (arr) => {
        const res = arr.filter((item) => {
           if (item.completed) localStorage.removeItem(item.id)
            return !item.completed
        })
        setTasks(res)
      }

    const filterItems = (str) => {
        const all = 'all'
      tasks.forEach((el) => {
          if (!el.className.includes(str) && str !== all) changeProp(el.id, 'className', `${el.className  } hidden`)
          if (el.className.includes(str) || str === all) changeProp(el.id, 'className', el.className.replace(' hidden', ''))})
    }


    
    
    return (
        <section className="todoapp">
            <Header newTask={(val) => newTask(val)}/>
            <section className="main">
                <TaskList tasks = {tasks}
                          onDelete = {(id) => deleteItem(id)}
                          completeTask = {(id) => completeTask(id)}
                          
                />
                <Footer countActive = {countActive(tasks)}
                        newTask = {newTask}
                        onClearCompleted = {() => clearCompleted(tasks)}
                        onFilter={(str) => filterItems(str)}  
                />
            </section>
            
        </section>
    ) 

               
}

export default App