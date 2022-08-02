import React from "react";
import Context from "./Context";


const AddItem = () => {

    const {dispatchUserEvent} = useContext(Context);
    const [item, setItem] = useState( {id: "", name: "" , price : ""})

    const handleOnChange = (e) => {
        setItem( prev=> ( { ...prev , [e.target.name] : e.target.value}));
    }

    return ( 
        <div>
            <p>Add a new Product</p>

            <input type="text" name="id" id="id" value={item.id} onChange= {handleOnChange} />
            <input type="text" name="name" id="name" value={item.name} onChange= {handleOnChange} />
            <input type="text" name="price" id="price" value={item.price} onChange= {handleOnChange} />
            <button onClick={()=> dispatchUserEvent("ADD", {newUser : item})}> ADD </button>
        </div>
     );
    }

export default AddItem;
