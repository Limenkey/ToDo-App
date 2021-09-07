/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import TasksFilter from '../TasksFilter'
import "./footer.css"

const Footer = ({ countActive, onClearCompleted, onFilter }) => {
    const [btns, setBtns] = useState(
        [ 
            {id:'1', class:'selected', text:'All', filter:'all'},
            {id:'2', class:null, text:'Active', filter:'view'},
            {id:'3', class:null, text:'Completed', filter: 'completed'}
        ]
    )

    

    const getIdx = (id) => btns.findIndex((el) => el.id === id)

    const changeBtnProp = (id, propName, propVal) => {
        setBtns((prev) => {
            const idx = getIdx(id);
            const completedItem = { ...prev[idx] };

            completedItem[propName] = propVal;

            const res = [...prev.slice(0, idx), completedItem, ...prev.slice(idx+1)];
        return res      
        })
    }
    
    const selectBtn = (id) => {
        btns.filter((el) => el.id === id)
                       .forEach((el) => {
            if (el.id === id) changeBtnProp(id, 'class', 'selected')
            else changeBtnProp(id, 'class', null)
        })
        btns.filter(  ( el ) => el.id !== id )
                       .forEach( ( el ) => changeBtnProp( el.id, 'class', null ) )
    }

    const filterBtns = btns.map((item) => (
            <li  key = { item.id }>
                <TasksFilter btn = { item } onFilter={(str, id) => {
                                                                        onFilter(str)
                                                                        selectBtn(id)
                                                                    }} />
            </li>
    ))

    return (
        <footer className="footer">
            <span className="todo-count">{ countActive }</span>
            <ul className="filters">
                {filterBtns}
            </ul>
            <button type="button" className="clear-completed" onClick={onClearCompleted}>Clear completed</button>
        </footer>
    )   
}

Footer.propTypes = {
    countActive: PropTypes.string,
    onClearCompleted: PropTypes.func,
    onFilter: PropTypes.func
}

Footer.defaultProps = {
    countActive:'It has been created sometime ago',
    onClearCompleted: () => {},
    onFilter: () => {}
}

export default Footer