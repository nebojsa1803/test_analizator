import React from 'react'
import { FaReact, FaCss3Alt } from 'react-icons/fa'
import { IoLogoJavascript } from 'react-icons/io'

function Product() {
  return (
    <div className='product'>
      <div className='about-product'>
        <h1>О програму</h1>
        <p>
          ТестАнализатор је програм написан за лакше анализирање писмених
          провера. За писање програма су коришћени програмски језици и
          библиотеке наведене испод.
        </p>
        <div className='language-and-libraries'>
          <div>
            <FaReact />
            <span>react</span>
          </div>
          <div>
            <IoLogoJavascript />
            <span>javascript</span>
          </div>
          <div>
            <span>ReduxToolkit</span>
          </div>
          <div>
            <span>ReactRouter6</span>
          </div>
          <div>
            <FaCss3Alt />
            <span>css</span>
          </div>
          <div>
            <span>formspree</span>
          </div>
          <div>
            <span>chartjs</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
