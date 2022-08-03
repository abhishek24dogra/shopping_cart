import React, { useEffect, useState } from "react";
import axios from 'axios';
import Context from "./Context";
import Cart from "./Cart";

const ShoppingList = () => {

    const [list, setList] = useState([])
    const [cart, setCart] = useState([])

    //Getting List from API
    useEffect(() => {

        axios.get('https://fakestoreapi.com/products?limit=10')
            .then((response) => {
                setList(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    
    const clicktoCart=(e)=>{
        console.log(e.target.value, e.target.name)
        const cartItem={id:e.target.id, title:e.target.name, price:e.target.value}
        console.log(cartItem)
        setCart(prev =>([...prev, cartItem]))
        //Cart();
    }

    const dispatchUserEvent = (action, payload) => {
        switch (action) {
            case "ADD":
                setCart([...list, payload.newUser])
                return;
            case "DELETE":
                console.log(payload.id)
                const userList = cart.filter((item) => item.id !== payload.id);
                
                setCart(userList);

                return;
            default:
                throw new Error();
        }
    }

    return (
        <div>
            <div className="List">
                <table>
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Options</th>
                    </thead>
                    {list.map((item, key) => {
                        return (
                            <tbody key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.price}</td>
                                <td><button id={item.id} name={item.title} value={item.price}
                                onClick={clicktoCart}>Add to Cart</button></td>
                            </tbody>
                        )
                    })}
                </table>
            </div>

            <Context.Provider value={{ list, cart, dispatchUserEvent }}>
                 <Cart />
            </Context.Provider>
        </div>
    );
};


export default ShoppingList;
