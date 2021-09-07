/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-filename-extension */
import React, {useState} from "react"
import { formatDistanceToNow } from 'date-fns'
import TaskList from "../TaskList"
import Header from "../Header"
import Footer from "../Footer"
import "./app.css"



const App = () => {

    const [tasks, setTasks] = useState( [
        { id: 1, text: 'Get some coffee', className:'view', completed: false, created: `created ${  formatDistanceToNow(new Date(2021, 7, 20))  } ago` },
        { id: 2, text: 'Get some food', className:'view', completed: false, created: `created ${  formatDistanceToNow(new Date(2021, 7, 22))  } ago`},
        { id: 3, text: 'Keep learning', className:'view', completed: false, created: `created ${  formatDistanceToNow(new Date(2021, 7, 23))  } ago`}
       ])


   let maxId = 10

   const newTask = (text) => {
    const newItem = {
      id: (maxId += 1),
      text,
      className: "view",
      completed: false,
      created: `created ${Date.now()} ago`
    };

    setTasks([...tasks, newItem]);
  };

   const getIdx = (id) => tasks.findIndex((el) => el.id === id)


   const deleteItem = (id) => setTasks(tasks.filter((el) => el.id !== id));

    
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

   const countActive = (arr) => {
        const res = arr.filter((item) => item.completed === false).length
        if (res === 1) return `${res  } Item left`
        return `${res  } Items left`    
    }

    const clearCompleted = (arr) => {
        const res = arr.filter((item) => item.completed === false)
        setTasks(res)
      }

   const filterItems = (str) => {
      const toFilterOut =  tasks.filter((el) => !el.className.includes(str))
      toFilterOut.forEach((el) => changeProp(el.id, 'className', `${el.className  } hidden`))
      tasks.forEach((el) => {
          if (el.className.includes(str) || str === 'all') changeProp(el.id, 'className', el.className.replace(' hidden', ''))})
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