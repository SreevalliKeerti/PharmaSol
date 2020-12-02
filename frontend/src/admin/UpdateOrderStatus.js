import React, {useState, useEffect} from 'react'
import { Link, Redirect } from 'react-router-dom';
import Base from "../core/Base";
import { isAuthenticated } from '../auth/helper';
import {  getOneOrder, getOrders, getOrderStatuses, getUserOrders, updateOrderStatus } from './helper/adminapicall';

const UpdateOrderStatus = ({match}) => {

    const [status,setStatus]=useState("")
    const [error,setError]=useState(false);
    const [success,setSuccess]=useState(false);

    const{user, token}=isAuthenticated();

    const [redirect, setRedirect] = useState(false);

    const getARedirect = (redirect) => {
      if(redirect){
          return <Redirect to="/admin/orders" />;
      }
    };

    const goBack=()=>{
        return (
            <div className="mt-5">
                <Link className="btn btn-small btn-dark mb-4" to="/admin/dashboard">Admin Home</Link>
            </div>
        )
    }

    const handleChange=(event)=>{
        setError("");
        setStatus(event.target.value);
    };
    
    
    const successMessage=()=>{
        if(success){
            setTimeout(
                () => setRedirect(true), 
                3000
            );
            return (
            <h4 className="alert alert-success mt-3">Status Updated Successfully!!
             </h4>
            
            )     
        }   
    }

    const warningMessage=()=>{
        if(error){
            return (
            <h4 className="alert alert-danger mt-3">Failed To Update Status</h4>
            )
        }
    }

    const onSubmit=(event)=>{
        event.preventDefault();
        setError("");
        setSuccess(false);

        //console.log(status);
        // Backend request fired
        updateOrderStatus(match.params.orderId, user._id, token, {status})
        .then((data)=>{
            //console.log(data);
            if(data.error){
                setError(true)
            }
            else{
                setError("");
                setSuccess(true);
                setStatus("");
            }
        })
    }

    const myOrderForm=()=>{
        
        return (
        <form>
            <div className="form-group">
                <p className="lead">Update the Status</p>
                <input className="form-control my-3" type="text" 
                 value={status} onChange={handleChange}
                autoFocus required placeholder="For Ex- Delivery in 2 days"/>
                <button onClick={onSubmit} className="btn btn-outline-info">Update Status</button>
            </div>
        </form>
        )
    }

    return (
        <Base title="Status Updation Area" description="An area for updation of orders' status" className="container bg-info p-4">
            {goBack()}
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {warningMessage()}
                    {myOrderForm()}
                    {getARedirect(redirect)}
                </div>
            </div>
        </Base>
    )
};

export default UpdateOrderStatus;