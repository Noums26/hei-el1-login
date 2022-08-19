import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import './Home.css';

export const Home: React.FC<{  }> = () => {
    const { logoutUser, user } = useAuthContext()

    if(!user){
        return <Navigate to="/login" replace />
    }

    return (
        <div className='home__container'>
            <div className="home__overflow">
                <div className="home__modal">
                    <div className="home__form">
                        {user.displayName && <h2>Hello {user.displayName}!</h2>}
                        {!user.displayName && <h2>Hello !</h2>}
                        <hr />
                        <h3>Welcome !</h3>
                        <h4>You are logged in but the page is under development.</h4>
                        <p>Please stay connected.</p>
                        <hr />
                        <button onClick={() => {logoutUser()}}>Log Out</button>
                    </div>
                </div>
            </div>
        </div>
    );
};