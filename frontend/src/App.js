import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useCart } from "./Components/Cart";

import HomePage from "./Components/Pages/HomePage";
import SignUpPage from "./Components/Pages/SignUpPage";
import LoginPage from "./Components/Pages/LoginPage";
import ItemDetailsPage from "./Components/Pages/ItemDetailsPage";
import ManageProfilePage from "./Components/Pages/ManageProfilePage";
import ShoppingCartPage from "./Components/Pages/ShoppingCartPage";
import CustomerOrdersPage from "./Components/Pages/CustomerOrdersPage";
import AddItemForm from "./Components/Pages/AddItemForm";
import MyProductsPage from "./Components/Pages/MyProductsPage";
import UsersList from "./Components/Pages/UsersList";

function App() {
  
  const [allProducts, setAllProducts] = useState(null);

  useEffect(() => {
      fetch('http://localhost:3001/getAllProducts')
          .then(response =>  response.json() )
              .then(data => setAllProducts(data));
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ allProducts ? <HomePage items={allProducts} /> : <Spinner animation="border" variant="primary" /> } />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/editprofile" element={<ManageProfilePage/>}/>
          <Route path="/cartpage" element={<ShoppingCartPage />}/>
          <Route path="/myorders" element={<CustomerOrdersPage />}/>
          <Route path="/additemform" element={<AddItemForm/>}/>
          <Route path="/myproducts" element={<MyProductsPage />}/>
          {allProducts && allProducts.map((item) =>
            <Route path={'/item' + item._id} element={<ItemDetailsPage item={item} {...item} />} />
          )}
          <Route path="/userslist" element={<UsersList />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;