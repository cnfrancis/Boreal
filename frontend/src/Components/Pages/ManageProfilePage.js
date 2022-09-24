import { useState } from 'react';
import { Button, Card, Container, Form, Stack } from 'react-bootstrap';
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from '../UserContext';


function ManageProfilePage() {

    let navigate = useNavigate();
    const location = useLocation();
    const myAccount = useUser();
    
    const currentUserInfo = location.state ? location.state : myAccount;
    const [_id] = useState(currentUserInfo._id);
    const [full_name, setName] = useState(currentUserInfo.full_name);
    const [email, setEmail] = useState(currentUserInfo.email);
    const [password, setPassword] = useState(currentUserInfo.password);
    const [home_address, setAddress] = useState(currentUserInfo.home_address);
    const [phone_number, setPhone] = useState(currentUserInfo.phone_number);
    const [gender, setGender] = useState(currentUserInfo.gender);
    const [account_type, setAccountType] = useState(currentUserInfo.account_type);


    const handleSaveChanges = async (event) => {
        event.preventDefault();

        try {
            let res = await fetch("http://localhost:3001/updateUserAccountInfo", {
            method: "POST",
            mode: "cors",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                _id,
                full_name,
                email,
                password,
                home_address,
                phone_number,
                gender,
                account_type
                }),
            });
         
            if (res.status === 200) {
                setName(full_name);
                setEmail(email);
                setPassword(password);
                setAddress(home_address);
                setPhone(phone_number);
                setGender(gender);
                setAccountType(account_type);

                // TODO: User created successfully, redirect to correct page here
            } else {
                // TODO: User creation error, show an error message
            }
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <Container fluid style={{ display: 'flex', justifyContent: 'center' }}>


            <h1 onClick={() => { navigate('/') }} style={{ textAlign: "center", marginTop: '2%', fontWeight: "bold" }}>BOREAL.ca</h1>

            <Card style={{ width: '35rem', position: 'absolute', top: '12%', outline: "solid" }}>
                <h3 style={{ textAlign: "center" }}>Edit Account Information</h3>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-2" controlId="formBasicName">
                            <Form.Label>Full Name</Form.Label>

                            <Form.Control type="name" value={full_name} onChange={(e) => setName(e.target.value)} placeholder={full_name} />
                        </Form.Group>

                        <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={email} />
                        </Form.Group>


                        <Form.Group className="mb-2" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={password} />
                        </Form.Group>

                        <Form.Group className="mb-2" controlId="formBasicAddress">
                            <Form.Label>Home Address</Form.Label>
                            <Form.Control type="home_address" value={home_address} onChange={(e) => setAddress(e.target.value)} placeholder={home_address} />
                        </Form.Group>

                        <Form.Group className="mb-2" controlId="formBasicNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="phone_number" value={phone_number} onChange={(e) => setPhone(e.target.value)} placeholder={phone_number} />
                        </Form.Group>

                        <Form.Group className="mb-2" controlId="formBasicGender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select value={gender} onChange={(e) => setGender(e.target.value)}>
                                <option>Female</option>
                                <option>Male</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-2" controlId="formBasicAccount">
                            <Form.Label>Account Type</Form.Label>
                            <Form.Select value={account_type} onChange={(e) => setAccountType(e.target.value)}>
                                <option>Customer</option>
                                <option>Seller</option>
                                {myAccount.account_type === 'Admin' && <option>Admin</option>}
                             </Form.Select>
                        </Form.Group>
                       
                        <Form.Group className="mb-4" controlId="formBasicChange">
                        </Form.Group>
                    </Form>
                    <div className='d-grid'>
                            <Button variant="primary" type="submit" onClick={handleSaveChanges}>
                                Save Changes
                            </Button>   
                        </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ManageProfilePage;
