import { useContext } from 'react';
import CartContext from '../../store/cart-context';

import Image from '../../assets/burger.png'

import classes from './Section2.module.css'

const Section2 = () => {
    const cartCtx = useContext(CartContext);

    /**
     * It takes an amount as an argument, and then calls the addItem function from the cart context,
     * passing in an object with the item's details.
     */
    const addToCartHandler = amount => {
        cartCtx.addItem({
            id: 101,
            name: 'Burger',
            amount: 1,
            img: Image,
            price: 11.79
        });
    };

    return (
        <div className={classes.section} >
            <div className={classes.inner} >
                <div className={classes.img} >
                    <img src={Image} alt="abc" />
                </div >
                <div>
                    <h1 className={classes.title}>Burger</h1>
                    <p className={classes.text} > Lorem ipsum, dolor sit amet consectetur adipisicing elit.Vitae commodi sint architecto! Deserunt iusto ad, dignissimos eos ratione sunt dolorum sequi doloribus explicabo cumque repudiandae ducimus perspiciatis voluptatibus ? Incidunt, consequuntur!</p >
                    <p>11.79$</p>
                    <button className={classes['order-now']} onClick={addToCartHandler}> Order Now</button >
                </div >
            </div >
        </div >
    )
}

export default Section2