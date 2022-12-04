import React, { useEffect, useState } from 'react';
import { dbService, storageService } from 'fbase';
import { collection, getDocs, onSnapshot, query, orderBy } from 'firebase/firestore';
import Nweet from 'components/Nweet';
import NweetFactory from 'components/NweetFactory';

const Home = ({ userObj }) => {
    const [nweets, setNweets] = useState([]);
    const getNweets = async () => {
        const dbNweets = await getDocs(collection(dbService, 'nweets'))
        dbNweets.forEach((doc) => {
            const nweetObject = {
                ...doc.data(),
                id: doc.id,
            }
            setNweets(prev => [nweetObject, ...prev])
        })
    }

    useEffect(() => {
        getNweets();
        const q = query(collection(dbService, 'nweets'), orderBy('createdAt', 'desc'))
        onSnapshot(q, querySnapshot => {
            const newArray = querySnapshot.docs.map(it => {
                return {
                    id: it.id,
                    ...it.data(),
                }
            })
            setNweets(newArray);
        })
    }, [])

    return (
        <div className='container'>
            <NweetFactory userObj={userObj} />
            <div style={{ marginTop: 30 }}>
                {nweets.map((it) => (
                    <Nweet key={it.id} nweetObj={it} isOwner={it.createrId === userObj.uid} />
                ))}
            </div>
        </div>
    )
}

export default Home;