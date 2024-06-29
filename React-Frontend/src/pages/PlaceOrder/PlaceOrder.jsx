import React, { useContext } from 'react'
import "./PlaceOrder.css"
import { StoreContext } from '../../context/StoreContext'
const PlaceOrder = () => {
const {getTotalCartAmount}=useContext(StoreContext)
  return (
    <from className="placeorder">
      <div className="placeorder-left">
          <p className="title">Delivery Information</p>
          <div className="fields">
            <input type="text" placeholder='First Name' />
            <input type="text" placeholder='Last Name' />
          </div>
          <input type="email" placeholder='Email address' />
          <input type="text" placeholder='Street' />
          <div className="fields">
            <input type="text" placeholder='City' />
            <input type="text" placeholder='State' />
          </div>
          <div className="fields">
            <input type="text" placeholder='Pin Code' />
            <input type="text" placeholder='Country' />
          </div>
          <input type="text" placeholder='Phone'/>
      </div>
      <div className="placeorder-right">
      <div className="cart-total">
          <h3>Cart Total</h3>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>&#8377;{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>&#8377;{getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>&#8377;{getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
            <button onClick={()=>navigate("/order")}>Proceed To Checkout</button>
          </div>
        </div>
      </div>
    </from>
  )
}

export default PlaceOrder
