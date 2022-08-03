import React, {useContext, useState} from "react";
import Context from "./Context";


const Cart = () => {

    const {cart, dispatchUserEvent} = useContext(Context);
    

    // const handleOnChange = (e) => {
    //     setCart( prev=> ( { ...prev , [e.target.name] : e.target.value}));
    // }

    return ( 
        <div>
            <div className="List">
                <table>
                    <thead>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Options</th>
                    </thead>
                    {cart.map((item, key) => {
                        return (
                            <tbody >
                                
                                <td>{item.title}</td>
                                <td>{item.price}</td>
                                <td><button id={item.id} name={item.title} value={item.price}
                                onClick={()=>dispatchUserEvent("DELETE", {id: item.id})}>Delete</button></td>
                            </tbody>
                        )
                    })}
                </table>
            </div>
            </div>
        // {/* <div>
        //     <p>Table</p>

        //     <input type="text" name="id" id="id" value={item.id} onChange= {handleOnChange} />
        //     <input type="text" name="name" id="name" value={item.name} onChange= {handleOnChange} />
        //     <input type="text" name="price" id="price" value={item.price} onChange= {handleOnChange} />
        //     <button onClick={()=> dispatchUserEvent("ADD", {newUser : item})}> ADD </button>
        // </div> */}
     );
    }

export default Cart;
