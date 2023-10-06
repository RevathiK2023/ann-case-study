import React, { useState } from "react";
import './SearchGeneric.css';
import SearchResults from './SearchResults'
import AddProduct from './AddProduct'
import axios from 'axios';
import { SEARCH_ALL_APPERAL_API_URL } from '../../Constants'
import { SEARCH_TEXT_APPERAL_API_URL } from '../../Constants'

function SearchGeneric() {

  const [selectedOption, setSelectedOption] = useState("apperals");
  const [searchAllProducts, setSearchAllProducts] = useState(false);
  const [isSearchTextDisabled, setIsSearchTextDisabled] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  
  const logFields = () => {
    console.log("Hello World");
    console.log({selectedOption});
    console.log({searchAllProducts});
    console.log({searchText});
  };

  const handleProductOptionChange = e => {
    setSelectedOption(e.target.value);
    setSearchAllProducts(false);
    setSearchText('');
    setIsSearchTextDisabled(false);
  };

  const handleSearchOptionChange = e => {
    setSearchAllProducts(e.target.checked);
   
    if (e.target.checked === true) {
      setSearchText('');
      setIsSearchTextDisabled(true);
    } else {
      setIsSearchTextDisabled(false);
    }

  };

  const handleSearchCriteriaChange = e => {
    setSearchText(e.target.value);
  };

  const formSubmit = e => {
    e.preventDefault();
    setSearch(true);
    setAddProduct(false);
    logFields();
    performSearch();
    //setSearchResults(SearchResults(selectedOption, searchAllProducts, searchText));
  };

  const addProductToCatalogue = e => {
    e.preventDefault();
    console.log("Clicked Add to catalogue");
    setSearch(false);
    setAddProduct(true);
    //document.getElementById("resultsandinput").innerHTML = <AddProduct />;
  };

  const getSearchProductByTextUrl = (text) => {
    //let urlPath = apperalServiceURL + "/apperals/" + productId;
    let urlPath = `${SEARCH_TEXT_APPERAL_API_URL}` + text;
    return urlPath;    
};

  const performSearch = () => {
    if (selectedOption === "apperals" && searchAllProducts === true) {
      axios.get(`${SEARCH_ALL_APPERAL_API_URL}`)
      //axios.get('http://localhost:5001/apperals/search-all')
        .then((response) => {
          setSearchResults(response.data);
          console.log("Called webservice");
          console.log(searchResults);
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
    } else if (selectedOption === "apperals" && searchText !== '') {
      axios.get(getSearchProductByTextUrl(searchText))
      //axios.get('http://localhost:5001/apperals/search/{text}')
        .then((response) => {
          setSearchResults(response.data);
          console.log("Called webservice");
          console.log(searchResults);
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
    } else {
      alert("Search options required!");
    }
  };
    
    return (
      <div>
        <form onSubmit={formSubmit}>
          <div className="search-container" style={{backgroundColor: "#37BC9B"}}>
              Search for:
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
              <label> Search all products:
                  <input
                  type="checkbox"
                  checked={searchAllProducts === true}
                  onChange={handleSearchOptionChange}/>
              </label>
              &nbsp;&nbsp;&nbsp;
              <label> Search for:&nbsp;&nbsp;
                  <input
                  type="text" disabled={isSearchTextDisabled}
                  value={searchText}
                  onChange={handleSearchCriteriaChange}/>
              </label>
              &nbsp;&nbsp;&nbsp;
              <button type="submit">Search</button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button onClick={addProductToCatalogue}>Add product to catalogue</button>
          </div>
        </form>
        <div id = "resultsandinput" className="results-container" style={{backgroundColor: "#add8e6"}}>
          {search ? (<SearchResults searchResults={searchResults}/>)
                  : (<p></p>)
          }
          {addProduct ? (<AddProduct />)
                  : (<p></p>)
          }
        </div>
      </div>
      
    );
  }


export default SearchGeneric;