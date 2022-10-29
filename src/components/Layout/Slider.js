import { useState, useEffect, useContext } from "react";
import { sliderData } from "../../slider-data";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import CartContext from '../../store/cart-context';

import classes from "./Slider.module.css";

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideLength = sliderData.length;

    const autoScroll = true;
    let slideInterval;
    let intervalTime = 5000;

    /**
     * If the current slide is the last slide, then set the current slide to the first slide, otherwise set
     * the current slide to the next slide
     */
    const nextSlide = () => {
        setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
    };

    /**
     * If the current slide is the first slide, then set the current slide to the last slide, otherwise set
     * the current slide to the previous slide.
     */
    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
    };

    /**
     * The auto() function sets the slideInterval variable to the setInterval() function, which calls the
     * nextSlide() function every intervalTime milliseconds.
     */
    function auto() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    /* A React hook that is called after every render. It is used to perform side effects. */
    useEffect(() => {
        if (autoScroll) {
            auto();
        }
        return () => clearInterval(slideInterval);
    });

    const cartCtx = useContext(CartContext);

    /**
     * When the user clicks the add to cart button, add the current slide's data to the cart.
     */
    const addToCartHandler = amount => {
        cartCtx.addItem({
            id: sliderData[currentSlide].id,
            name: sliderData[currentSlide].title,
            amount: 1,
            img: sliderData[currentSlide].image,
            price: 12.99
        });
    };

    return (
        <div className={classes.slider}>
            <FontAwesomeIcon icon={faArrowLeft} className={`${classes.arrow} ${classes.prev}`} onClick={prevSlide} />
            <FontAwesomeIcon icon={faArrowRight} className={`${classes.arrow} ${classes.next}`} onClick={nextSlide} />
            {sliderData.map((slide, index) => {
                return (
                    <div
                        className={index === currentSlide ? `${classes.slide} ${classes.current}` : classes.slide}
                        key={index}
                    >
                        {index === currentSlide && (
                            <div>
                                <img src={slide.image} alt="img" className={classes.image} />
                                <div className={classes.content}>
                                    <h2 className={classes.title}>{slide.title}</h2>
                                    <p className={classes.description}>{slide.desc}</p>
                                    <div className={classes.order}>
                                        <button className={classes.button} onClick={addToCartHandler}>Order Now!</button>
                                        <span className={classes.price}>{slide.price}$</span>
                                        <span className={classes.price2}>{slide.disc}$</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Slider;
