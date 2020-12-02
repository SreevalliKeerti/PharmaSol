import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { deleteProduct, getProducts } from './helper/adminapicall';

const ManageProducts = () => {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    const {user, token} = isAuthenticated();

    const preload = () => {
        getProducts().then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                setProducts(data);
            }
        });
    };

    useEffect(() => {
       preload();
    }, []);

    const deleteCurrentProduct = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                preload();
            }
        });
    };

    useEffect(() => {
        setFilteredProducts(
          products.filter( product => {
            return product.name.toLowerCase().includes( search.toLowerCase() )
          })
        )
      }, [search, products])

    return (
        <Base title="Welcome admin" description="Manage products here">
        <Link className="btn btn-dark mb-4" to={`/admin/dashboard`}>
          <span className="">Admin Home</span>
        </Link>
        <div className="d-flex justify-content-end mb-4">
            <input type="text" className="form-control col-3" placeholder="Search here" onChange = { e => setSearch(e.target.value) } />
            <div class="input-group-append">
                <span class="input-group-text" id="basic-addon2">Search</span>
            </div>
        </div>
        <div className="row">
          <div className="col-12">
            <table className="table table-bordered table-hover table-striped">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Available Stock</th>
                    <th scope="col">Sold</th>
                    <th scope="col">#</th>
                    <th scope="col">#</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map((product, index) => {
                        return(
                            <tr key={index}>
                                <td>{product.name}</td>
                                <td>{product.stock}</td>
                                <td>{product.sold}</td>
                                <td>
                                    <Link
                                        className="btn btn-success"
                                        to={`/admin/product/update/${product._id}`}
                                    >
                                        <span className="">Update</span>
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={() => {
                                        deleteCurrentProduct(product._id);
                                    }} className="btn btn-danger">
                                        Delete
                                    </button>
                                    </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>    
          </div>
        </div>
      </Base>
    );
};

export default ManageProducts;