import React, { useState } from 'react';
import './Signup.css';
import smo from '../../assets/img/604820.png'
import { useAuthContext } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

interface User {
    email: string;
    name: string;
    pwd: string;
}

export const Signup: React.FC<{}> = () => {
    const [userInfo, setUserInfo] = useState<User>({email: '', name: '', pwd: ''})
    const { registerUser, loading, error, user } = useAuthContext()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = e.target;

        setUserInfo({
            ...userInfo,
            [name]: value
        })
    }

    const formAction = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(userInfo.email !== "" || userInfo.name !=="" || userInfo.pwd !==""){
            registerUser(userInfo.email, userInfo.name, userInfo.pwd)
            setUserInfo({email: '', name: '', pwd: ''});
        }
        
    }

    return (
        <div className='signup__container'>
            <div className="signup__overflow">
                <div className="signup__modal">
                    <div className="signup__carousel">
                        <img src={smo} alt="" className='signup__carousel_img' />
                    </div>
                    <div className="signup__form">
                        <h2>Create an account</h2>
                        <hr />
                        <form onSubmit={(e) => {formAction(e)}}>
                            <label>Email</label><br />
                            <input type="email" name="email" onChange={(e) => {handleChange(e)}} placeholder="tepr@gmail.com" />
                            <label>Name</label><br />
                            <input type="text" name="name" onChange={(e) => {handleChange(e)}} placeholder="tepr" />
                            <label>Password</label><br />
                            <input type="password" name="pwd" onChange={(e) => {handleChange(e)}} placeholder="tepr1234" /><br/>
                            {loading && <p>Loading ...</p>}
                            {error !== "" ? <p color='red'>{error}</p> : <></> }
                            {user && <Navigate to="/" replace />}
                            <button type='submit'>Signup</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
