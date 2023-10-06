import React, { useState } from "react";
import axios from 'axios';
import { GET_APPERAL_API_URL } from '../../Constants'

function SearchProduct(props) {
    //const apperalServiceURL = "http://localhost:5001/apperals";
    const [productData, setProductData] = useState('');

    const getProductUrl = (productId) => {
        //let urlPath = apperalServiceURL + "/apperals/" + productId;
        let urlPath = `${GET_APPERAL_API_URL}` + productId;
        return urlPath;    
    };

    const searchProduct = (product) => {
        let url = getProductUrl(product.productId);
          axios.get(url)
            .then((response) => {
                console.log("Called webservice for product");
                setProductData(response.data);
                console.log(response.data);
            })
            .catch((error) => {
              if (error.response) {
              console.error('Server Error:', error.response.status);
              } else if (error.request) {
                console.error('Network Errorrrrrrrrrrrrrrrr:', error.request);
              } else {
                console.error('Error:', error.message);
            }
          });
    };

    searchProduct(props.product);

        return (
            
            <div>
                <h2>{props.product.productName}</h2>
                <img src={props.product.imageLocation} width="100" height={100}/><br/>
                <h3>Product Information</h3>
                {productData.productInfo}
                <h3>Manufacturer</h3>
                {productData.manufacturer}
                <h3>Available Quantity</h3>
                {productData.availableQuantity}
            </div>
        );
    
}

export default SearchProduct;