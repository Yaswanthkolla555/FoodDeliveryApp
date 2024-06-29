import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import axios from 'axios';

export const StoreContext = createContext("null");

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const url = "http://localhost:4000";
        // uncomment when there is data of food present in databae-->used to fetch the data from db
        // and we can remove the food_list compoent form assets
    // const [food_list,setFoodList]=useState([])
    // const fetchFoodList=async()=>{
    //     const response=await axios.get(url+"/api/food/list")
    //     setFoodList(response.data.data)  
    // }
    const addToCart = async (itemId) => {
        if (isLoggedIn) {
            try {
                await axios.post(url + "/api/cart/add", { itemId }, { withCredentials: true });
                        if (!cartItems[itemId]) {
                            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
                        } else {
                            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
                        }
            } catch (error) {
                console.error('Error adding to cart:', error);
            }
        }
         else {
            console.log("User is not logged in");
        }
    };


    const removeFromCart = async (itemId) => {
        if (isLoggedIn) {
            try {
                await axios.post(url + "/api/cart/remove", { itemId }, { withCredentials: true });
                setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
            } catch (error) {
                console.error('Error removing from cart:', error);
            }
        } else {
            console.log("User is not logged in");
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const elem in cartItems) {
            if (cartItems[elem] > 0) {
                let elemInfo = food_list.find((product) => product._id === elem);
                totalAmount += elemInfo.price * cartItems[elem];
            }
        }
        return totalAmount;
    };

    const loadUserFromStorage = () => {
        console.log("Loading user from localStorage...");
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setIsLoggedIn(true);
            setUser(parsedUser);
            console.log("User loaded from localStorage:", parsedUser);
        } else {
            console.log("No user found in localStorage.");
        }
    };
    

    const checkAuth = async () => {
        console.log("Checking authentication status...");
        try {
            const response = await axios.get(url + "/api/user/profile",{ withCredentials: true });
            console.log("Response from /api/user/profile:", response.data);
            if (response.data.user) {
                setIsLoggedIn(true);
                setUser(response.data.user);
                // localStorage.setItem('user', JSON.stringify(response.data.user));
            } else {
                setIsLoggedIn(false);
                setUser(null);
                localStorage.removeItem('user'); 
            }
        } catch (error) {
            setIsLoggedIn(false);
            setUser(null);
            localStorage.removeItem('user');
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('user');
        console.log("User logged out and localStorage cleared.");
    };

    useEffect(() => {
        loadUserFromStorage();
        checkAuth();
        // uncomment when there is data of food present in databae-->used to fetch the data from db
        // async function loadData(){
        //     await fetchFoodList();
        // }
        // loadData();
    }, []); 

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        logout, 
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};
// localStorage.removeItem('test')
export default StoreContextProvider;
