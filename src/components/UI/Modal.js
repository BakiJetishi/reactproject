import { Fragment } from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

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


const portalElement = document.getElementById('overlays');

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