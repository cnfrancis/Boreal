import { useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useDispatchUser } from '../UserContext';


function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(true); // Even though it is not necessarily true the first time
    const [emptyFields, setEmptyFields] = useState(false);

    const dispatchUser = useDispatchUser();
    const setUser = (user) => {
        console.log("Dispatch user");
        dispatchUser({type: "SET", user})
    }

    const handleEmailChange = (email) => {
        setEmail(email);
        console.log(email);
    }

    const handlePasswordChange = (password) => {
        setPassword(password);
        console.log(password);
    }

    const handleSubmit = () => {

        if (email === "" && password === "" ) {setEmptyFields(true); return;}
        else {setEmptyFields(false);}

        fetch('http://localhost:3001/verifyUserAccountInfo/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(response => response.headers.get("Content-Length") > 0 && response.json())
            .then((data) => {
                if (data) {
                    setUser(data);
                    navigate('/');
                } 
                else setLoggedIn(false) 
            });
    }

    let navigate = useNavigate();

    return (
        <Container fluid style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

            <h1 onClick={() => {navigate('/')}} style={{textAlign: "center", margin: '50px', fontWeight:"bold"}}>BOREAL.ca</h1> 
            <Card style={{width: "400px", marginLeft: "auto", marginRight: "auto", top: '10%', outline: "solid"}}>
            
                <Card.Body>
                    <Card.Title style={{ textAlign: "center", fontSize: "36px" }}>Login</Card.Title>
                    <Form>
                        <Form.Group className="mb-3" style= {{fontWeight:"bold"}} controlId="formBasicEmail">
                            <Form.Label>E-mail address</Form.Label>
                            <Form.Control type="name" placeholder="Enter Your E-mail" onChange={(e) => handleEmailChange(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-0" style= {{fontWeight:"bold", paddingBottom: "25px"}} controlId="formBasicEmail">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Your Password" onChange={(e) => handlePasswordChange(e.target.value)} />
                        </Form.Group>
                    </Form>

                    {!loggedIn  && <p style={{color: 'red'}}>Wrong email or password. Please try again.</p>}
                    {emptyFields  && <p style={{color: 'red'}}>Please enter email and password.</p>}

                    <Button className= "mb-3" style={{width: "100%"}} variant="primary" type="submit" onClick={handleSubmit}>
                            Continue
                        </Button> 
                </Card.Body>
                
            </Card>
            <h2></h2>
            <Form.Group className="mb-0" style= {{textAlign: "center", fontWeight:"bold"}} controlId="formBasicEmail">
                <Form.Label>New to BOREAL?</Form.Label>
            </Form.Group>
            <Button variant="primary" style={{width: "400px", marginRight: "auto", marginLeft: "auto"}} type="submit" onClick={() => {navigate('/signup')}}>
                Create your BOREAL account
            </Button>
        </Container>
    );
}

export default LoginPage;