import { useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
  const amountInputRef = useRef();

  const OrderButton = <FontAwesomeIcon icon={faCartPlus} />

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmountNumber = +amountInputRef.current.value;

    if (amountInputRef.current.value.trim().length === 0) {
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <input type='number' min='1' defaultValue='1' ref={amountInputRef} />
      <button className={classes.cart} type='submit'>{OrderButton}</button>
    </form>
  );
};

export default MealItemForm;
