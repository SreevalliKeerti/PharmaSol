import React, {useState, useEffect} from 'react';
import Base from "../core/Base";
import {isAuthenticated} from "../auth/helper/index"; 
import { Link } from 'react-router-dom';
import { getUser } from './helper/userapicalls';

const UserDashBoard = () => {

    const [name,setName]=useState("");
    const [email,setEmail]=useState("");

    const {user, token} = isAuthenticated();

    const preload=()=>{
        getUser(user._id, token).then((data)=>{
            if(data.error){
                //
            }else{
                setName(data.name);
                setEmail(data.email);
            }
        })
    }

    useEffect(()=>{
       preload()
    },[])
    
    const userleftside = () => {
        return(
            <div className="card">
                <h4 className="card-header bg-dark text-white">User Navigation</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/user/orders" className="nav-link text-info">View Orders</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/user/update" className="nav-link text-info">Update Info</Link>
                    </li>   
                </ul>
            </div>
        );
    };

    const userrightside = () => {
        return(
            <div className="card mb-4">
                <h4 className="card-header bg-dark text-white">User Info</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">Name:</span> {name}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">Email:</span> {email}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-info">User area</span>
                    </li>
                </ul>
            </div>
        );
    };

    return (
        <Base title="Welcome to user area" description="We are very happy to see you here!!"
                className="container bg-light p-4">
            <div className="row">
                <div className="col-3">{userleftside()}</div>
                <div className="col-9">{userrightside()}</div>
            </div>         
        </Base>
    );
};

export default UserDashBoard;
