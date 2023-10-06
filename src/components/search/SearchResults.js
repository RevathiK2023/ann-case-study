import React from "react";
import axios from 'axios';
import { GET_APPERAL_API_URL } from '../../Constants'

function SearchResults(props) {
    //let imagePath = "https://media.gettyimages.com/id/471188329/photo/plain-red-tee-shirt-isolated-on-white-background.jpg?s=612x612&w=gi&k=20&c=RGOHoV-pQqfvG3gMgKpa4PNbV5gUJPY3SniV1ao9yGM=";
    //const apperalServiceURL = "http://localhost:5001/apperals";

    const getProductUrl = (productId) => {
         //let urlPath = apperalServiceURL + "/apperals/" + productId;
        let urlPath = `${GET_APPERAL_API_URL}` + productId;
        return urlPath;    
    };

    const searchProduct = (element) => {
        let url = getProductUrl(element.productId);
        let formattedData = '';

          axios.get(url)
            .then((response) => {
                console.log("Called webservice for product");
                console.log(response.data);
                formattedData =  formatProductData(element, response.data);
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
        return formattedData;
    };

    const formatProductData = (product, data) => {
        return (
            //<html>
            //    <body>
            <div>
                <h2>product.productName</h2>
                <img src={product.imageLocation} width="100" height={100}/><br/>
                <h3>Product Information</h3>
                {data.productInfo}
                <h3>Manufacturer</h3>
                {data.manufacturer}
                <h3>Available Quantity</h3>
                {data.availableQuantity}
            </div>
            //</body>
            //</html>
        );
    };

    const listItems = props.searchResults.map(
        (element) => {
            let imagedata = 'data:image/*;base64,' + element.image;
            return (
                
                <tr>
                    <td style={{fontWeight: 'bold', color: 'red'}}>
                    <img src={imagedata} width="100" height={100}/><br/>
                        {element.productName}<br/>
                        Price: Rs. {element.price}<br/><br/>
                    </td>
                    <td>
                        <button role="link" onClick={() =>  window.open(getProductUrl(element.productId))} >
                            View Product Details
                        </button>
                    </td>
                </tr>
                
            )
        }
    )
    return (
        <div>
            <table><tbody>
                {listItems}
            </tbody></table>
        </div>
    );

    
}


export default SearchResults;