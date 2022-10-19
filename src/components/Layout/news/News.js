import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import NotFound from './../../../pages/NotFound'

import classes from './News.module.css'

const News = () => {
    const { id } = useParams()
    let navigate = useNavigate();

    const goBack = () => {
        navigate(-1)
    }

    const [news, setNews] = useState([]);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch('https://react-http-403d2-default-rtdb.firebaseio.com/news.json');

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseData = await response.json();

            setNews({
                id: id,
                title: responseData[id].title,
                desc: responseData[id].desc,
                img: responseData[id].img,
            });
        };

        fetchMeals().catch((error) => {
            setHttpError(error.message);
        });
    }, [id]);

    if (httpError) {
        return (
            <NotFound />
        );
    }

    return (
        <div className={classes.news}>
            <div className={classes.inner}>
                <div className={classes.boxs}>
                    <div className={classes.box}>
                        <img src={news.img} alt="" />
                        <div className={classes['box-title']}>{news.title}</div>
                        <div className={classes['box-s-title']}>{news.desc}</div>
                        <button className={classes.button} onClick={goBack}>Go Back</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default News