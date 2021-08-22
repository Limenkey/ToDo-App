import React from 'react'
import TasksFilter from '../TasksFilter'
import '../Footer/footer.css'

const btns = [{id:'1', class:'selected', text:'All'},
              {id:'2', class:'activated', text:'Active'},
              {id:'3', class:'complited', text:'Complited'}]


const Footer = () => {
    const filterBtns = btns.map((item) => {
        return (
            <li  key={item.id}>
                <TasksFilter btn={item} />
            </li>
        )
    })
    return (
        <footer className="footer">
            <span className="todo-count">1 items left</span>
            <ul className="filters">
                {filterBtns}
            </ul>
            <button className="clear-completed">Clear completed</button>
      </footer>
    )
}

export default Footer