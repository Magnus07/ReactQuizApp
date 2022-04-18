import { React, useEffect, useContext } from 'react';
import { UserContext } from '../userContext';



function Logout() {
    const userContext = useContext(UserContext);
    useEffect(function () {
        const logout = async function () {
            const res = await fetch("http://localhost:3001/users/logout",
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            userContext.setUserContext(null);
        }
        logout();
    }, []);
    return (
        <>
            <p>You has been successfully logged out.<a href="/">Return to home</a></p>
        </>
    );
}


export default Logout;