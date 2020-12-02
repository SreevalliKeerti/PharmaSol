import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const loadAllProduct = () => {
    getProducts().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProduct();
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter( product => {
        return product.name.toLowerCase().includes( search.toLowerCase() )
      })
    )
  }, [search, products])

  return (
    <Base title="Home Page" description="Welcome to the official website of Bioscodex Pharmaceuticals">
      <div className="d-flex justify-content-end mb-4">
        <input type="text" className="form-control col-3" placeholder="Search here" onChange = { e => setSearch(e.target.value) } />
        <div class="input-group-append">
          <span class="input-group-text" id="basic-addon2">Search</span>
        </div>
      </div>
      <div className="row text-center">    
          {filteredProducts.map((product, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <Card product={product} />
              </div>
            );
          })}
      </div>
    </Base>
  );
}
