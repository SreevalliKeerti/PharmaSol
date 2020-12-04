import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { getAllUsers } from './helper/adminapicall';


const ViewUsers = () => {

    const [users, setUsers] = useState([]);

    const {user, token} = isAuthenticated();

    const preload = () => {
        getAllUsers(user._id, token).then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                setUsers(data);
            }
        });
    };

    useEffect(() => {
       preload();
    }, []);

    return (
        <Base title="Welcome admin" description="View users here">
            <Link className="btn btn-dark mb-4" to={`/admin/dashboard`}>
            <span className="">Admin Home</span>
            </Link>
            <div className="row">
                <div className="col-12">
                    <table className="table table-bordered table-hover table-striped">
                        <thead className="thead-dark">
                            <tr>
                            <th scope="col">User Name</th>
                            <th scope="col">User Email</th>
                            <th scope="col">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((person, index) => {
                                return(
                                    <tr key={index}>
                                        <td>{person.name}</td>
                                        <td>{person.email}</td>
                                        <td>{person.role === 1 ? "Admin" : "User"}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </Base>
    )
};

export default ViewUsers;
