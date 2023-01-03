import { nanoid } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addClassResault } from '../features/pointsAndMarkSlice'

function PointsAndMark() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { numberOfStudentsWhoWorked, numberOfTasks, typeOfMark } = useSelector(
    (store) => store.generalData.generalData
  )
  const taskArray = Array.from({ length: numberOfTasks }, (curr, i) => {
    return `${i + 1}. задатак`
  })
  const markProperty = typeOfMark === 'true' ? '' : 'no_mark'
  const individualResaultObject = taskArray.reduce(
    (acc, curr, index) => {
      acc = { ...acc, [curr]: '' }
      return acc
    },
    { mark: markProperty }
  )

  const [studentNumber, setStudentNumber] = useState(1)
  const [individualResault, setIndividualResault] = useState(
    individualResaultObject
  )

  const classResault = useSelector((store) => {
    return store.pointsAndMark.classResault
  })

  const handleIndividualResault = (e) => {
    const name = e.target.name
    const value = e.target.value
    setIndividualResault({
      ...individualResault,
      [name]: value,
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const newIndividualResault = {
      ...individualResault,
      id: nanoid(),
    }
    if (Object.values(individualResault).includes('')) {
      alert('Да бисте наставили даље морате попунити сва поља.')
    } else if (
      Object.values(individualResault)
        .slice(1)
        .some((points) => {
          return points * 1 < 0 || points * 1 > 1
        })
    ) {
      alert('Број поена мора бити између 0 и 1. ')
    } else if (studentNumber < numberOfStudentsWhoWorked) {
      setStudentNumber((prevNumber) => setStudentNumber(prevNumber + 1))
      dispatch(addClassResault([...classResault, newIndividualResault]))
    } else {
      dispatch(addClassResault([...classResault, newIndividualResault]))
      navigate('./../resault', { replace: true })
    }
    setIndividualResault(individualResaultObject)
  }

  return (
    <div className='points-and-mark'>
      <div className='form-container'>
        <form className='general-data-form'>
          <h1>
            Унесите бодове {typeOfMark === 'true' && 'и оцену'} за ученика број{' '}
            {studentNumber} од {numberOfStudentsWhoWorked}
          </h1>
          <div className='progressbar-container'>
            <div
              className='progress'
              style={{
                width: `${(studentNumber / numberOfStudentsWhoWorked) * 100}%`,
              }}
            ></div>
          </div>
          {taskArray.map((task, index) => {
            return (
              <div key={index}>
                <label htmlFor={task}>{task}: </label>
                <input
                  type='number'
                  name={task}
                  id={task}
                  value={individualResault[task]}
                  onChange={handleIndividualResault}
                />
              </div>
            )
          })}
          {typeOfMark === 'true' && (
            <div>
              <label htmlFor='mark'>Оцена: </label>
              <input
                type='number'
                name='mark'
                id='mark'
                value={individualResault.mark}
                onChange={handleIndividualResault}
              />
            </div>
          )}
          <button type='submit' onClick={handleSubmit}>
            Потврди
          </button>
        </form>
      </div>
    </div>
  )
}

export default PointsAndMark
