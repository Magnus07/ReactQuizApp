import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../userContext';
import User from './User';

function Users() {
    const userContext = useContext(UserContext);
    const [users, setUsers] = useState([]);
    useEffect(function () {
        const getUsers = async function () {
            const res = await fetch("http://localhost:3001/users", {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();

            setUsers(data);
        }
        getUsers();
    }, []);

    return (
        <div>
            <h3>Users:</h3>
            <ul>
                { users.error === 'Unauthorized!' ? "Authorize to see the list of users!" : users?.map(user => (<User user={user} key={user._id}></User>))}
            </ul>
        </div>
    );
}

export default Users;