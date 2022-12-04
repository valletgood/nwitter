import React, { useState } from 'react';
import { deleteObject, ref } from 'firebase/storage';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { dbService, storageService } from 'fbase';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObj, isOwner }) => {

    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?")
        if (ok) {
            await deleteDoc(doc(dbService, 'nweets', nweetObj.id))
            await deleteObject(ref(storageService, nweetObj.attachmentUrl))
        }
    }

    const toggleEditing = () => {
        setEditing(prev => !prev);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const nweetTextRef = doc(dbService, 'nweets', nweetObj.id)
        await updateDoc(nweetTextRef, {
            text: newNweet
        })
        setEditing(false)
    }

    return (
        <div className='Nweet'>
            {
                editing ?
                    <>
                        <form onSubmit={onSubmit} className='container nweetEdit'>
                            <input className='formInput' type='text' placeholder='Edit your Nweet' value={newNweet} required onChange={(e) => setNewNweet(e.target.value)} />
                            <input className='formBtn' type='submit' value="Update Nweet!" />
                        </form>
                        <button className='formBtn cancelBtn' onClick={toggleEditing}>Cancel</button>
                    </>
                    :
                    <>
                        <h4>{nweetObj.text}</h4>
                        {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
                        {isOwner && (
                            <div className='Nweet_action'>
                                <span onClick={onDeleteClick}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </span>
                                <span onClick={toggleEditing}>
                                    <FontAwesomeIcon icon={faPencilAlt} />
                                </span>
                            </div>)}
                    </>
            }
        </div>
    )
}

export default Nweet