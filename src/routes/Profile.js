import React, { useEffect, useState } from 'react';
import { collection, getDocs, where, query, orderBy } from 'firebase/firestore';
import { authService, dbService } from 'fbase';
import { getAuth, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const Profile = ({ userObj, refreshUser }) => {
    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)
    const onLogOutClick = () => {
        const auth = getAuth();
        auth.signOut();
        navigate('/', { replace: true })
        refreshUser();
    }

    const getMyNweets = async () => {
        const q = query(collection(dbService, 'nweets'), where('createrId', '==', userObj.uid), orderBy('createdAt'))
        const querySnapshot = await getDocs(q);
    }

    useEffect(() => {
        getMyNweets();
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await updateProfile(authService.currentUser, { displayName: newDisplayName })
            refreshUser();
        }
    }

    return (
        <div className='container'>
            <form onSubmit={onSubmit} className='Profile_form' >
                <input className='formInput' type='text' placeholder='Display name' value={newDisplayName} autoFocus onChange={(e) => setNewDisplayName(e.target.value)} />
                <input className='formBtn' type='submit' value='Update Profile' />
            </form>
            <span className='formBtn cancelBtn logOut' onClick={onLogOutClick}>Log Out</span>
        </div>
    )
}

export default Profile;