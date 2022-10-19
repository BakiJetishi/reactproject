import { useState, useContext, useEffect } from 'react';

import CartContext from '../../store/cart-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

import classes from './CartButton.module.css'

const CartButton = (props) => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

    const cartCtx = useContext(CartContext);

    useEffect(() => {
        if (cartCtx.totalAmount === 0) {
            return;
        }
        setBtnIsHighlighted(true);

        setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 400);
    }, [cartCtx.totalAmount]);

    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

    return (
        <button className={classes.button} onClick={props.onClick}>
            <span className={classes.icon}>
                <FontAwesomeIcon icon={faShoppingBasket} />
            </span>
            <span className={`${classes.badge} ${btnClasses}`}>{cartCtx.items.length}</span>
        </button>
    )
}

export default CartButton

