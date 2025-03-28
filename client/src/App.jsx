import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/auth/layout'
import Signin from './pages/auth/Signin'
import Signup from './pages/auth/Signup'
import Adminlayout from './components/admin-view/layout'
import AdminDashboard from './pages/admin-view/products'
import AdminProducts from './pages/admin-view/products'
import AdminOrders from './pages/admin-view/orders'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/auth' element = {<AuthLayout/>}>
          <Route path='signup' element = {<Signup/>} />
          <Route path='signin' element = {<Signin/>} />
        </Route>
        <Route path='admin' element = {<Adminlayout/>}>
          <Route path='dashboard' element = { <AdminDashboard/>}/>
          <Route path='products' element = {<AdminProducts/>}/>
          <Route path='orders' element = {<AdminOrders/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
