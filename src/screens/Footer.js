import React from 'react'

function Footer() {
  const today = new Date();
  return (
    <main className='Footer'>
      <p>Licence by &copy; {today.getDay()} / {today.getMonth()} / {today.getFullYear()}
       </p>
    </main>
  )
}

export default Footer
