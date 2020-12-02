import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../auth/helper';
import { Link, Redirect } from 'react-router-dom';
import Base from '../core/Base';
import { updateCategory, getCategory } from './helper/adminapicall';


const UpdateCategory=({match})=>{
    const [name,setName]=useState("")
    const [error,setError]=useState(false);
    const [success,setSuccess]=useState(false);

    const{user, token}=isAuthenticated();

    const [redirect, setRedirect] = useState(false);

    const getARedirect = (redirect) => {
      if(redirect){
          return <Redirect to="/admin/categories" />;
      }
    };

    const goBack=()=>{
        return (
            <div className="mt-5">
                <Link className="btn btn-small btn-dark mb-3" to="/admin/dashboard">Admin Home</Link>
            </div>
        )
    }

    const preload=(categoryId)=>{
        getCategory(categoryId).then((data)=>{
            if(data.error){
                setError(true)
            }else{
                setName(data.name)
            }
        })
    }

    useEffect(()=>{
       preload(match.params.categoryId)
    },[])

    const handleChange=(event)=>{
        setError("");
        setName(event.target.value)
    }

    const successMessage=()=>{
        if(success){
            setTimeout(
                () => setRedirect(true), 
                3000
            );
            return (
            <h4 className="alert alert-success mt-3">Category Updated Successfully</h4>
            )
        }
    }

    const warningMessage=()=>{
        if(error){
            return (
            <h4 className="alert alert-danger mt-3">Failed To Update Category</h4>
            )
        }
    }

    const onSubmit=(event)=>{
        event.preventDefault();
        setError("");
        setSuccess(false);

        // Backend request fired
        updateCategory(match.params.categoryId, user._id, token, {name})
        .then((data)=>{
            console.log(data)
            if(data.error){
                setError(true)
            }
            else{
                setError("");
                setSuccess(true);
                setName("");
            }
        })
    }

    const myCategoryForm=()=>{
        
        return (
        <form>
            <div className="form-group">
                <p className="lead">Update the Category</p>
                <input className="form-control my-3" type="text" 
                onChange={handleChange} value={name}
                autoFocus required placeholder="For Ex- Summer"/>
                <button onClick={onSubmit} className="btn btn-outline-info">Update Category</button>
            </div>
        </form>
        )
    }

    return (
        <Base title="Category Updation Area" description="An area for updation of Categories" className="container bg-info p-4">
            {goBack()}
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {warningMessage()}
                    {myCategoryForm()}
                    {getARedirect(redirect)}
                </div>
            </div>
        </Base>
    )
}

export default UpdateCategory;