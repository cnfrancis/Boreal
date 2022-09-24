import { Button, Image, Table, Container } from 'react-bootstrap';
import Navigation from '../Layout/Navigation';
import { useNavigate } from "react-router-dom";
import '../Page Styles/ShoppingCartPage.css';
import { useUser } from '../UserContext';
import { useCart, useDispatchCart } from '../Cart';


function ShoppingCartPage(props) {
    
    let navigate = useNavigate();
    const user = useUser();
    const cart = useCart();
    const dispatchCart = useDispatchCart();

    const handlePlaceOrder = async (event) => {
        event.preventDefault(); 
        const customer_id = user._id;    
        const products = cart;
        try {
            let res = await fetch("http://localhost:3001/sendOrder", {
            method: "POST",
            mode: "cors",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                //No Id so it can create a new one every time its added to database  
                customer_id,
                products
            })
        });
            if (res.status === 200) {
                alert("Order placed successfully.");
                dispatchCart({type: "REMOVEALL"});
                navigate('/');
            } else {

            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleRemove = (index) => {
        console.log(index);
        dispatchCart({type: "REMOVE", index});
    };

    return (
        <>
        <Navigation />
            <Container> 
            <h1 onClick={() => { navigate('/') }} style={{ textAlign: "center", marginTop: '2%', fontWeight: "bold" }}>BOREAL.ca</h1> 
                <h2 className="cart-title">Shopping Cart</h2>
                <Table responsive>

                    <thead>
                        <tr>
                            <th><h4>Item</h4></th>
                            <th className="price"><h4>Price</h4></th>
                            <th><h4></h4></th>
                        </tr>
                        {
                            // Each item from cart is displayed into the shopping cart page
                            cart.map((item) => {
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
                                    <th className="align-middle"><Button variant="danger" onClick = {() => handleRemove(cart.indexOf(item))}>X</Button></th>
                                    </tr>     
                                )
                            })
                        }
                    </thead>
                </Table>
                <Button variant={user ? "primary": "secondary"} style={{ marginBottom: "20px", float: 'right'}} type="submit" onClick={user ? handlePlaceOrder : () => alert("Please log in to place order.")}>Place Order</Button>
            </Container>
        </>
    )
}
export default ShoppingCartPage;