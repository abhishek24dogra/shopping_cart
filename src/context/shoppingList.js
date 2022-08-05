import React, { useEffect, useState } from "react";
import axios from 'axios';
import Context from "./Context";
import Cart from "./Cart";

const ShoppingList = () => {

    const [list, setList] = useState([])
    const [cart, setCart] = useState([])
    const[id, setId]=useState(0)
    const[total, setTotal]=useState("")

    //Getting List from API
    useEffect(() => {

        axios.get('https://fakestoreapi.com/products?limit=20')
            .then((response) => {
                setList(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    
    
    const clicktoCart=(e)=>{
        setId(id+1)
        const cartItem={id:id, title:e.target.name, price:e.target.value}
        
        setTotal(Number(total+(Number(e.target.value))))
        console.log(total)
        setCart(prev =>([...prev, cartItem]))
        
    }

    const dispatchUserEvent = (action, payload) => {
        switch (action) {
            case "ADD":
                setCart([...list, payload.newUser])
                return;
            case "DELETE":
                console.log(payload.id)
                const userList = cart.filter((item) => item.id !== payload.id);
                setTotal(Number(total-Number(payload.price)))
                console.log(total)
                setCart(userList);

                return;
            default:
                throw new Error();
        }
    }

    return (
        <div className="shop">
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

            <Context.Provider value={{ list, cart, dispatchUserEvent, total }}>
                 <Cart />
            </Context.Provider>
            <p className="total">Total Price : {total}</p>
        </div>
    );
};


export default ShoppingList;
