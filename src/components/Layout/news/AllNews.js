import { useEffect, useState } from "react"
import LoadedNews from './LoadedNews'

import classes from './LatestNews.module.css'

const News = () => {

    const [news, setNews] = useState([]);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch('https://react-http-403d2-default-rtdb.firebaseio.com/news.json');

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseData = await response.json();

            const loadedNews = [];

            for (const key in responseData) {
                loadedNews.push({
                    key: key,
                    id: key,
                    title: responseData[key].title,
                    desc: responseData[key].desc,
                    img: responseData[key].img,
                });
            };
            const lastNews = loadedNews.reverse()
            setNews(lastNews);
        }



        fetchMeals().catch((error) => {
            setHttpError(error.message);
        });
    }, []);


    const newsList = news.map((item) => (
        <LoadedNews
            key={item.id}
            id={item.id}
            img={item.img}
            title={item.title}
            desc={item.desc}
        />
    ))


    if (httpError) {
        return (
            <section className={classes.error}>
                <p>{httpError}</p>
            </section>
        );
    }
    return (
        <div className={classes.news} style={{ paddingTop: 100 }}>
            <div className={classes.inner}><br />
                <div className={classes.boxs}>
                    {newsList}
                </div>
            </div>
        </div >
    )
}

export default News