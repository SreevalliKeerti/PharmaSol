import React, {useState, useEffect} from 'react'
import { Link, Redirect } from 'react-router-dom';
import Base from "../core/Base";
import { getProduct, getCategories, updateProduct } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper';

const UpdateProduct = ({match}) => {

    const {user, token} = isAuthenticated();

    const [redirect1, setRedirect1] = useState(false);

    const getRedirect = (redirect1) => {
      if(redirect1){
          return <Redirect to="/admin/products" />;
      }
    };

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        categories: [],
        category: "",
        loading: false,
        error: "",
        createdProduct: "",
        getaRedirect: false,
        formData: ""
    });

    const {name, description, price, stock, categories, category, loading, error, createdProduct, getaRedirect, formData} =values

    const preload = (productId) => {
        getProduct(productId).then(data => {
            //console.log(data);
            if(data.error){
                setValues({...values, error: data.error});
            }else{
                preloadCategories();
                setValues({
                    ...values,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category._id,
                    stock: data.stock,
                    formData: new FormData()
                });
            }
        });
    };

    const preloadCategories = () =>{
        getCategories().then(data => {
            if(data.error){
                setValues({...values, error: data.error});
            }else{
                setValues({
                    categories: data,
                    formData: new FormData()
                });
            }
        });
    }

    useEffect(() => {
        preload(match.params.productId);
    }, [])

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: "", loading: true});

        updateProduct(match.params.productId, user._id, token, formData)
          .then(data => {
            if(data.error){
              setValues({...values, error: data.error});
            }else{
              setValues({
                ...values,
                name: "",
                description: "",
                price: "",
                stock: "",
                photo: "",
                loading: false,
                createdProduct: data.name
              });
            }
          });
          setTimeout(
            () => setRedirect1(true), 
            6000
          );
    };

    const handleChange = name => event => {
      const value = name === "photo" ? event.target.files[0] : event.target.value; 
      formData.set(name, value);
      setValues({...values, [name]: value});
    };

    const successMessage = () => (
      <div className="alert alert-success mt-3" style={{display: createdProduct ? "" : "none"}}>
        <h4>{createdProduct} updated successfully</h4>
        
      </div>
    );

    const warningMessage = () => (
      <div className="alert alert-danger mt-3" style={{display: error ? "" : "none"}}>
        <h4>{error}</h4>
      </div>   
    );

    const createProductForm = () => (
        <form >
          <span>Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-info col-4">
              <input onChange={handleChange("photo")} type="file" name="photo" accept="image" placeholder="choose a file"/>
            </label>
          </div>
          <div className="form-group">
            <input onChange={handleChange("name")} name="photo" className="form-control" placeholder="Name" value={name}/>
          </div>
          <div className="form-group">
            <textarea onChange={handleChange("description")} name="photo" className="form-control" placeholder="Description" value={description}/>
          </div>
          <div className="form-group">
            <input onChange={handleChange("price")} type="number" className="form-control" placeholder="Price" value={price}/>
          </div>
          <div className="form-group">
            <select onChange={handleChange("category")} className="form-control" placeholder="Category">
              <option>Select</option>
              {categories && 
              categories.map((cate, index) => (
                <option key={index} value={cate._id}>{cate.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <input onChange={handleChange("stock")} type="number" className="form-control" placeholder="Quantity" value={stock}/>
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-info mb-3">Update Product</button>
        </form>
      );

    return (
       <Base title="Product Updation Area" description="An area for updation of Products"
                className="container bg-info p-4">
            <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">Admin Home</Link>
            <div className="row bg-light text-dark rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {warningMessage()}
                    {createProductForm()}
                    {getRedirect(redirect1)}
                </div>
            </div>
       </Base>
    );
};

//TODO: Perform a redirect

export default UpdateProduct; 