import React, {useState, useEffect} from 'react';
import { Redirect } from "react-router-dom";
import { AddItemToCart, removeItemFromCart, addProductCount } from './helper/CartHelper';
import ImageHelper from './helper/ImageHelper';
import { isAuthenticated } from "../auth/helper";
import emailjs from 'emailjs-com';

const Card = ({
        product,
        addtoCart = true,
        removefromCart = false,
        setReload = f => f,
        reload = undefined,
        //setRefresh = f => f,
        //refresh = undefined
    }) => {
    
    const [redirect, setRedirect] = useState(false);

    const [count, setCount] = useState(product.count);

    const cardTitle = product ? product.name : "A product";
    const cardDescription = product ? product.description : "A product description";
    const cardPrice = product ? product.price : "0.00";
    const cardAvailability = product ? product.stock : "0";

    let warn = ""
          
    if(product.stock === 0){
        warn += String(product.name) + " is out of stock!!!! Do order";
        emailjs.send("service_mikyyap","template_ppepspi",{
        message: warn,
        },"user_fUsUjiD9vjgS3BZ9Dymnf");
    }
        

    const addToCart = () => {
        AddItemToCart(product, () => setRedirect(true))
    };

    const getARedirect = (redirect) => {
        if(redirect){
            return <Redirect to="/cart" />;
        }
    };

    const showAddtoCart = (addtoCart) => {
        return(
            addtoCart && product.stock !== 0 && (
                <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                    <button
                    onClick={addToCart}
                    className="btn btn-block btn-outline-success mt-4 mb-2 mx-2"
                    >
                        Add to Cart
                    </button>
                </div>
                </div>
            )
        );
    };

    const showQuantity = (removefromCart) => {
        return(
            removefromCart && (
                <div className="row">
                   
                    <div className="col-3"></div>
                    <button 
                    onClick={() => {
                        handleChangeDec();
                        setReload(!reload);}}  
                    className="btn btn-danger mt-4">-</button> 
                    <div className="col-5">
                        <p className="text-center">Quantity</p>
                        <input type="number" 
                        onChange={(event) => {
                            handleChange(event);
                            setReload(!reload);}}
                        className="form-control" placeholder="Quantity" value={count}/></div>
                    <button 
                    onClick={() => {
                        handleChangeInc();
                        setReload(!reload);}} 
                    className="btn btn-success mt-4">+</button><div className="col-4"></div>
                    {changeCount()}     
                </div>
            )
        ); 
    };

    const showRemovefromCart = (removefromCart) => {
        return(
            removefromCart && (
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-6">
                        <button
                        onClick={() => {
                            removeItemFromCart(product._id);
                            setReload(!reload);
                        }}
                        className="btn btn-block btn-outline-danger mt-4 mb-2 mx-2"
                        >
                            Remove from cart
                        </button>
                    </div>
                </div>
            )
        )
    };

    const handleChange = (event) => {
        if(event.target.value <= product.stock){
            setCount(event.target.value);
        }    
        else{
            event.target.value = product.stock;
        }
    }
    
    const handleChangeInc = () => {
        if(Number(count)+Number(1) <= product.stock){
            setCount(Number(count)+Number(1));
        }
        else{
            setCount(Number(count));
        }
    }

    const handleChangeDec = () => {
        if(Number(count)-Number(1) > 0){
            setCount(Number(count)-Number(1));
        }
        else{
            setCount(Number(count));
        }
    }
    console.log(count);

    const changeCount = () => {
        addProductCount(product._id, count);
    };

    return (
        <div className="card text-dark bg-light border border-info ">
        <div className="card-header lead"><b>{cardTitle}</b></div>
        <div className="card-body">
            {getARedirect(redirect)}
            <ImageHelper product={product}/>
            <p className="lead bg-dark rounded font-weight-normal text-wrap text-light">
                {cardDescription}
            </p>
            <p className="btn btn-info rounded  btn-sm px-4">Rs. {cardPrice}</p><br/>
            <p className="btn btn-dark rounded  btn-sm px-4 mb-0">Current Available Stock: {cardAvailability} boxes</p>
            <div className="row">
            <div className="col-12">

                {showAddtoCart(addtoCart)}
            </div>
            
            
            <div className="col-12 mt-4">{showQuantity(removefromCart)}</div>
           
            <div className="col-4"></div>
            
            <div className="col-12">
                {showRemovefromCart(removefromCart)}
            </div>
            </div>
        </div>
        </div>
    );
    };

export default Card;