/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TasksFilter from '../TasksFilter'
import "./footer.css"

export default class Footer extends Component{
    state = {
        btns: [ 
            {id:'1', class:null, text:'All', filter:'all'},
            {id:'2', class:null, text:'Active', filter:'view'},
            {id:'3', class:null, text:'Completed', filter: 'completed'}
              ]
    }

    static propTypes = {
        countActive: PropTypes.string,
        onClearCompleted: PropTypes.func,
        onFilter: PropTypes.func
    }

    static defaultProps = {
        countActive:'It has been created sometime ago',
        onClearCompleted: () => {},
        onFilter: () => {}
    }

    getIdx = (id) => {
        const {btns} = this.state
        btns.findIndex((el) => el.id === id)}    

    changeBtnProp = (id, propName, propVal) => {
        this.setState(({btns}) => {

            const idx = this.getIdx(id);
            const completedItem = { ...btns[idx] };

            completedItem[propName] = propVal;

            const res = [...btns.slice(0, idx), completedItem, ...btns.slice(idx+1)];
        return {
            btns: res
        }   
        })
    }
    
    selectBtn = (id) => {
        const {btns} = this.state
        btns.filter((el) => el.id === id)
                       .forEach((el) => {
            if (el.id === id) this.changeBtnProp(id, 'class', 'selected')
            else this.changeBtnProp(id, 'class', null)
        })
        btns.filter(  ( el ) => el.id !== id )
                       .forEach( ( el ) => this.changeBtnProp( el.id, 'class', null ) )
    }

    render() {
        const { countActive, onClearCompleted, onFilter } = this.props
        const { btns } = this.state
        const filterBtns = btns.map((item) => (
                <li  key = { item.id }>
                    <TasksFilter btn = { item } onFilter={(str, id) => {
                                                                         onFilter(str)
                                                                         this.selectBtn(id)
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
    
}
