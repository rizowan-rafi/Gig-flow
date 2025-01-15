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

export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
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
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                // const uid = user.uid;
                // ...
                setUser(user);
                // updateProfile(auth.currentUser, {
                //     displayName: user.displayName,
                //     photoURL: user.photoURL,
                // })
                //     .then(() => {
                //         // Profile updated!
                //         // ...
                //     })
                //     .catch((error) => {
                //         // An error occurred
                //         // ...
                //     });
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
