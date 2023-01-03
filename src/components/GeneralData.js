import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addGeneralData } from '../features/generalDataSlice'

function GeneralData() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [startDataInputs, setStartDataInputs] = useState({
    subject: '',
    dateOfWork: '',
    typeOfTest: '',
    typeOfMark: '',
    schoolClass: '',
    classDivision: '',
    totalNumberOfStudents: '',
    numberOfStudentsWhoWorked: '',
    numberOfTasks: '',
  })
  const [startDataDropdown, setStartDataDropDown] = useState({
    typeOfMark: '',
  })

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setStartDataInputs({ ...startDataInputs, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      startDataInputs.subject &&
      startDataInputs.dateOfWork &&
      startDataInputs.typeOfTest &&
      startDataDropdown.typeOfMark &&
      startDataInputs.schoolClass &&
      startDataInputs.classDivision &&
      startDataInputs.totalNumberOfStudents &&
      startDataInputs.numberOfStudentsWhoWorked &&
      startDataInputs.numberOfTasks
    ) {
      dispatch(addGeneralData({ ...startDataInputs, ...startDataDropdown }))
      navigate('./../levels', { replace: true })
    } else {
      alert('Да бисте наставили даље морате попунити сва поља.')
    }
  }

  return (
    <div className='general-data'>
      <div className='form-container'>
        <form className='general-data-form'>
          <h1>Општи подаци</h1>
          <div>
            <label htmlFor='subject'>Предмет: </label>
            <input
              type='text'
              id='subject'
              name='subject'
              value={startDataInputs.subject}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='dateOfWork'>Датум: </label>
            <input
              type='date'
              id='dateOfWork'
              name='dateOfWork'
              value={startDataInputs.dateOfWork}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='typeOfTest'>Врста теста: </label>
            <input
              type='text'
              id='typeOfTest'
              name='typeOfTest'
              value={startDataInputs.typeOfTest}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='typeOfMark'>Врста оцене: </label>
            <select
              name='typeOfMark'
              id='typeOfMark'
              value={startDataDropdown.typeOfMark}
              onChange={() =>
                setStartDataDropDown({
                  typeOfMark: document.getElementById('typeOfMark').value,
                })
              }
            >
              <option hidden default>
                Одабери...
              </option>
              <option value={true}>бројчана</option>
              <option value={false}>не оцењује се</option>
            </select>
          </div>
          <div>
            <label htmlFor='schoolClass'>Разред: </label>
            <input
              type='text'
              id='schoolClass'
              name='schoolClass'
              value={startDataInputs.schoolClass}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='classDivision'>Одељење: </label>
            <input
              type='text'
              id='classDivision'
              name='classDivision'
              value={startDataInputs.classDivision}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='totalNumberOfStudents'>Укупан број ученика: </label>
            <input
              type='text'
              id='totalNumberOfStudents'
              name='totalNumberOfStudents'
              value={startDataInputs.totalNumberOfStudents}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='numberOfStudentsWhoWorked'>
              Број ученика који су радили:{' '}
            </label>
            <input
              type='text'
              id='numberOfStudentsWhoWorked'
              name='numberOfStudentsWhoWorked'
              value={startDataInputs.numberOfStudentsWhoWorked}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='numberOfTasks'>Број задатака: </label>
            <input
              type='text'
              id='numberOfTasks'
              name='numberOfTasks'
              value={startDataInputs.numberOfTasks}
              onChange={handleChange}
            />
          </div>
          <div>
            <button type='submit' onClick={handleSubmit}>
              Потврди
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default GeneralData
