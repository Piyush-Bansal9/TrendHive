import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/auth/layout'
import Signin from './pages/auth/Signin'
import Signup from './pages/auth/Signup'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/auth' element = {<AuthLayout/>}>
          <Route path='signup' element = {<Signup/>} />
          <Route path='signin' element = {<Signin/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
