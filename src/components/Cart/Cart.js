import { useContext, useState } from 'react';

import CartContext from '../../store/cart-context';
import CartItem from './CartItem'
import { CartModal } from '../UI/Modal'
import { CheckoutModal } from '../UI/Modal';
import Checkout from '../Cart/Checkout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

import classes from './Cart.module.css'

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const [checkoutShow, setCheckoutShow] = useState(false)
  const [orderSubmitted, setOrderSubmitted] = useState(false)

  const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`;

  const closeIcon = <FontAwesomeIcon icon={faXmark} />

  const submitOrderHandler = async (data) => {

    const url = 'https://react-http-403d2-default-rtdb.firebaseio.com/orders.json'

    await axios.post(url, {
      user: data,
      orderedItems: cartCtx.items,
    }).then((res) => {
      setOrderSubmitted(true)
      cartCtx.clearCart();
      setCheckoutShow(false)
      setTimeout(() => {
        setOrderSubmitted(false)
        props.onClose()
      }, 2000)
    })
  }

  //   await fetch('https://react-http-403d2-default-rtdb.firebaseio.com/orders.json', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       user: userData,
  //       orderedItems: cartCtx.items,
  //     }),
  //   }).then((res) => {
  //     setCheckoutShow(false)
  //     cartCtx.clearCart();
  //     alert('Order successfully submitted')
  //   })
  // };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemDeleteHandler = (id) => {
    cartCtx.deleteItem(id)
    console.log(id)
  };

  const clearCartHandler = () => {
    cartCtx.clearCart()
  }

  const checkoutHandler = () => {
    setCheckoutShow((prevState) => !prevState)
  }

  let cartItems

  if (cartCtx.items.length > 0) {
    cartItems = (
      <div>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.name}
            img={item.img}
            price={item.price}
            amount={item.amount}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
            onDelete={cartItemDeleteHandler.bind(null, item.id)}
          />
        ))}
      </div>
    );
  }

  const cartIsNotEmpty = cartCtx.items.length > 0
  return (
    <>
      <CartModal onClose={props.onClose}>
        <div className={classes.cart}>
          <button onClick={props.onClose} className={classes['close-cart']}>{closeIcon}</button>
          <div className={classes.container}>
            <div className={classes.items}>
              {cartIsNotEmpty && cartItems}
              {!cartIsNotEmpty && <p className={classes.empty}>Cart is empty</p>}
            </div>
            <div className={classes['cart-subtotal-inner']}>
              <div className={classes['cart-subtotal-text']}>SubTotal:</div>
              <div className={classes['cart-subtotal-price']}>${totalAmount}</div>
            </div>
            <button type='submit' onClick={clearCartHandler} disabled={!cartIsNotEmpty} className={classes.clear}>Clear Cart</button>
            <button type='submit' disabled={!cartIsNotEmpty} className={classes.checkout} onClick={checkoutHandler}>Checkout</button>
          </div>
        </div>
        {checkoutShow && <Checkout onCancel={checkoutHandler} onConfirm={submitOrderHandler} />}
      </CartModal >
      {orderSubmitted && <CheckoutModal><p className={classes.deployed}>Order successfully submitted</p></CheckoutModal>}
    </>
  )
}

export default Cart