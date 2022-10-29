import { useRef, useState } from 'react';
import { CheckoutModal } from '../UI/Modal';
import useInput from '../../custom-hooks/use-input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import classes from './Checkout.module.css';

function isNotEmpty(value) {
    return value.trim() !== '';
}

function validNumber(value) {
    return !isNaN(value) && value.trim() !== ''
}

const Checkout = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: false,
        number: false,
        street: false,
        city: false,
        postalCode: false,
        country: false,
    });

    const nameInputRef = useRef();
    const numberInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();
    const countryInputRef = useRef();

    const closeIcon = <FontAwesomeIcon icon={faXmark} />

    const {
        isValid: nameIsValid,
        hasError: nameHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
    } = useInput(isNotEmpty);

    const {
        isValid: numberIsValid,
        hasError: numberHasError,
        valueChangeHandler: numberChangeHandler,
        inputBlurHandler: numberBlurHandler,
    } = useInput(validNumber);

    const {
        isValid: streetIsValid,
        hasError: streetHasError,
        valueChangeHandler: streetChangeHandler,
        inputBlurHandler: streetBlurHandler,
    } = useInput(isNotEmpty);

    const {
        isValid: postalCodeIsValid,
        hasError: postalCodeHasError,
        valueChangeHandler: postalCodeChangeHandler,
        inputBlurHandler: postalCodeBlurHandler,
    } = useInput(validNumber);

    const {
        isValid: cityIsValid,
        hasError: cityHasError,
        valueChangeHandler: cityChangeHandler,
        inputBlurHandler: cityBlurHandler,
    } = useInput(isNotEmpty);

    const {
        isValid: countryIsValid,
        hasError: countryHasError,
        valueChangeHandler: countryChangeHandler,
        inputBlurHandler: countryBlurHandler,
    } = useInput(isNotEmpty);

    const confirmHandler = (event) => {
        event.preventDefault();

        const formIsValid = nameIsValid && numberIsValid && streetIsValid && postalCodeIsValid && cityIsValid && countryIsValid

        /* Checking if the form is valid. If it is not valid, it will set the formInputsValidity to false and return */
        if (!formIsValid) {
            setFormInputsValidity({
                name: !nameIsValid,
                number: !numberIsValid,
                street: !streetIsValid,
                city: !cityIsValid,
                postalCode: !postalCodeIsValid,
                country: !countryIsValid,
            });
            return;
        }

        /* Passing the values of the inputs to the parent component. */
        props.onConfirm({
            name: nameInputRef.current.value,
            number: numberInputRef.current.value,
            street: streetInputRef.current.value,
            city: cityInputRef.current.value,
            country: countryInputRef.current.value,
            postalCode: postalCodeInputRef.current.value,
        });
    };

    const nameControlClasses = `${classes.control} ${formInputsValidity.name || nameHasError ? classes.invalid : ''}`;
    const numberControlClasses = `${classes.control} ${formInputsValidity.number || numberHasError ? classes.invalid : ''}`;
    const streetControlClasses = `${classes.control} ${formInputsValidity.street || streetHasError ? classes.invalid : ''}`;
    const postalCodeControlClasses = `${classes.control} ${formInputsValidity.postalCode || postalCodeHasError ? classes.invalid : ''}`;
    const cityControlClasses = `${classes.control} ${formInputsValidity.city || cityHasError ? classes.invalid : ''}`;
    const countryControlClasses = `${classes.control} ${formInputsValidity.country || countryHasError ? classes.invalid : ''}`;

    return (
        <CheckoutModal onClose={props.onClose}>
            <form className={classes.form} onSubmit={confirmHandler}>
                <div className={nameControlClasses}>
                    <label htmlFor='name'>Your Name</label>
                    <input type='text' id='name' ref={nameInputRef} onChange={nameChangeHandler} onBlur={nameBlurHandler} />
                    {(nameHasError || formInputsValidity.name) && <p>Please enter a valid name!</p>}
                </div>
                <div className={numberControlClasses}>
                    <label htmlFor='number'>Your Phone Number</label>
                    <input type='number' id='number' ref={numberInputRef} onChange={numberChangeHandler} onBlur={numberBlurHandler} />
                    {(numberHasError || formInputsValidity.city) && <p>Please enter a valid number!</p>}
                </div>
                <div className={streetControlClasses}>
                    <label htmlFor='street'>Street</label>
                    <input type='text' id='street' ref={streetInputRef} onChange={streetChangeHandler} onBlur={streetBlurHandler} />
                    {(streetHasError || formInputsValidity.street) && <p>Please enter a valid street!</p>}
                </div>
                <div className={postalCodeControlClasses}>
                    <label htmlFor='postal'>Postal Code</label>
                    <input type='text' id='postal' ref={postalCodeInputRef} onChange={postalCodeChangeHandler} onBlur={postalCodeBlurHandler} />
                    {(postalCodeHasError || formInputsValidity.postalCode) && <p>Please enter a valid postal code !</p>}
                </div>
                <div className={cityControlClasses}>
                    <label htmlFor='city'>City</label>
                    <input type='text' id='city' ref={cityInputRef} onChange={cityChangeHandler} onBlur={cityBlurHandler} />
                    {(cityHasError || formInputsValidity.city) && <p>Please enter a valid city!</p>}
                </div>
                <div className={countryControlClasses}>
                    <label htmlFor='country'>Country</label>
                    <input type='text' id='country' ref={countryInputRef} onChange={countryChangeHandler} onBlur={countryBlurHandler} />
                    {(countryHasError || formInputsValidity.country) && <p>Please enter a valid country!</p>}
                </div>
                <div className={classes.actions}>
                    <button type='button' onClick={props.onCancel}>Cancel</button>
                    <button className={classes.submit}>Confirm</button>
                </div>
                <button className={classes.closeBtn} onClick={props.onClose}>{closeIcon}</button>
            </form>
        </CheckoutModal>
    );
};

export default Checkout;
