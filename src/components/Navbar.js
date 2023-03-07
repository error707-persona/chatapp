import React from 'react'
import logo from "../assests/logo.jpg"
const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={logo} width={40} style={{marginLeft:"10px"}}/>
        <button className='logout' value="logout">LOGOUT</button>
    </div>
  )
}

export default Navbar