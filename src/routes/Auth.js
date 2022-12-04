import AuthForm from 'components/AuthForm';
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";

const Auth = () => {

    const onSociailClick = async (e) => {
        const auth = getAuth();
        const target = (e.target.name);
        let provider;
        if (target === 'google') {
            provider = new GoogleAuthProvider();
        } else if (target === 'github') {
            provider = new GithubAuthProvider();
        }
        const data = await signInWithPopup(auth, provider);
    }

    return (
        <div className='Auth'>
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size="3x"
                style={{ marginBottom: 30 }}
            />
            <AuthForm />
            <div className='Auth_btns'>
                <button className='Auth_btn' onClick={onSociailClick} name='google'>
                    Continue with Google <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button className='Auth_btn' onClick={onSociailClick} name='github'>
                    Continue with Github <FontAwesomeIcon icon={faGithub} />
                </button>
            </div>
        </div>
    )
}

export default Auth;