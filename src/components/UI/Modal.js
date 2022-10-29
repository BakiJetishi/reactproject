import { Fragment } from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

/**
 * Backdrop is a function that returns a div with a className of 'backdrop' and an onClick event that
 * calls the onClose function.
 * @param props - This is the props object that is passed to the component.
 * @returns A div with a className of backdrop and an onClick event handler that calls the onClose
 * prop.
 */
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

/**
 * It's a function that returns a div with a className of reservation-modal and the children of the
 * props object.
 * @param props - {
 * @returns A div with the className of reservation-modal and the children of the component that is
 * being passed in.
 */
const ReservationModalOverlay = (props) => {
  return (
    <div className={classes['reservation-modal']}>{props.children}</div>
  );
};

const CartModalOverlay = (props) => {
  return (
    <div className={classes['cart-modal']}>{props.children}</div>
  )
}

const AuthModalOverlay = (props) => {
  return (
    <div className={classes['auth-modal']}>{props.children}</div>
  )
}

const CheckoutModalOverlay = (props) => {
  return (
    <div className={classes['checkout-modal']}>{props.children}</div>
  )
}

const BurgerMenuModalOverlay = (props) => {
  return (
    <div className={classes['burger-modal']}>{props.children}</div>
  )
}


/* It's getting the element with the id of 'overlays' and assigning it to the portalElement variable. */
const portalElement = document.getElementById('overlays');

/**
 * The ReservationModal function returns a fragment that contains two portals, one for the backdrop and
 * one for the modal overlay.
 * @param props - This is the props object that is passed to the component.
 * @returns A fragment of two portals.
 */
export const ReservationModal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ReservationModalOverlay>{props.children}</ReservationModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export const CartModal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <CartModalOverlay>{props.children}</CartModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export const AuthModal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <AuthModalOverlay>{props.children}</AuthModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export const CheckoutModal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <CheckoutModalOverlay>{props.children}</CheckoutModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export const BurgerMenuModal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <BurgerMenuModalOverlay>{props.children}</BurgerMenuModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};