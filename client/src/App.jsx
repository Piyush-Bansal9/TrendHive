import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/auth/layout'
import Signin from './pages/auth/Signin'
import Signup from './pages/auth/Signup'
import Adminlayout from './components/admin-view/layout'
import AdminDashboard from './pages/admin-view/products'
import AdminProducts from './pages/admin-view/products'
import AdminOrders from './pages/admin-view/orders'
import ShoppingLayout from './components/shopping-view/layout'
import ShoppingHome from './pages/shopping-view/Home'
import ShoppingListing from './pages/shopping-view/listing'
import ShoppingAccount from './pages/shopping-view/account'
import ShoppingCheckout from './pages/shopping-view/checkout'
import NotFound from './components/notFound/layout'
import CheckAuth from './components/common/check-auth'
import UnAuthPage from './pages/un-auth'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './store/auth-slice'
import { Skeleton } from "./components/ui/skeleton"
import PaypalReturnPage from './pages/shopping-view/paypal-return'
import PaymentSuccess from './pages/shopping-view/payment-success'


function App() {
  const {isAuthenticated, user, isLoading} = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch]);

  if(isLoading) return <Skeleton className="w-[800px] h-[600px] bg-black " />


  return (
    <>
      <Routes>
        <Route path='/auth' element = {
          <CheckAuth isAuthenticated={isAuthenticated} user={user} >
            <AuthLayout/>
          </CheckAuth>}>
          <Route path='signup' element = {<Signup/>} />
          <Route path='signin' element = {<Signin/>} />
        </Route>
        <Route path='/admin' element = {
          <CheckAuth isAuthenticated={isAuthenticated} user={user} >
            <Adminlayout/>
          </CheckAuth>}>
          <Route path='dashboard' element = { <AdminDashboard/>}/>
          <Route path='products' element = {<AdminProducts/>}/>
          <Route path='orders' element = {<AdminOrders/>}/>
        </Route>
        <Route path='/shopping' element = {
          <CheckAuth isAuthenticated={isAuthenticated} user={user} >
            <ShoppingLayout/>
          </CheckAuth>}>
          <Route path='home' element = {<ShoppingHome/>}/>
          <Route path='listing' element = {<ShoppingListing/>}/>
          <Route path='account' element = {<ShoppingAccount/>}/>
          <Route path='checkout' element = {<ShoppingCheckout/>}/>
          <Route path='paypal-return' element = {<PaypalReturnPage/>}/>
          <Route path='payment-success' element = {<PaymentSuccess/>}/>
        </Route>
        <Route path='/unauth-page' element = {<UnAuthPage/>} />
        <Route path='*' element = {<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App
