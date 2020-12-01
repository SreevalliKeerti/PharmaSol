import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/CartHelper";
import Payment from "./Payment";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
     setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return(
        <div>
            <h2>Products in Cart</h2>
            {products.map((product, index) => (
                <Card key={index} product={product} removefromCart={true} addtoCart={false} setReload={setReload} reload={reload}/>
            ))}
        </div>
    );
  };

  const loadCheckout = () => {
    return(
        <div>
            <h2>CheckOut</h2>
        </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row text-center">
        <div className="col-6">{products.length > 0 ? loadAllProducts(products) : (<h3>Cart is Empty!!</h3>)}</div>
        <div className="col-6">
          <Payment products={products} setReload={setReload}/>
        </div>
      </div>
    </Base>
  );
};

export default Cart;