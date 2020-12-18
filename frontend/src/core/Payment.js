import React, { useState, useEffect } from "react";
import { loadCart, cartEmpty } from "./helper/CartHelper";
import { Link, Redirect } from "react-router-dom";
import { getmeToken, processPayment } from "./helper/PaymentBHelper";
import { createOrder } from "./helper/OrderHelper";
import { isAuthenticated } from "../auth/helper";
import emailjs from 'emailjs-com';

import DropIn from "braintree-web-drop-in-react";

const Paymentb = ({ products, setReload = f => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {}
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const check = isAuthenticated();

  const [redirect, setRedirect] = useState(false);

    const getARedirect = (redirect) => {
      if(redirect){
          return <Redirect to="/user/orders" />;
      }
    };
  
  const message = check ? (<h3>Please add items to cart</h3>) : (<h3>Please login to continue</h3>);  

  const getToken = (userId, token) => {
    getmeToken(userId, token).then(info => {
      // console.log("INFORMATION", info);
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const showbtdropIn = () => {
    return (
      <div>
        {check && info.clientToken !== null && products.length > 0 ? (
          <div className="row">
            <div className="col-12">
              <DropIn
                options={{ authorization: info.clientToken }}
                onInstance={instance => (info.instance = instance)}
              />
            </div>
            <div className="col-4"></div>
            <div className="col-4">
              <button className="btn btn-block btn-outline-success" onClick={onPurchase}>
                Buy
              </button>
            </div>
          </div>
        ) : (
            <div>
                {isAuthenticated() ? (<h3>Please add items to cart</h3>) : (<h3>Please login to purchase products</h3>)}
            </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then(data => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount()
      };
      processPayment(userId, token, paymentData)
        .then(response => {
          setInfo({ ...info, success: response.success, loading: false });
          console.log("PAYMENT SUCCESS");
          
          const orderData = {
            products: products,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount,
            status: "Received"
          };

          createOrder(userId, token, orderData);

          let templateParams = {
            from_name: isAuthenticated().user.name,
            to_name: 'keerti.kssv@gmail.com',
            subject: 'New Order Received',
            message_html: JSON.stringify({ orderData }),
           }

           let msg = "";

           products.map((product, index) => {
            msg += "Product: " + String(product.name);
            msg += " of Quantity: " + String(product.count) + "boxes , ";
          })

           emailjs.send("service_mikyyap","template_jzqqg7u",{
            from_name: isAuthenticated().user.name,
            message_html: msg,
            },"user_fUsUjiD9vjgS3BZ9Dymnf");

            

          cartEmpty(() => {
              console.log("Crash?");
          });
          
          setReload(!reload);

          setTimeout(
            () => setRedirect(true), 
            3000
        );
        })
        .catch(error => {
          setInfo({ loading: false, success: false });
          console.log("PAYMENT FAILED");
        });
    });
  };

  const getAmount = () => {
    let amount = 0;
    
    products.map(p => {
      amount = amount + p.price*p.count;
    });
    return amount;
  };

  return (
    <div>
      {isAuthenticated() ? (<h3>Your bill is Rs.{getAmount()} </h3>): (<h3></h3>)}
      {showbtdropIn()}
      {getARedirect(redirect)}
    </div>
  );
};

export default Paymentb;
