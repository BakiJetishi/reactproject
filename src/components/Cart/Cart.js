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


    /* Sending a post request to the url with the data and then setting the state of orderSubmitted to true
    and clearing the cart. Then it sets the checkoutShow to false and after 2 seconds it sets the
    orderSubmitted to false and closes the modal. */
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

  /**
   * It takes an id as an argument and calls the removeItem function from the cart context.
   * @param id - the id of the item to be removed
   */
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  /**
   * It takes an item as an argument, and then it adds that item to the cart, with an amount of 1.
   * @param item - the item that is being added to the cart
   */
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  /**
   * It takes an id as an argument and then calls the deleteItem function from the cart context.
   * @param id - the id of the item to be deleted
   */
  const cartItemDeleteHandler = (id) => {
    cartCtx.deleteItem(id)
  };

  /**
   * It clears the cart.
   */
  const clearCartHandler = () => {
    cartCtx.clearCart()
  }

  /**
   * When the checkout button is clicked, toggle the checkoutShow state to the opposite of what it
   * currently is.
   */
  const checkoutHandler = () => {
    setCheckoutShow((prevState) => !prevState)
  }

  let cartItems

  /* Checking if the cart has any items in it. If it does, it will map through the items and return a
  CartItem component for each item. */
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
        {checkoutShow && <Checkout onClose={checkoutHandler} onConfirm={submitOrderHandler} />}
      </CartModal >
      {orderSubmitted && <CheckoutModal><p className={classes.deployed}>Order successfully submitted</p></CheckoutModal>}
    </>
  )
}

export default Cart