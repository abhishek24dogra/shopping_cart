import React, {useContext, useState} from "react";
import Context from "./Context";


const Cart = () => {

    const {cartList, dispatch, total} = useContext(Context);
    

    // const handleOnChange = (e) => {
    //     setCart( prev=> ( { ...prev , [e.target.name] : e.target.value}));
    // }

    return ( 
        
        <div className="cart">
            <div >
                <table>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    {cartList.cart.map((item, key) => {
                        return (
                            
                            <tbody key={item.id}>
                               <tr>
                                
                                <td>{item.title}</td>
                                <td>{item.price}</td>
                                <td><button id={item.id} name={item.title} value={item.price}
                                onClick={()=>dispatch({type:"DELETE-CART", value:{id: item.id, price:item.price}})}>Delete</button></td>
                                </tr> 
                            </tbody>
                            
                            
                        )
                    })}
                </table>
            </div>
            </div>
            
     );
    }

export default Cart;
