import { Button, Image, Table, Container } from 'react-bootstrap';
import Navigation from '../Layout/Navigation';
import { useNavigate } from "react-router-dom";
import '../Page Styles/ShoppingCartPage.css';
import { useUser } from '../UserContext';
import { useCart, useDispatchCart } from '../Cart';
import { useState, useEffect } from 'react';


function MyProductsPage(props) {
    
    let navigate = useNavigate();
    const user = useUser();
    const cart = useCart();
    const dispatchCart = useDispatchCart();
    const [myProducts, setMyProducts] = useState([]);

    const handleDeleteProduct = (product) => {

        fetch('http://localhost:3001/deleteProduct', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                product
            )});

        if(window.confirm('Are you sure would like to delete?\nEither OK or Cancel.'))
            navigate('/');
    }

    useEffect(() => {
        fetch('http://localhost:3001/retrieveProducts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                user
            )
        })
            .then(response =>  response.json() )
                .then(data => setMyProducts(data));
    }, []);

    return (
        <>
        <Navigation />
            <Container> 
            <h1 onClick={() => { navigate('/') }} style={{ textAlign: "center", marginTop: '2%', fontWeight: "bold" }}>BOREAL.ca</h1> 
                <h2 className="cart-title">My Products</h2>
                <h5 className='text-primary'>Here is a list of all the products you're selling.</h5>
                <Table responsive>

                    <thead>
                        <tr>
                            <th><h4>Item</h4></th>
                            <th className="price"><h4>Price</h4></th>
                            <th><h4></h4></th>
                        </tr>
                        {
                            // Each item from cart is displayed into the shopping cart page
                            myProducts.map((item) => {
                                return (
                                    <tr>
                                    <th>
                                    <div className="float-start row flex-wrap main-content">
                                        <Image className="item-image align-items-center" src={item.img} responsive />
                                        <h5 className="col-md-6">{item.title}</h5>
                                    </div>
                                    </th>
                                    <th className="price align-top"><h5>${item.price}</h5>
                                    </th>
                                    <th className="align-middle"><Button onClick={() => handleDeleteProduct(item)} variant="danger" >Delete Product</Button></th>
                                    </tr>     
                                )
                            })
                        }
                    </thead>
                </Table>
            </Container>
        </>
    )
}
export default MyProductsPage;