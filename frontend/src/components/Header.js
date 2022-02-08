import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { useDispatch, useSelector } from 'react-redux';
import { USER_SIGNOUT } from '../redux/user/types';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Css/Header.css'

const Header = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const SignIn = useSelector(state => state.userSignIn)
  const { cartItems } = cart
  const { data } = SignIn
  const { token, isAdmin } = data

  const handleSignout = () => {
    localStorage.clear()
    dispatch({ type: USER_SIGNOUT })
    history.push('/')
  }

  return (
    <nav className="Header">
      <Navbar bg="dark" expand="lg">
        <Container>
          <Link to="/" className='Header-home text-warning'>E-Commerce Site</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {(token && isAdmin)
                ? <>
                  <Link to='/dashboard' className='links'>Dashboard</Link>
                  <Link to='/addProduct' className='links'>Add Product</Link>
                  <Link to='/order' className='links'>Orders</Link>
                </>
                : <Link to='/' className='links'>Home</Link>
              }
              {!token && <Link to="/about" className='links'>About Me</Link>}
              {token && !isAdmin && <>
                <Link to='/profile' className='links'>User Profile</Link>
                <Link to='/orderHistory' className='links'>Order History</Link>
              </>
              }
              {!isAdmin && <div className='cart'>
                <Link to="/cart">
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                    <path d='M16 6v2h2l2 12H0L2 8h2V6a6 6 0 1 1 12 0zm-2 0a4 4 0 1 0-8 0v2h8V6zM4 10v2h2v-2H4zm10 0v2h2v-2h-2z' />
                  </svg>
                </Link>
                {
                  cartItems.length === 0
                    ? ''
                    : <div className='amount'>
                      <p className='total-amount'>
                        {
                          cartItems.reduce((total, item) => {
                            return total += item.quantity
                          }, 0)
                        }
                      </p>
                    </div>
                }
              </div>
              }
            </Nav>
            {!token
              ? <>
                <Link to='/login' className='links'>Sign in</Link>
                <Link to='/register' className='links'>Sign up</Link>
              </>
              : <Link to='#' className='links' onClick={handleSignout}>Sign out</Link>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </nav>
  );
}

export default Header;
