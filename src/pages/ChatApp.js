import React from 'react'

import InputBox from '../components/InputBox'
import Message from '../components/Message'
import Navbar from '../components/Navbar'
const ChatApp = () => {
  return (
    <div className='chat-page'>
      <header>
        <Navbar/>
      </header>
    
        <Message/>
    
        <footer>
          <InputBox/>
          
        </footer>
        
    </div>
  )
}

export default ChatApp