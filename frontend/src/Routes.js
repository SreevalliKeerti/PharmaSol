import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from "./core/Home";
import SignIn from './user/Signin';
import SignUp from './user/Signup';
import PrivateRoute from './auth/helper/PrivateRoutes';
import AdminRoute from './auth/helper/AdminRoutes';
import UserDashBoard from './user/UserDashBoard';
import AdminDashBoard from './user/AdminDashBoard';
import AddCategory from './admin/AddCategory';
import ManageCategories from './admin/ManageCategories';
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import UpdateCategory from './admin/UpdateCategory';
import Cart from './core/Cart';
import Orders from './admin/Orders';
import ViewOrders from './user/ViewOrders';
import UpdateOrderStatus from './admin/UpdateOrderStatus';
import UpdateUser from './user/UpdateUser';
import ViewUsers from './admin/ViewUsers';
import UpdateMyInfo from './admin/UpdateMyInfo';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={SignUp} />
                <Route path="/signin" exact component={SignIn} />
                <Route path="/cart" exact component={Cart} />
                <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
                <PrivateRoute path="/user/orders" exact component={ViewOrders} />
                <PrivateRoute path="/user/update" exact component={UpdateUser} />
                <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
                <AdminRoute path="/admin/create/category" exact component={AddCategory} />
                <AdminRoute path="/admin/categories" exact component={ManageCategories} />
                <AdminRoute path="/admin/category/update/:categoryId" exact component={UpdateCategory} />
                <AdminRoute path="/admin/create/product" exact component={AddProduct} />
                <AdminRoute path="/admin/products" exact component={ManageProducts} />
                <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />
                <AdminRoute path="/admin/orders" exact component={Orders} />
                <AdminRoute path="/admin/order/status/:orderId" exact component={UpdateOrderStatus} />
                <AdminRoute path="/admin/users" exact component={ViewUsers} />
                <AdminRoute path="/admin/update/info" exact component={UpdateMyInfo} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;