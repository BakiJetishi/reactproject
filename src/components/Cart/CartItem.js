import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import classes from './CartItem.module.css'

const CartItem = (props) => {

    // const price1 = props.price * props.amount
    // const price = price1.toFixed(2)

    return (
        <div className={classes.item}>
            <div className={classes.img}><img src={props.img} alt='a' /></div>
            <div className={classes.info}>
                <div className={classes.title}>{props.name}</div>
                <div className={classes.price}>$<span>{props.price}</span></div>
                <div className={classes.total}>x<span>{props.amount}</span></div>
            </div>
            <div className={classes.actions}>
                <button onClick={props.onRemove}>−</button>
                <button onClick={props.onAdd}>+</button>
                <button onClick={props.onDelete} className={classes.delete}><FontAwesomeIcon icon={faTrash} /></button>
            </div>
        </div>
    )
}

export default CartItem