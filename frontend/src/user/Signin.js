import React, {useState} from "react";
import Base from "../core/Base";
import {Link, Redirect} from "react-router-dom";

import {signin, authenticate, isAuthenticated} from "../auth/helper"

const SignIn = () => {

  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false
  });

  const {email, password, error, loading, didRedirect} =values;
  const {user} = isAuthenticated();

  const handleChange = name => event => {
    setValues({...values, error: false, [name]: event.target.value});
  };

  const onSignIn = event => {
    event.preventDefault();
    setValues({...values, error: false, loading: true});
    signin({email, password})
    .then(data => {
      if(data.error){
        setValues({...values, error: data.error, loading: false});
      }else{
        authenticate(data, () => {
          setValues({
            ...values,
            didRedirect: true
          })
        });
      }
    })
    .catch(console.log("signin request failed"));
  };

  const performRedirect = () => {
    if(didRedirect){
      if(user && user.role === 1){
        return <Redirect to="/admin/dashboard"/>;
      }else{
        return <Redirect to="/user/dashboard"/>
      }
    }
    if(isAuthenticated()){
      return <Redirect to="/" />;
    }
  };

  const signInForm = () => {
      return (
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
            <form>
              <div className="form-group">
                <label className="text-dark">Email</label>
                <input onChange={handleChange("email")} className="form-control" type="email" value={email}/>
              </div>
  
              <div className="form-group">
                <label className="text-dark">Password</label>
                <input onChange={handleChange("password")} className="form-control" type="password" value={password}/>
              </div>

              <div className="col-4 offset-sm-4">
                <button onClick={onSignIn} className="btn btn-outline-success btn-block">Sign In</button>
              </div>
            </form>
          </div>
        </div>
      );
    };

  const loadingMessage = () => {
    return(
      loading && (
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
            <div className="alert alert-info">
              <h2>Loading.....</h2>
            </div>
          </div>
        </div>
      )
    );
  }

  const errorMessage = () => {
    return(
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
            {error}
          </div>
        </div>
      </div>);
  };

  return(
      <Base title="SignIn Page" description="A page for user to sign in!">
        {loadingMessage()}
        {errorMessage()}
        {signInForm()}
        {performRedirect()}
      </Base>
  );
};

export default SignIn