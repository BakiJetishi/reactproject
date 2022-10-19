import { useContext } from 'react';
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/cart-context';

import classes from './MealItem.module.css'

const MealItem = (props) => {
    const cartCtx = useContext(CartContext);

    const addToCartHandler = amount => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            img: props.img,
            price: props.price
        });
    };

    return (
        <div className={classes.box} >
            <div className={classes.img}>
                <img src={props.img} alt="" className={classes.box} />
            </div>
            <div className={classes.text}>
                <div className={classes.title}>{props.name}</div>
                <div className={classes.title2}>{props.desc}</div>
                <div className={classes.info}>
                    <div className={classes.price}>$ {props.price}</div>
                    <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
                </div>
            </div>
        </div>
    )
}

export default MealItem