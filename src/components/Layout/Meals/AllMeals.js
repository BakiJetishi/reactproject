import { useEffect, useState } from 'react';

import MealItem from './MealItem'

import classes from './Meals.module.css'

const Meals = () => {
    const [meals, setMeals] = useState([]);
    const [httpError, setHttpError] = useState();
    const [category, setCategory] = useState('All')
    const categories = ['All', 'Burgers', 'Pizza', 'Drinks', 'Desserts', 'Fish', 'Fruits']

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
                    type: responseData[key].type,
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
    const changeHandle = (props) => {
        setCategory(props)
    }

    let filteredMeals = meals.filter(item => item.type === category)

    if (category === 'All') {
        filteredMeals = meals.map(item => item)

    }

    let mealsList = filteredMeals.map((meal) => (
        <MealItem
            key={meal.id}
            id={meal.id}
            img={meal.img}
            name={meal.name}
            desc={meal.desc}
            price={meal.price}
        />
    ));

    if (mealsList.length === 0) {
        mealsList = <p>No Food Items Available</p>
    }

    return (
        <div className={classes['popular-dishes']} style={{ paddingTop: 80 }}>
            <div className={classes.inner}>
                <h2 className={classes.title}><span className={classes['box-title-inner']}>Products</span></h2>
                <div className={classes.food}>
                    {categories.map((category) => <button key={category} onClick={() => changeHandle(category)}>{category}</button>)}
                </div>
                <div className={classes.boxs}>{mealsList}</div>
            </div>
        </div>
    )
}

export default Meals