import React, { useContext, useEffect } from 'react'
import "./Verify.css"
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
const Verify = () => {
    // to get data from url use useSearchParams
    const [SearchParams,setSearchParams]=useSearchParams();
    const success=SearchParams.get("success");
    const orderId=SearchParams.get("orderId");
    console.log(success,orderId)
    const {url}=useContext(StoreContext);
    const navigate=useNavigate();

    const verifyPayment=async()=>{
        const response=await axios.post(url+"/api/order/verify",{success,orderId});
        if(response.data.success){
            navigate("/myorders");
        }
        else{
            navigate("/")
        }
    }
    useEffect(()=>{
        verifyPayment();
    },[])
  return (
    <div>
      <div className="verify">
        <div className="Spinner">

        </div>
      </div>
    </div>
  )
}

export default Verify
