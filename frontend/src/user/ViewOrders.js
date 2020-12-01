import React, {useState, useEffect} from 'react';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import Base from "../core/Base";
import { getUser } from './helper/userapicalls';

const ViewOrders = () => {

    const [records, setRecords] = useState([]);

    const {user, token} = isAuthenticated();

    const preload = () => {
        getUser(user._id, token).then(data => {
            //console.log(data.purchases.length);
            if(data.error){
                console.log(data.error);
            }else{
                setRecords(data.purchases);
            }
        });
    }

    useEffect(() => {
        preload();
     }, []);

    return (
        <Base title="Previous Orders" description="You can view all your order history here">
            <Link className="btn btn-dark mb-4" to={`/user/dashboard`}>
                <span className="">User Home</span>
            </Link>
            <div className="row">
                <div className="col-12">
                    <table className="table table-bordered table-hover table-striped">
                        <thead className="thead-dark">
                            <tr>
                            <th scope="col">Product Name</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Purchased Date</th>
                            <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records && records.length > 0 
                            ? records.reverse().map((record, index) => {
                                return (
                                    <tr key={index}>
                                          <td>{record.name} - Quantity: <b>{record.quantity}</b> box(es)</td>
                                          <td>Rs. {record.amount*record.quantity}</td>           
                                          <td>{record.purchasedAt}</td>           
                                          <td>{record.status}</td>           
                                    </tr>);
                            })
                            : <h3 className="text-dark text-left">You haven't ordered anything</h3>}
                        </tbody>
                    </table>
                </div>
        </div>
        </Base>
    );
};

export default ViewOrders;
