import React, { useEffect, useState, useReducer } from "react";
import axios from 'axios';
import Context from "./Context";
import Cart from "./Cart";
import './List.css';

const ShoppingList = () => {

    const getAPI = async () => {

        try {
            const data = await axios.get('https://fakestoreapi.com/products?limit=15')
            setList(data.data)
        }
        catch (err) {
            console.log(err.message)
        }
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case "ADD-CART":
                const newCart = [...state.cart];
                const cartItemIndex = newCart.findIndex(item => item.id === action.value.id)
                if (cartItemIndex < 0) {
                    newCart.push({ ...action.value, quantity: 1 })
                } else {
                    const updatedItem = newCart[cartItemIndex]
                    updatedItem.quantity++;
                    newCart[cartItemIndex] = updatedItem;
                    console.log(newCart)
                }
                return {
                    ...state, cart: newCart,
                }

            case "DELETE-CART":
                const removeCart = [...state.cart];
                const removeItemIndex = removeCart.findIndex(item => item.id === action.value.id)
                const removeItem = removeCart[removeItemIndex]
                removeItem.quantity--;

                if (removeItem.quantity <=0) {
                    removeCart.splice( removeItemIndex, 1 )
                } else {                                       
                    removeCart[removeItemIndex] = removeItem;
                    console.log(removeCart)
                }
                return {
                    ...state, cart: removeCart
                };
            default:
                return state;

        }
    }
    //ALL STATE/REDUCER Functions
    const [list, setList] = useState([])
    const [cartList, dispatch] = useReducer(reducer, { cart: [], total: 0 })
    // const [id, setId] = useState(0)
    const [total, setTotal] = useState("")

    //GET CALL
    // useEffect(() => {
    //     setTimeout(getAPI, 500)
    // }, [])
    getAPI();


    return (
        <div>
            <div className="shop">
                <div className="List">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        {list.map((item, key) => {
                            return (
                                <tbody key={item.id} classname="row">
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.title}</td>
                                        <td>{item.price}</td>
                                        <td><button
                                            onClick={() => { dispatch({ type: "ADD-CART", value: { id: item.id, title: item.title, price: item.price } }) }}>
                                            Add to Cart</button>
                                        </td>
                                    </tr>
                                </tbody>
                            )
                        })}
                    </table>
                </div>
                <Context.Provider value={{ cartList, dispatch, total }}>
                    <Cart />
                </Context.Provider>
            </div>
        </div>

    );

};






//WORKING PROGRAM WITHOUT REDUCER
//     const [list, setList] = useState([])
//     const [cart, setCart] = useState([])
//     const[id, setId]=useState(0)
//     const[total, setTotal]=useState("")

//     //Getting List from API
//     useEffect(() => {

//         axios.get('https://fakestoreapi.com/products?limit=20')
//             .then((response) => {
//                 setList(response.data)
//             })
//             .catch((err) => {
//                 console.log(err)
//             })
//     }, [])


//     const clicktoCart=(e)=>{
//         setId(id+1)
//         const cartItem={id:id, title:e.target.name, price:e.target.value}

//         setTotal(Number(total+(Number(e.target.value))))
//         console.log(total)
//         setCart(prev =>([...prev, cartItem]))

//     }

//     const dispatchUserEvent = (action, payload) => {
//         switch (action) {
//             case "ADD":
//                 setCart([...list, payload.newUser])
//                 return;
//             case "DELETE":
//                 console.log(payload.id)
//                 const userList = cart.filter((item) => item.id !== payload.id);
//                 setTotal(Number(total-Number(payload.price)))
//                 console.log(total)
//                 setCart(userList);

//                 return;
//             default:
//                 throw new Error();
//         }
//     }

//     return (
// <div className="shop">
//     <div className="List">
//         <table>
//             <thead>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Price</th>
//                 <th>Options</th>
//             </thead>
//             {list.map((item, key) => {
//                 return (
//                     <tbody key={item.id}>
//                         <td>{item.id}</td>
//                         <td>{item.title}</td>
//                         <td>{item.price}</td>
//                         <td><button id={item.id} name={item.title} value={item.price}
//                         onClick={clicktoCart}>Add to Cart</button></td>
//                     </tbody>
//                 )
//             })}
//         </table>
//     </div>

//             <Context.Provider value={{ list, cart, dispatchUserEvent, total }}>
//                  <Cart />
//             </Context.Provider>
//             <p className="total">Total Price : {total}</p>
//         </div>
//     );
// };


export default ShoppingList;
