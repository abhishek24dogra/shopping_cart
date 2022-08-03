import React, { useContext } from 'react';
import Context from './Context';


const UserList = () => {

    const {users , dispatchUserEvent} = useContext(Context);

    return ( 
        <div>
            <p> Available Users : </p>
            {users.map( user => <div key={user.id}> <p>Name : {user.name}</p> <p>Address : {user.address} </p> <button onClick={ ()=> dispatchUserEvent("DELETE", {id : user.id})}> DELETE</button></div>)}
        </div>
     );
}
 
export default UserList;