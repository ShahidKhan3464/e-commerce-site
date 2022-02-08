import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../redux/cart/actions'
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '..//Css/Cart.css'

function Cart() {
    const history = useHistory()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    const handleQuantity = (e) => {
        const { id, value } = e.target
        if (value > 0) {
            dispatch(addToCart(id, Number(value)))
        }
    }

    const removeFromCartHandler = (_id) => {
        dispatch(removeFromCart(_id))
    }

    const handleCheckout = () => {
        if (!localStorage.getItem('token')) {
            history.push({
                pathname: '/login',
                state: 'To order the product you need to be login first!!!'
            })
            return
        }
        history.push('/shipping')
    }

    if (cartItems.length === 0) {
        return (
            <div className='Cart'>
                <header>
                    <h2>your cart</h2>
                    <h4 className='empty-cart'>is currently empty</h4>
                </header>
            </div>
        )
    }

    return (
        <section className='Cart'>
            <header>
                <h2>your cart</h2>
            </header>
            {cartItems.map(item =>
                <div key={item._id}>
                    <article className='cart-item'>
                        <img src={item.image} alt={item.name} />
                        <div className='item-details'>
                            <h5>{item.name}</h5>
                            <h5 className='item-price'>${item.price}</h5>
                            <button className='remove-btn' onClick={() => removeFromCartHandler(item._id)}>remove</button>
                        </div>
                    </article>
                    <div className='item-quantity'>
                        <input type="number" value={item.quantity} id={item._id} onChange={handleQuantity} />
                    </div>
                </div>
            )}
            <footer>
                <div className='cart-total'>
                    <h4>
                        total <span>$
                            {cartItems.reduce((total, item) => {
                                return total += item.price * item.quantity
                            }, 0)}
                            .00 </span>
                    </h4>
                </div>
                <Button variant='warning' className='checkoutBtn' onClick={handleCheckout}>proceed to checkout</Button>
            </footer>
        </section>
    )
}

export default Cart
