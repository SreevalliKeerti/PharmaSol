import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { getOrders } from './helper/adminapicall';


const Orders = () => {

    const [orders, setOrders] = useState([]);

    const {user, token} = isAuthenticated();

    const preload = () => {
        getOrders(user._id, token).then(data => {
            //console.log(data)
            if(data.error){
                console.log(data.error);
            }else{
                setOrders(data);
            }
        });
    };

    useEffect(() => {
       preload();
    }, []);

    return (
        <Base title="Welcome admin" description="Manage orders here!">
            <Link className="btn btn-dark mb-4" to={`/admin/dashboard`}>
                <span className="">Admin Home</span>
            </Link>
            <div className="row">
                <div className="col-12">
                    <table className="table table-bordered table-hover table-striped">
                        <thead className="thead-dark">
                            <tr>
                            <th scope="col">Product Name</th>
                            <th scope="col">Status</th>
                            <th scope="col">#</th>
                            <th scope="col">OrderedAt</th>
                            <th scope="col">OrderedBy</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.reverse().map((order, index) => {
                                return(
                                    <tr key={order._id}>
                                        <th scope="row">{order.products.map((product, index) => {
                                                return(<p>{product.name} - Quantity: {product.count} box(es)</p>);
                                            })}
                                        </th>
                                        <td>{order.status}</td>
                                        <td>
                                            <Link
                                                className="btn btn-success"
                                                to={`/admin/order/status/${order._id}`}
                                            >
                                                <span className="">Update</span>
                                            </Link>
                                        </td>
                                        <td>{order.createdAt}</td>
                                        <td>{order.user.name}</td>
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

export default Orders;