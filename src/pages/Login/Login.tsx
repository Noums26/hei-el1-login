import React, { useState } from 'react';
import './Login.css';
import profil from '../../assets/img/503047.jpg';
import { Link, Navigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { Facebook, Github, Google } from '../../components/icons';

interface User {
    email: string;
    pwd: string;
}

export const Login: React.FC<{}> = () => {

    const [userInfo, setUserInfo] = useState<User>({email: '', pwd: ''})
    const { loginUser, loading, error, user, signInWithGithub, signInWithGoogle, signInWithFacebook } = useAuthContext()

    const formAction = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(userInfo.email !== "" || userInfo.pwd !== ""){
            loginUser(userInfo.email, userInfo.pwd)
            setUserInfo({email: '', pwd: ''})
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = e.target;

        setUserInfo({
            ...userInfo,
            [name]: value
        })
    }
    
    return (
        <div className='login__container'>
            <div className="login__overflow">
                <div className="login__modal">
                    <div className="login__carousel">
                        <img src={profil} alt="" className='login__carousel_img' />
                    </div>
                    <div className="login__form">
                        <div className="login__header">
                            <h2>Login</h2>
                            <Link to="/signup" className='login__signup-btn'>Sign up</Link>
                        </div>
                        <hr />
                        <form onSubmit={(e) => {formAction(e)}}>
                            <label>Email</label><br />
                            <input type="email" name="email" value={userInfo.email} onChange={(e) => {handleChange(e)}} placeholder="tepr@gmail.com" />
                            <label>Password</label><br />
                            <input type="password" name="pwd" value={userInfo.pwd} onChange={(e) => {handleChange(e)}} placeholder="tepr1234" /><br/>
                            {loading && <p>Loading ...</p>}
                            {error !== "" ? <p>{error}</p> : <></> }
                            {user && <Navigate to='/' replace />}
                            <button type='submit'>Login</button>
                        </form>
                        <hr />
                        <div className="login__option">
                            <a href="#" onClick={() => {signInWithGoogle()}}><Google /></a>
                            <a href="#" onClick={() => {signInWithGithub()}}><Github /></a>
                            <a href="#" onClick={() => {signInWithFacebook()}}><Facebook /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
