import React from 'react'
import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Auth  from './pages/auth/index.js'
import ExpenseTracker from './pages/expense-tracker/index.js'


const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
          <Routes>
            
            <Route 
            path='/' 
            exact element={<Auth />}/>

            <Route 
            path='/expense-tracker' 
            exact element={<ExpenseTracker />}/>

          </Routes>
      
      </BrowserRouter>
    </div>
  )
}

export default App