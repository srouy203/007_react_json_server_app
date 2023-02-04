import React from 'react'
import { Link } from 'react-router-dom'

function Missing() {
  return (
    <main className='Home' >
      <h1>Page is not found</h1>
      <p>Well, that's not you want to go bro</p>
      <p>
        <Link to='/'>Go back to homepage</Link>
      </p>
    </main>
  )
}

export default Missing
