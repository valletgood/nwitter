import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const AuthForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth();
            if (newAccount) {
                const data = await createUserWithEmailAndPassword(auth, email, password)
                console.log(data)
            } else {
                const data = await signInWithEmailAndPassword(auth, email, password)
                console.log(data)
            }
        } catch (error) {
            setError(error.message)
        }
    }

    const toggleAccount = () => setNewAccount((prev => !prev))

    return (
        <>
            <form onSubmit={onSubmit} className='container'>
                <input className='Auth_input' type='text' placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className='Auth_input' type='password' placeholder='Password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                <input className='Auth_input Auth_submit' type='submit' value={newAccount ? "Create Account" : 'Log In'} />
                {error && <span className='Auth_error'>{error}</span>}
            </form>
            <span className='Auth_switch' onClick={toggleAccount}>{newAccount ? "SignIn." : "Create Account"}</span>
        </>
    )
}

export default AuthForm