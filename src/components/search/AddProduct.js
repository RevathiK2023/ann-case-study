import React, { useState } from "react";
import axios from 'axios';
import './AddProduct.css';
import { ADD_APPERAL_API_URL } from '../../Constants'

function AddProduct() {
    const [addProduct, setAddProduct] = useState(true);
    const [selectedOption, setSelectedOption] = useState("apperals");
    const [productName, setProductName] = useState('');
    const [productDesc, setProductDesc] = useState('');
    const [price, setPrice] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [productInfo, setProductInfo] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [manufacturerAddress, setManufacturerAddress] = useState('');
    const [availableQuantity, setAvailableQuantity] = useState(0);
    const [addProductResponse, setAddProductResponse] = useState('');

    const logFields = () => {
        console.log("Adding product");
        console.log({selectedOption});
        console.log({productName});
        console.log({productDesc});
        console.log({price});
        // console.log({imageLocation});
        console.log({productInfo});
        console.log({manufacturer});
        console.log({manufacturerAddress});
        console.log({availableQuantity});
      };

      const handleProductOptionChange = e => {
        setSelectedOption(e.target.value);
      };

      const handleProductNameChange = e => {
        setProductName(e.target.value);
      };

      const handleProductDescChange = e => {
        setProductDesc(e.target.value);
      };

      const handlePriceChange = e => {
        setPrice(e.target.value);
      };

      const handleImageFileChange = e => {
        setImageFile(e.target.files[0]);
        console.log("file: ");
        console.log(imageFile);
      };

      const handleProductInfoChange = e => {
        setProductInfo(e.target.value);
      };

      const handleManufacturerChange = e => {
        setManufacturer(e.target.value);
      };

      const handleManufacturerAddressChange = e => {
        setManufacturerAddress(e.target.value);
      };

      const handleAvailableQuantityChange = e => {
        setAvailableQuantity(e.target.value);
      };

      const addProductSubmit = e => {
        e.preventDefault();
        logFields();
        if (productName === '' || productDesc === '' || price === '' 
            || productInfo ==='' || manufacturer === '' || manufacturerAddress === '') {
            setAddProductResponse('');
            alert("All fields are required!");
        } else {
            addProductToCatalogue();
        }     
      };

    const addProductToCatalogue = () => {
            /*let data = {
            productName: productName,
            productDesc: productDesc,
            price: price,
            imageFile: imageFile,
            productInfo: productInfo,
            manufacturer: manufacturer,
            manufacturerAddress: manufacturerAddress,
            availableQuantity: availableQuantity
        };
        */
        var data = new FormData();
        data.append("productName", productName);
        data.append("productDesc", productDesc);
        data.append("price", price);
        data.append("imageFile", imageFile);
        data.append("productInfo", productInfo);
        data.append("manufacturer", manufacturer);
        data.append("manufacturerAddress", manufacturerAddress);
        data.append("availableQuantity", availableQuantity);
        
        if (selectedOption === "apperals") {
            //axios.post('http://localhost:5001/apperals/addapperal', 
            axios.post(`${ADD_APPERAL_API_URL}`, 
                    data
                    //,{ headers: {'content-type': 'application/json'}}
                    //,{ headers: {'content-type': 'application/x-www-form-urlencoded'}}
                    //,{ headers: {'Content-Type': 'multipart/form-data;boundary=${form.getBoundary()}'}}
                    //,{ headers: data.getHeaders() }
                )
                .then((response) => {
                setAddProductResponse(response.data);
                console.log("Called webservice");
                console.log({addProductResponse});
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
        }
    };

    return (
        <div>
          <form onSubmit={addProductSubmit}>
            <div className="add-container" style={{backgroundColor: "#add8e6"}}>
                <label>
                    <input
                    type="radio"
                    value="apperals"
                    checked={selectedOption === "apperals"}
                    onChange={handleProductOptionChange}/>
                Apperals               
                </label>
                &nbsp;&nbsp;&nbsp;
                <label>
                    <input
                    type="radio"
                    value="sports"
                    checked={selectedOption === "sports"}
                    onChange={handleProductOptionChange}/>
                Sports Goods
                </label>
                <br />
                <br />
                <label>Product Name:&nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                    type="text" 
                    value={productName}
                    onChange={handleProductNameChange}/>
                </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label>Product Description:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                    type="text" 
                    value={productDesc}
                    onChange={handleProductDescChange}/>
                </label>
                <br/>
                <br/>
                <label>Price:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                    type="text" 
                    value={price}
                    onChange={handlePriceChange}/>
                </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label>Product Info:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                    type="text" 
                    value={productInfo}
                    onChange={handleProductInfoChange}/>
                </label>
                <br/>
                <br/>
                <label>Manufacturer:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                    type="text" 
                    value={manufacturer}
                    onChange={handleManufacturerChange}/>
                </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label>Manufacturer Address:&nbsp;&nbsp;
                    <input
                    type="text" 
                    value={manufacturerAddress}
                    onChange={handleManufacturerAddressChange}/>
                </label>
                <br/>
                <br/>
                <label>Available Quantity:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                    type="text" 
                    value={availableQuantity}
                    onChange={handleAvailableQuantityChange}/>
                </label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label>Image File:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input 
                    type="file"
                    accept="image/*"
                    //value={imageFile}
                    onChange={handleImageFileChange} />
                </label>
                <br/>
                <br/>
                <br/>
                
              <button type="submit">Add product</button>
            </div>
          </form>
          <div className="results-container" style={{backgroundColor: "#add8e6"}}>
            <div>
                {addProductResponse}
            </div>
          </div>
        </div>
        
    );
}
export default AddProduct;