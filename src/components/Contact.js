import React from 'react'

function Contact() {
  return (
    <div className='general-data contact'>
      <div className='form-container'>
        <form
          action='https://formspree.io/f/mlevnjla'
          method='POST'
          className='general-data-form'
        >
          <h1>Страница за контакт</h1>
          <div>
            <label htmlFor='email-data'>Ваша имејл адреса: </label>
            <input type='text' id='email-data' />
          </div>
          <div>
            <label htmlFor='message'>Порука: </label>
            <textarea
              type='text-area'
              id='Message from TestAnalizator'
              name='Message from TestAnalizator'
            />
          </div>

          <div>
            <button type='submit'>Пошаљи</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Contact
