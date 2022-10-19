import Slider from '../components/Layout/Slider'
import Section2 from '../components/Layout/Section2'
import Meals from '../components/Layout/Meals/Meals'
import SecondMeals from '../components/Layout/Meals/SecondMeals'
import LatestNews from '../components/Layout/news/LatestNews'

const Home = () => {
    return (
        <section style={{ paddingTop: 100 }}>
            <Slider />
            <Section2 />
            <Meals />
            <SecondMeals />
            <LatestNews />
        </section>
    )
}

export default Home