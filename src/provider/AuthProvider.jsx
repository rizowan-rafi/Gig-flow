import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.init";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic";


export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic=useAxiosPublic()
    // create user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // sign in user
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // sign in using google auth
    const provider = new GoogleAuthProvider();
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    };

    // update Profile
    const updateUserProfile = (Name, Photo) => {
        return updateProfile(auth.currentUser, {
            displayName: Name,
            photoURL: Photo,
        });
    };

    // signOut user
    const signOutUser = () => {
        setLoading(true);
        return signOut(auth).then((res) => {
            setUser(null);
            setLoading(false);
        });
    };

    // to monitor state change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                const userInfo = { email: user.email };
                axiosPublic.post("/jwt", userInfo).then((res) => {
                    if (res?.data?.token) {
                        localStorage.setItem("token", res.data.token);
                    }
                });

                setLoading(false);
            } else {
                // User is signed out
                // ...
                // setLoading(false)
                localStorage.removeItem("token");
                setLoading(false);
            }
        });

        return () => {
            return unsubscribe();
        };
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        signOutUser,
        updateUserProfile,
        signInWithGoogle,
    };
    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
