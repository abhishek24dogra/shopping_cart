import React, {useContext, useState} from "react";
import Context from "./Context";


const Cart = () => {

    const {cart, dispatch, total} = useContext(Context);
    

    // const handleOnChange = (e) => {
    //     setCart( prev=> ( { ...prev , [e.target.name] : e.target.value}));
    // }

    return ( 
        <Context.Consumer>
        <div className="cart">
            <div >
                <table>
                    <thead>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Options</th>
                    </thead>
                    {cart.map((item, key) => {
                        return (
                            
                            <tbody key={item.id}>
                                
                                <td>{item.title}</td>
                                <td>{item.price}</td>
                                <td><button id={item.id} name={item.title} value={item.price}
                                onClick={()=>dispatch("DELETE", {id: item.id, price:item.price})}>Delete</button></td>
                            </tbody>
                            
                            
                        )
                    })}
                </table>
            </div>
            </div>
            </Context.Consumer>
     );
    }

export default Cart;
