import React from 'react';
import { API } from '../../backend';

const ImageHelper = ({product}) => {
    const imageurl = product ? `${API}/product/photo/${product._id}` : `https://images.pexels.com/photos/3683101/pexels-photo-3683101.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500`
    return (
        <div className="rounded border border-dark p-2">
            <img
                src={imageurl}
                alt="photo"
                style={{ width: "200px", height:"300px", maxHeight: "100%", maxWidth: "100%" }}
                className="mb-3 rounded"
            />
        </div>
    );
};

export default ImageHelper;