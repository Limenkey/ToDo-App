/* eslint-disable prefer-const */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-filename-extension */

import React, {useState, useEffect} from "react"
import PropTypes from 'prop-types'
import "./task.css"
import formatDistanceToNow from "date-fns/formatDistanceToNow"


const Task = ({ todo, onDelete, completeTask}) => {
  const created = formatDistanceToNow(new Date(...todo.created))
  
  return (
    <div className="task-body view">
      <Toggle completeTask={ () => completeTask(todo.id) }/>
      <label className="task__content">
        <span className="description">{todo.text}</span>
        <Timer counter={todo.counter} 
              id={todo.id}
              />
        <span className="created">{`${created} ago`}</span>
      </label>
      <div className="task__btns">
        <button type="button" className="icon icon-edit" />
        <button type="button" className="icon icon-destroy" onClick={() => onDelete(todo.id)} />
      </div>
    </div>    
  )
} 

Task.defaultProps = {
  todo: {},
  onDelete: () => {},
}

Task.propTypes = {
  todo: PropTypes.object,
  onDelete: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  completeTask: PropTypes.func
}

const Toggle = ({completeTask}) => (
  <input className="toggle" type="checkbox" onClick={ () => completeTask() }/> 
)

Toggle.propTypes = {
  // eslint-disable-next-line react/require-default-props
  completeTask: PropTypes.func
}

export default Task

const Timer = ({id}) => {

  let [timer, setTimer] = useState(() => {
    let res = {
      count: 0,
      isRunning: false,
      started: 0,
      classStart:"timer__btn", 
      classStop: "timer__btn timer__btn--active",
    }
    if (localStorage.getItem(id)) {
      res = JSON.parse(localStorage.getItem(id))
      if (res.isRunning === true) res = {...res, count: res.count + Date.now() - res.started } 
    } 
    return res
  }
  )

  const timerStopped = !timer.isRunning ? "timer__btn--active" : ''
  const timerStarted = timer.isRunning ? "timer__btn--active" : '' 

  const countTime = () => { 
    setTimer(prev => {
        localStorage.setItem(id, JSON.stringify({...prev, count: prev.count + 1000, started: Date.now()}))
        return {...prev, count: prev.count + 1000}
      })
    } 
   

  const startTimer = () => {   
    if (!timer.isRunning) {
      setTimer((prev) => ({
        ...prev, 
        isRunning: true, 
        classStart:"timer__btn timer__btn--active", 
        classStop: "timer__btn",
      }))
      localStorage.setItem(id, JSON.stringify({...timer, isRunning: true}))
    }
  }

  const stopTimer = () => {  
      if (timer.isRunning) {setTimer((prev) => ({
          ...prev,
          isRunning: false,
          classStart: "timer__btn", 
          classStop: "timer__btn timer__btn--active"
        }))
    localStorage.setItem(id, JSON.stringify({...timer, isRunning: false}))}
  }

  useEffect(() => {
    let interval
    if (timer.isRunning) {
    interval = setInterval(()=> countTime(), 1000)
    }
    return () => clearInterval(interval)
  })

  return (
    <span className="timer">
      <div className="timer__controls">
        <button type="button" className={`timer__btn ${timerStarted}`}
                onClick={startTimer}>
          <i className="gg-play-button"/>
        </button>
        <button type="button" className={`timer__btn ${timerStopped}`}
                onClick={stopTimer}>
          <i className="gg-play-pause"/>
        </button>
      </div>
      <div className="timer__clock">
        <span className="timer__unit timer__hours">{Math.floor(timer.count/1000/60/60)} :</span>
        <span className="timer__unit timer__minutes">{Math.floor(timer.count/1000/60)%60} :</span>
        <span className="timer__unit timer__minutes">{Math.floor(timer.count/1000)%60}</span>
      </div>
    </span>
  )

}

Timer.defaultProps = {
  id: 0,
}

Timer.propTypes = {
  id: PropTypes.number,
}