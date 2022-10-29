import { useState, useRef, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase";
import { v4 } from "uuid";
import useToggle from '../../../custom-hooks/use-toggle'
import { AuthModal } from '../../UI/Modal'
import { useNavigate } from "react-router-dom";

import classes from './AddNews.module.css'

const AddNews = () => {

    const [imageUpload, setImageUpload] = useState();
    const [imageUrl, setImageUrl] = useState([]);
    const [imageDeployed, setImageDeployed] = useToggle(false)

    const navigate = useNavigate()

    const nameInputRef = useRef();
    const descInputRef = useRef();

    const uploadImage = (e) => {
        setImageUpload(e.target.files[0]);
    }

    // console.log(imageUpload)
    // console.log(imageUrl)

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

        await fetch('https://react-http-403d2-default-rtdb.firebaseio.com/news.json', {
            method: 'POST',
            body: JSON.stringify({
                title: nameInputRef.current.value,
                img: imageUrl,
                desc: descInputRef.current.value,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            nameInputRef.current.value = ''
            descInputRef.current.value = ''
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
                <h2>Add</h2>
                <h1>News</h1>
            </div>
            <form className={classes.content} onSubmit={addProductHandler}>
                <div>
                    <label htmlFor='img'>Image</label>
                    <input type='file' id='img' onChange={uploadImage} />
                </div>
                <div>
                    <label htmlFor='name'>Title</label>
                    <input type='text' placeholder='Enter title' id='name' ref={nameInputRef} />
                </div>
                <div>
                    <label htmlFor='desc'>Description</label>
                    <input type='text' placeholder='Enter description' id='desc' ref={descInputRef} />
                </div>
                <button type='submit'>Add!</button>
            </form>
            {imageDeployed && <AuthModal><p className={classes.deployed}>Successfully added</p></AuthModal>}
        </>
    )
}

export default AddNews