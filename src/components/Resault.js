import React from 'react'
import { useSelector } from 'react-redux'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

function Resault() {
  const {
    subject,
    dateOfWork,
    typeOfTest,
    schoolClass,
    classDivision,
    totalNumberOfStudents,
    numberOfStudentsWhoWorked,
    typeOfMark,
    numberOfTasks,
  } = useSelector((store) => store.generalData.generalData)

  const levelsObject = useSelector((store) => store.levels.taskLevels)
  const levels = Object.values(levelsObject)
  let numberTasksOnLevelsObject = levels.reduce(
    (acc, curr) => {
      acc[curr]++
      return acc
    },
    { osnovni: 0, srednji: 0, napredni: 0 }
  )

  const pointsAndMarkArray = useSelector(
    (store) => store.pointsAndMark.classResault
  )
  const startObjectForPointsAndMarkSum = Object.keys(
    pointsAndMarkArray[0]
  ).reduce((acc, curr) => {
    return { ...acc, [curr]: 0 }
  }, {})

  const pointsAndMarkSum = pointsAndMarkArray.reduce((acc, curr) => {
    for (let key in curr) {
      acc[key] = curr[key] * 1 + acc[key] * 1
    }
    return acc
  }, startObjectForPointsAndMarkSum)

  const classAverageMark = (pointsAndMarkSum.mark / numberOfStudentsWhoWorked)
    .toFixed(2)
    .replace('.', ',')

  const taskPointsSumArray = Object.values(pointsAndMarkSum).slice(1, -1)
  const levelsNamesArray = Object.values(levelsObject)

  const averageClassPoints = taskPointsSumArray.reduce((acc, curr) => {
    acc += curr / numberOfStudentsWhoWorked
    return acc
  }, 0)

  const swapDate = (myDate) => {
    return myDate
      .split('-')
      .reverse()
      .map((el) => el + '.')
      .join(' ')
  }

  const calculatePercetageRealizationOnLevels = (
    arrayOfLevels,
    arrayOfPoints
  ) => {
    let tempObject = { osnovni: 0, srednji: 0, napredni: 0 }
    for (let i = 0; i < arrayOfLevels.length; i++) {
      if (arrayOfLevels[i] === 'osnovni') {
        tempObject.osnovni += arrayOfPoints[i] * 1
      } else if (arrayOfLevels[i] === 'srednji') {
        tempObject.srednji += arrayOfPoints[i] * 1
      } else if (arrayOfLevels[i] === 'napredni') {
        tempObject.napredni += arrayOfPoints[i] * 1
      }
    }
    return tempObject
  }

  const levelsResaultsObject = calculatePercetageRealizationOnLevels(
    levelsNamesArray,
    taskPointsSumArray
  )
  const basicLevelPercentage = (
    (levelsResaultsObject.osnovni /
      (numberOfStudentsWhoWorked * numberTasksOnLevelsObject.osnovni)) *
    100
  ).toFixed(2)

  const mediumLevelPercentage = (
    (levelsResaultsObject.srednji /
      (numberOfStudentsWhoWorked * numberTasksOnLevelsObject.srednji)) *
    100
  ).toFixed(2)
  const advancedLevelPercentage = (
    (levelsResaultsObject.napredni /
      (numberOfStudentsWhoWorked * numberTasksOnLevelsObject.napredni)) *
    100
  ).toFixed(2)

  const nubmberOfEveryMark = pointsAndMarkArray.reduce(
    (acc, curr) => {
      if (curr.mark == 1) {
        acc.jedinice += 1
      } else if (curr.mark == 2) {
        acc.dvojke += 1
      } else if (curr.mark == 3) {
        acc.trojke += 1
      } else if (curr.mark == 4) {
        acc.cetvorke += 1
      } else if (curr.mark == 5) {
        acc.petice += 1
      }
      return acc
    },
    { jedinice: 0, dvojke: 0, trojke: 0, cetvorke: 0, petice: 0 }
  )

  const optionsMarks = {
    responsive: true,
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },

    scales: {
      y: {
        min: 0,
        ticks: {
          stepSize: 1,
        },
      },
    },
  }
  const optionsPercent = {
    responsive: true,
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },

    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 10,
        },
      },
    },
  }

  return (
    <div className='resault'>
      <div className='resault-text'>
        <h1>Анализа теста</h1>
        <h3>Предмет: {subject}</h3>
        <h3>Датум: {swapDate(dateOfWork)}</h3>
        <h3>Врста теста: {typeOfTest}</h3>
        <h3>
          Одељење: {schoolClass}
          <small>{classDivision}</small>
        </h3>
        <h3>Укупно ученика: {totalNumberOfStudents}</h3>
        <h3>Број ученика који су радили: {numberOfStudentsWhoWorked}</h3>
        <h3>
          Просечан број бодова:{' '}
          {averageClassPoints.toFixed(2).replace('.', ',')} од максимално
          могућих могућих {numberOfTasks}{' '}
        </h3>
        {typeOfMark === 'true' && (
          <h3>Просечна оцена: {classAverageMark.replace('.', ',')}</h3>
        )}
      </div>
      {typeOfMark === 'true' && (
        <div className='marks'>
          <div style={{ width: 500 }} className='marks-bars'>
            <Bar
              options={optionsMarks}
              data={{
                labels: ['јединице', 'двојке', 'тројке', 'четворке', 'петице'],
                datasets: [
                  {
                    label: 'број оцена',
                    data: [
                      nubmberOfEveryMark.jedinice,
                      nubmberOfEveryMark.dvojke,
                      nubmberOfEveryMark.trojke,
                      nubmberOfEveryMark.cetvorke,
                      nubmberOfEveryMark.petice,
                    ],
                    backgroundColor: '#d33f49',
                    borderColor: 'black',
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </div>
          <div className='marks-table'>
            <table style={{ border: '1px solid black' }} className='red'>
              <tbody>
                <tr>
                  <th>јединица</th>
                  <th>двојки</th>
                  <th>тројки</th>
                  <th>четворки</th>
                  <th>петица</th>
                </tr>
                <tr>
                  <td>{nubmberOfEveryMark.jedinice}</td>
                  <td>{nubmberOfEveryMark.dvojke}</td>
                  <td>{nubmberOfEveryMark.trojke}</td>
                  <td>{nubmberOfEveryMark.cetvorke}</td>
                  <td>{nubmberOfEveryMark.petice}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className='marks'>
        <div style={{ width: 500 }} className='marks-bars'>
          <Bar
            options={optionsPercent}
            data={{
              labels: ['основни', 'средњи', 'напредни'],
              datasets: [
                {
                  label: 'оствареност по нивоима',
                  data: [
                    basicLevelPercentage,
                    mediumLevelPercentage,
                    advancedLevelPercentage,
                  ],
                  backgroundColor: '#009c7b',
                  borderColor: 'black',
                  borderWidth: 1,
                },
              ],
            }}
          />
        </div>
        <div className='resault-levels-bars'>
          <table style={{ border: '1px solid black' }}>
            <tbody>
              <tr>
                <th>основни</th>
                <th>средњи</th>
                <th>напредни</th>
              </tr>
              <tr>
                <td>
                  {' '}
                  {basicLevelPercentage === 'NaN'
                    ? 'не постоји'
                    : basicLevelPercentage + '%'}
                </td>
                <td>
                  {mediumLevelPercentage === 'NaN'
                    ? 'не постоји'
                    : mediumLevelPercentage + '%'}
                </td>
                <td>
                  {advancedLevelPercentage === 'NaN'
                    ? 'не постоји'
                    : advancedLevelPercentage + '%'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className='resault-tasks'>
        <Bar
          options={optionsPercent}
          data={{
            labels: Array.from({ length: numberOfTasks }, (curr, i) => {
              return i + 1
            }),
            datasets: [
              {
                label: 'проценат освојених поена за сваки задатак',
                data: taskPointsSumArray.map((task) => {
                  return ((task * 1) / numberOfStudentsWhoWorked) * 100
                }),
                backgroundColor: '#36a3cc',
                borderColor: 'black',
                borderWidth: 1,
              },
            ],
          }}
        />
        <table style={{ border: '1px solid black' }} className='blue'>
          <tbody>
            <tr>
              {taskPointsSumArray.map((task, index) => {
                return <th key={index}>{index + 1}.задатак</th>
              })}
            </tr>
            <tr>
              {taskPointsSumArray.map((task, index) => {
                return (
                  <td key={index}>
                    {(((task * 1) / numberOfStudentsWhoWorked) * 100).toFixed(
                      2
                    )}
                    %
                  </td>
                )
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Resault
