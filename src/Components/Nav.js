import React from 'react'
import {Link} from 'react-router-dom'
function Nav({search, setSearch}) {
  return (
    <nav className='Nav'>
      <form onSubmit={(e)=> e.preventDefault()} className="searchForm">
        <label htmlFor="search">Search Posts</label>
        <input 
          type="text" 
          id="search"
          placeholder="Search Post"
          value={search}
          onChange={(e)=> setSearch(e.target.value)}
        />
      </form>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/post'>Post</Link></li>
      </ul>
    </nav>
  )
}

export default Nav
