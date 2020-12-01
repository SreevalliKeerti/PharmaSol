import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { deleteCategory, getCategories } from './helper/adminapicall';

const ManageCategories = () => {

    const [categories, setCategories] = useState([]);

    const {user, token} = isAuthenticated();

    const preload = () => {
        getCategories().then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                setCategories(data);
            }
        });
    };

    useEffect(() => {
       preload();
    }, []);

    const deleteCurrentCategory = categoryId => {
        deleteCategory(categoryId, user._id, token).then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                preload();
            }
        });
    };

    return (
        <Base title="Welcome admin" description="Manage categories here">
        <h2 className="mb-4">All categories:</h2>
        <Link className="btn btn-dark mb-4" to={`/admin/dashboard`}>
          <span className="">Admin Home</span>
        </Link>
        <div className="row">
          <div className="col-12">
            <table className="table table-bordered table-hover table-striped">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">Category Name</th>
                    <th scope="col">#</th>
                    <th scope="col">#</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) => {
                        return(
                            <tr key={index}>
                                <td>{category.name}</td>
                                <td>
                                    <Link
                                        className="btn btn-success"
                                        to={`/admin/category/update/${category._id}`}
                                    >
                                        <span className="">Update</span>
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={() => {
                                        deleteCurrentCategory(category._id);
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

export default ManageCategories;