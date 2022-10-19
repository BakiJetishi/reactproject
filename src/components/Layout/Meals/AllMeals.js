import { useEffect, useState } from 'react';

import MealItem from './MealItem'

import classes from './Meals.module.css'

const Meals = () => {
    const [meals, setMeals] = useState([]);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch('https://react-http-403d2-default-rtdb.firebaseio.com/meals.json');

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseData = await response.json();

            const loadedMeals = [];

            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    desc: responseData[key].desc,
                    img: responseData[key].img,
                    price: responseData[key].price,
                });
            }
            const lastMeals = loadedMeals.reverse()
            setMeals(lastMeals);
        };

        fetchMeals().catch((error) => {
            setHttpError(error.message);
        });
    }, []);

    if (httpError) {
        return (
            <section className={classes['meals-error']}>
                <p>{httpError}</p>
            </section>
        );
    }

    const mealsList = meals.map((meal) => (
        <MealItem
            key={meal.id}
            id={meal.id}
            img={meal.img}
            name={meal.name}
            desc={meal.desc}
            price={meal.price}
        />
    ));

    return (
        <div className={classes['popular-dishes']} style={{ paddingTop: 80 }}>
            <div className={classes.inner}>
                <h2 className={classes.title}><span className={classes['box-title-inner']}>Products</span></h2>
                <div className={classes.boxs}>{mealsList}</div>
            </div>
        </div>
    )
}

export default Meals