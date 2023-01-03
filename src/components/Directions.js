import React from 'react'

function Directions() {
  return (
    <div className='product'>
      <div className='about-product'>
        <h1>О програму</h1>
        <p>
          За коришћење програма требало би поштовати неколико правила и
          препорука.
          <ol>
            <li>Максималан број бодова за сваки задатак је 1.</li>
            <li>Минималан број бодова за сваки задатак је 0.</li>
            <li>Децималне бројеве уносити са тачком (нпр. 0.25, не 0,25)</li>
            <li>Сваки задатак има свој ниво (основни, средњи, напредни).</li>
            <li>Препоручљива је употреба Google Chrome-а.</li>
          </ol>
        </p>
      </div>
    </div>
  )
}

export default Directions
