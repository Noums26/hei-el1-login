import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signOut, 
    updateProfile, 
    User,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
    FacebookAuthProvider
} from 'firebase/auth';
import { auth } from '../config/firebase';

import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext<any | null>(null)

export const useAuthContext = () => useContext(AuthContext)

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    useEffect(() => {
        setLoading(true)
        const unsubscribe = onAuthStateChanged(auth, (res) => {
            res ? setUser(res) : setUser(null)
            setError("")
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const registerUser = (email: string, name: string, password: string) => {
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                return auth.currentUser &&
                    updateProfile(auth.currentUser, {
                    displayName : name,
                })
            })
            .then((res) => console.log(res))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }

    const loginUser = (email: string, password: string) => {
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((res) => {setUser(res.user)})
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }

    const signInWithGoogle = () => {
        setLoading(true)
        signInWithPopup(auth, new GoogleAuthProvider())
            .then((res) => {setUser(res.user)})
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }

    const signInWithGithub = () => {
        setLoading(true)
        signInWithPopup(auth, new GithubAuthProvider())
            .then((res) => {setUser(res.user)})
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }

    const signInWithFacebook = () => {
        setLoading(true)
        signInWithPopup(auth, new FacebookAuthProvider())
            .then((res) => {setUser(res.user)})
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }

    const logoutUser = () => {
        signOut(auth)
    }

    const contextValue = {
        user,
        loading,
        error,
        registerUser,
        loginUser,
        logoutUser,
        signInWithGoogle,
        signInWithGithub,
        signInWithFacebook
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
