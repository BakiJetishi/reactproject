import { useState, useRef, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";
import useToggle from '../../custom-hooks/use-toggle'
import { AuthModal } from '../UI/Modal'
import { useNavigate } from "react-router-dom";

import classes from './AddProduct.module.css'

const AddProduct = () => {

    const [imageUpload, setImageUpload] = useState();
    const [imageUrl, setImageUrl] = useState([]);
    const [imageDeployed, setImageDeployed] = useToggle(false)

    const navigate = useNavigate()

    const nameInputRef = useRef();
    const descInputRef = useRef();
    const priceInputRef = useRef();
    const typeInputRef = useRef();

    const uploadImage = (e) => {
        setImageUpload(e.target.files[0]);
    }

    console.log(imageUpload)
    console.log(imageUrl)

    useEffect(() => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrl(url);
            });
        });
    }, [imageUpload])



    async function addProductHandler(e) {
        e.preventDefault()

        await fetch('https://react-http-403d2-default-rtdb.firebaseio.com/meals.json', {
            method: 'POST',
            body: JSON.stringify({
                name: nameInputRef.current.value,
                img: imageUrl,
                desc: descInputRef.current.value,
                price: priceInputRef.current.value,
                type: typeInputRef.current.value,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            nameInputRef.current.value = ''
            descInputRef.current.value = ''
            priceInputRef.current.value = ''
            setImageDeployed(true)
            setImageUpload(null)
            setTimeout(() => {
                setImageDeployed(false)
                navigate('/')
            }, 2000)
        })

    }

    return (
        <>
            <div className={classes.header}>
                <h2>Add new</h2>
                <h1>Product</h1>
            </div>
            <form className={classes.content} onSubmit={addProductHandler}>
                <div>
                    <label htmlFor='img'>Image</label>
                    <input type='file' placeholder='Product Image' id='img' onChange={uploadImage} />
                </div>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input type='text' placeholder='Enter product name' id='name' ref={nameInputRef} />
                </div>
                <div>
                    <label htmlFor='desc'>Description</label>
                    <input type='text' placeholder='Enter product description' id='desc' ref={descInputRef} />
                </div>

                <div>
                    <label htmlFor='price'>Price</label>
                    <input type='text' placeholder='Enter price' id='price' ref={priceInputRef} />
                </div>
                <div>
                    <label >Product Type</label>
                    <select ref={typeInputRef}>
                        <option value='All'>All</option>
                        <option value='Pizza'>Pizza</option>
                        <option value='Chicken'>Chicken</option>
                        <option value='Drinks'>Drinks</option>
                        <option value='Burgers'>Burgers</option>
                        <option value='Desserts'>Desserts</option>
                        <option value='Fish'>Fish</option>
                        <option value='Fruits'>Fruits</option>
                    </select>
                </div>

                <button type='submit'>Add!</button>
            </form>
            {imageDeployed && <AuthModal><p className={classes.deployed}>Product successfully added</p></AuthModal>}
        </>
    )
}

export default AddProduct