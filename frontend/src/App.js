import React from 'react'
import { Switch, Route } from 'react-router-dom'

//components
import Navbar from './components/Header'
import Products from './components/Products'
import Product from './components/Product'
import Shipping from './paymentMethod/Shipping'
import Payment from './paymentMethod/Payment'
import Placeorder from './paymentMethod/Placeorder'
import Order from './paymentMethod/Order'
import OrderHistory from './components/OrderHistory'
import UserProfile from './components/UserProfile'
import AddProduct from './admin/AddProduct'
import Dashboard from './admin/Dashboard'
import adminOrder from './admin/Order'

// Pages
import About from './pages/About'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import ErrorPage from './pages/ErrorPage'

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Products} />
        <Route path='/about' component={About} />
        <Route path='/cart' component={Cart} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/product/:id' component={Product} />
        <Route path='/shipping' component={Shipping} />
        <Route path='/payment' component={Payment} />
        <Route path='/placeorder' component={Placeorder} />
        <Route path='/order/:id' component={Order} />
        <Route path='/orderHistory' component={OrderHistory} />
        <Route path='/profile' component={UserProfile} />
        {/* Admin Routes */}
        <Route path='/addProduct' component={AddProduct} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/order' component={adminOrder} />
        {/* Admin Routes */}
        <Route path='*' component={ErrorPage} />
      </Switch>
    </>
  )
}

export default App
