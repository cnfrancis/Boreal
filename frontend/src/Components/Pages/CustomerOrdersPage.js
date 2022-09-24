import { useState, useEffect } from 'react';
import { Card, Container, Form, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from "react-router-dom";
import Navigation from "../Layout/Navigation";
import { useUser } from '../UserContext';


function CustomerOrdersPage(props) {
    const user = useUser();
    const [myOrders, setMyOrders] = useState([]);
    const navigate = useNavigate();

    const handleDeleteOrder = (order) => {

        fetch('http://localhost:3001/deleteOrder', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                order
            )});

        if(window.confirm('Are you sure would like to delete?\nEither OK or Cancel.'))
            navigate('/');
    }

    useEffect(() => {
        fetch('http://localhost:3001/retrieveOrder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                user
            )
        })
            .then(response =>  response.json() )
                .then(data => {
                    setMyOrders(data); 
                });

    }, []);
    

    return (
    <>
    <Navigation />
    <div style={{backgroundColor: '#DDD', width: '100%', height: '1000px', zIndex: '1', position: 'fixed'}}/>
    <Container fluid style={{justifyContent: 'center', zIndex: '2' , position: 'fixed', marginTop: '40px'}}>
        <Card style={{width: "1000px", marginLeft: "auto", marginRight: "auto", top: '10%'}}>
        
            <Card.Body>
                <Card.Title style={{fontSize: "36px" }}>My Orders</Card.Title>
                <Form>
                    <table>
                        <thead>
                            <tr>
                                <th style={{width: "200px"}}></th>
                                <th style={{width: "500px"}}></th>
                                <th style={{textAlign: "center", width: "120px"}}>Price</th>
                            </tr>
                        </thead>    
                    </table>

                    {
                    myOrders.map((order) =>
                        <>
                        <hr style={{width: "", height: "3px"}}></hr>
                    <table>
                        <tbody>
                            <tr>
                                <td style={{width: "200px"}}>
                                    <img src="https://www.pinclipart.com/picdir/big/50-507353_online-shopping-for-gifts-mulboo-online-shopping-png.png" style={{width: "200px"}}></img>
                                </td>
                                <td style={{width: "500px",padding: "20px", borderStyle: "solid" }}><b>Items ordered: </b>{order.products.map((product) => product.title).join()}
          

                                 <br/>
                                 </td>
                                <td style={{textAlign: "center", width: "120px"}}>${order.products.map((product) => parseFloat(product.price)).reduce((partialSum, a) => partialSum + a, 0)} CAD</td> 
                                <td><Button onClick={() => handleDeleteOrder(order)} variant="warning">Cancel Order</Button></td>
                            </tr>
                        </tbody>
                    </table>
                    </>) 

                    
                    
                    
                    }
                </Form>
            </Card.Body>
        </Card>
    </Container>
        
    </>
    
  );
}

export default CustomerOrdersPage;

