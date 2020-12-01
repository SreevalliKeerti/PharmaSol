import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import Base from "../core/Base";

import { isAuthenticated } from '../auth/helper';
import { getUser, updateUser } from './helper/userapicalls';

const UpdateUser = () => {
    
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [error,setError]=useState(false);
    const [success,setSuccess]=useState(false);

    const{user, token}=isAuthenticated();

    const goBack=()=>{
        return (
            <div className="mt-5">
                <Link className="btn btn-small btn-dark mb-4" to="/user/dashboard">User Home</Link>
            </div>
        )
    }

    const preload=()=>{
        getUser(user._id, token).then((data)=>{
            if(data.error){
                setError(true)
            }else{
                setName(data.name);
                setEmail(data.email);
            }
        })
    }

    useEffect(()=>{
       preload()
    },[])

    const handleChangeName=(event)=>{
        setError("");
        setName(event.target.value);
    }

    const handleChangeEmail=(event)=>{
        setError("");
        setEmail(event.target.value);
    }

    const successMessage=()=>{
        if(success){
            return (
            <h4 className="alert alert-success mt-3">Info Updated Successfully</h4>
            )
        }
    }

    const warningMessage=()=>{
        if(error){
            return (
            <h4 className="alert alert-danger mt-3">Failed To Update Info</h4>
            )
        }
    }

    const onSubmit=(event)=>{
        event.preventDefault();
        setError("");
        setSuccess(false);
        console.log(name);
        // Backend request fired
        updateUser(user._id, token, {name, email})
        .then((data)=>{
            console.log(data)
            if(data.error){
                setError(true)
            }
            else{
                setError("");
                setSuccess(true);
                setName("");
                setEmail("");
            }
        })
    }

    const myOrderForm=()=>{
        
        return (
        <form>
            <div className="form-group">
                <p className="lead">Update the Profile Info</p>
                <input className="form-control my-3" type="text" 
                onChange={handleChangeName} value={name}
                autoFocus required placeholder="Name"/>
                 <input className="form-control my-3" type="email" 
                onChange={handleChangeEmail} value={email}
                autoFocus required placeholder="Email"/>
                <button onClick={onSubmit} className="btn btn-outline-info">Update Info</button>
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
                </div>
            </div>
        </Base>
    )
};

//TODO: Perform a redirect

export default UpdateUser; 