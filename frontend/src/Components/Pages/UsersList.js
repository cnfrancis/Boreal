import { Button, Container, Spinner,  } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from '../UserContext';
import Navigation from '../Layout/Navigation';

function UsersList() {

    let navigate = useNavigate();
    const [allUsers, setAllUsers] = useState([]);

    const handleDeleteUser = (user) => {

        fetch('http://localhost:3001/deleteUser', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                user
            )});

        if(window.confirm('Are you sure would like to delete?\nEither OK or Cancel.'))
            navigate('/');
    }


    useEffect(() => {
        fetch('http://localhost:3001/getAllUsers')
            .then(response =>  response.json() )
                .then(data => {
                    setAllUsers(data);
                });
    }, []);
    
    return(
        <>
            <Navigation />
                <Container> 
                <h1 onClick={() => { navigate('/') }} style={{ textAlign: "center", marginTop: '2%', fontWeight: "bold" }}>BOREAL.ca</h1> 
                    <h2>List of Users</h2>
                    <hr style={{marginBottom: '2%'}}></hr>
                    <table>

                            <tr>
                                <th><h4>Name</h4></th>
                                <th><h4>Email</h4></th>
                                <th><h4>Account Type</h4></th>
                                <th><h4></h4></th>
                            </tr>
                            {
                                // Each item from cart is displayed into the shopping cart page
                                allUsers.map((user) => {
                                    return (
                                        <tr>
                                            <td>
                                                <h6>{user.full_name}</h6>
                                            </td>
                                            <td>
                                                <h6>{user.email}</h6>
                                            </td>
                                            <td>
                                                <h6 style={{width: "200px"}}>{user.account_type}</h6>
                                            </td>
                                            <td>
                                                <Button disabled={user.account_type == 'Admin'} variant="warning" size='sm' onClick={() => navigate('/editprofile', {state: user})}>Edit</Button>
                                            </td>
                                            <td>
                                                <Button disabled={user.account_type == 'Admin'} variant="danger" size='sm' style={{borderRadius: "100%"}} onClick={() => handleDeleteUser(user)}>X</Button>
                                            </td>
                                        </tr>   
                                          
                                    )
                                })}    
                    </table>
                </Container>
            </>
    );
}

export default UsersList;