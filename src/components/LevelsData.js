import { nanoid } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTasksLevels } from '../features/levelsDataSlice'
import { useNavigate } from 'react-router-dom'

function LevelsData() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { numberOfTasks } = useSelector(
    (store) => store.generalData.generalData
  )

  const taskArray = Array.from(
    { length: numberOfTasks },
    (curr, i) => `${i + 1}. задатак`
  )
  const [taskLevels, setTaskLevels] = useState({})

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setTaskLevels({ ...taskLevels, [name]: value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (Object.values(taskLevels).length === numberOfTasks * 1) {
      dispatch(addTasksLevels(taskLevels))
      navigate(`./../pointsandmark`, { replace: true })
    } else {
      alert('Да бисте наставили даље морате попунити сва поља.')
    }
  }

  return (
    <div className='levels'>
      <div className='levels-data-container'>
        <form>
          <div>
            <h2>Одаберите ниво за сваки задатак</h2>
            {taskArray.map((task, index) => {
              return (
                <div key={nanoid()} className='levels-data'>
                  <p>{index + 1}. задатак: </p>
                  <div id={task} className='levels-data-radios'>
                    <input
                      type='radio'
                      name={task}
                      id={task + 'osnovni'}
                      value='osnovni'
                      onChange={handleChange}
                      checked={taskLevels[task] === 'osnovni'}
                    />
                    <label htmlFor={task + 'osnovni'}>основни</label>

                    <input
                      type='radio'
                      name={task}
                      id={task + 'srednji'}
                      value='srednji'
                      onChange={handleChange}
                      checked={taskLevels[task] === 'srednji'}
                    />
                    <label htmlFor={task + 'srednji'}>средњи</label>

                    <input
                      type='radio'
                      name={task}
                      id={task + 'napredni'}
                      value='napredni'
                      onChange={handleChange}
                      checked={taskLevels[task] === 'napredni'}
                    />
                    <label htmlFor={task + 'napredni'}>напредни</label>
                  </div>
                </div>
              )
            })}
            <button type='submit' onClick={handleSubmit}>
              Потврди
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LevelsData
