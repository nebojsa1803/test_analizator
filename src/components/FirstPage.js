import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { TbReportAnalytics } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { clearPointsAndMarkArray } from '../features/pointsAndMarkSlice'

function FirstPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clearPointsAndMarkArray())
  }, [])
  return (
    <div className='hero'>
      <nav>
        <Link to='/' className='navbar-logo'>
          <span>Тест</span>Анализатор
          <TbReportAnalytics />
        </Link>
        <ul>
          <li>
            <Link to='/directions' id='link'>
              Упутство
            </Link>
          </li>
          <li>
            <Link to='/product' id='link'>
              О програму
            </Link>
          </li>
          <li>
            <Link to='/contact' id='link'>
              Контакт
            </Link>
          </li>
          <li>
            <button onClick={() => navigate('generalData')}>Започни</button>
          </li>
        </ul>
        <button className='school-button'>
          <a href='https://ossretenlazarevicprilike.edu.rs/'>Школа</a>
        </button>{' '}
      </nav>
      <main>
        <section>
          <h3>
            ТестАнализатор је програм који вам може олакшати израду анализа
            писмених провера. Ако програм нисте користили до сада, прочитајте
            упутсво, ако јесте, започните анализу.
          </h3>
          <div className='button-group'>
            <button onClick={() => navigate('directions')}>Упутство</button>
            <button onClick={() => navigate('generalData')}>Започни</button>
          </div>
        </section>
      </main>

      <footer>
        <h3> &#169;Небојша Николић, 2022. </h3>
      </footer>
    </div>
  )
}

export default FirstPage
