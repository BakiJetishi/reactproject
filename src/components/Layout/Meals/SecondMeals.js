import classes from './SecondMeals.module.css'

import Meals1 from '../../../assets/meals1.jpg'
import Meals2 from '../../../assets/meals2.jpg'
import Meals3 from '../../../assets/meals3.jpg'

const SecondMeals = () => {
    return (
        <div className={classes['second-meals']}>
            <div className={classes.box}>
                <div className={classes.img}>
                    <img src={Meals1} alt="" />
                </div>
                <div className={classes.info}>
                    <h1 className={classes.type}>Fast Food</h1>
                    <h1 className={classes.type2}>Meals</h1>
                    <h3 className={classes.type3}>New Phenomen</h3>
                    <h3 className={classes.type3}>Burger Taste</h3>
                    <div className={classes.price}>$12.99</div>
                    <div className={classes.order}>Order Now</div>
                </div>
            </div>
            <div className={classes.box}>
                <div className={classes.img}>
                    <img src={Meals2} alt="" />
                </div>
                <div className={classes.info}>
                    <h1 className={classes.type}>House</h1>
                    <h1 className={classes.type2}>Burgers</h1>
                    <h3 className={classes.type3}>New Phenomen</h3>
                    <h3 className={classes.type3}>Burger Taste</h3>
                    <div className={classes.price}>$12.99</div>
                    <div className={classes.order}>Order Now</div>
                </div>
            </div>
            <div className={classes.box}>
                <div className={classes.img}>
                    <img src={Meals3} alt="" />
                </div>
                <div className={classes.info}>
                    <h1 className={classes.type}>Hot Fresh</h1>
                    <h1 className={classes.type2}>Salats</h1>
                    <h3 className={classes.type3}>New Phenomen</h3>
                    <h3 className={classes.type3}>Burger Taste</h3>
                    <div className={classes.price}>$12.99</div>
                    <div className={classes.order}>Order Now</div>
                </div>
            </div>
        </div>
    )
}

export default SecondMeals