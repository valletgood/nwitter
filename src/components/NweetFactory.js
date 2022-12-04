import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ref, uploadString, getDownloadURL } from 'firebase/storage'
import { addDoc, collection } from 'firebase/firestore';
import { storageService, dbService } from 'fbase';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const NweetFactory = ({ userObj }) => {
    const [nweet, setNweet] = useState('');
    const [fileUrl, setFileUrl] = useState('')

    const onSubmit = async (e) => {
        if (nweet === "") {
            return;
        }
        e.preventDefault();
        let attachmentUrl = "";
        if (fileUrl !== '') {
            const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`)
            const response = await uploadString(fileRef, fileUrl, 'data_url')
            attachmentUrl = await getDownloadURL(ref(storageService, fileRef))
        }
        const nweetItem = {
            text: nweet,
            createdAt: Date.now(),
            createrId: userObj.uid,
            attachmentUrl
        }
        const docRef = await addDoc(collection(dbService, 'nweets'), nweetItem)
        setNweet('');
        setFileUrl('')
    };

    const onFileChange = (e) => {
        const item = e.target.files
        const theFile = item[0]
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const imgUrl = finishedEvent.currentTarget.result
            setFileUrl(imgUrl)
        }
        reader.readAsDataURL(theFile);
    };

    const onClearFileClick = () => {
        setFileUrl("")
    }

    return (
        <form onSubmit={onSubmit} className='factoryForm' >
            <div className='NweetFactory_input'>
                <input value={nweet} onChange={(e) => setNweet(e.target.value)} type='text' placeholder="What's on your mind?" maxLength={120} />
                <input className='NweetFactory_input_submit' type='submit' value='&rarr;' />
            </div>
            <label htmlFor="attach_file" className="NweetFactory_label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input id='attach_file' type='file' accept='image/*' onChange={onFileChange} style={{ opacity: 0, }} />
            {fileUrl &&
                <div className='factoryForm_attachment'>
                    <img src={fileUrl} style={{ backgroundImage: fileUrl }} />
                    <div className='factoryForm_clear' onClick={onClearFileClick}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>}
        </form>
    )
}

export default NweetFactory