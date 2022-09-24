import { Button, Card, Container, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from '../UserContext';

function AddItemForm() {

    let navigate = useNavigate();
    const user = useUser();
    const seller_id = user._id;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [img, setImg] = useState("");

    const [error, setError] = useState(false);
    

    const handleUploadImage = async(e) =>{
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setImg(base64);
        console.log(base64);
    };

    const convertBase64=(file)=>{
        return new Promise((resolve, reject)=>{
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = ()=>{
                resolve(fileReader.result);
            };
            fileReader.onerror = (error)=>{
                reject(error);
            };
        });
    };

    const handleTitleChange = (title) =>{
        setTitle(title);
        console.log(title);
    }
    const handleDescriptionChange = (description) =>{
        setDescription(description);
        console.log(description);
    }
    const handlePriceChange = (price) =>{
        setPrice(price);
        console.log(price);
    }


    const handlePlaceOrder = async (event) => {
        event.preventDefault();

        try {
            let res = await fetch("http://localhost:3001/addProduct", {
            method: "POST",
            mode: "cors",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title, 
                description, 
                price, 
                img,
                seller_id
                }),
            });
            let resJson = await res.json();
            if (res.status === 200) {
                navigate('/');
            } else {
                // TODO: show an error message
            }
        } catch (err) {
            setError(true);
            console.log(err);
        }
    };

    return (
        <Container fluid style={{ display: 'flex', justifyContent: 'center' }}>
            
            <h1 onClick={() => {navigate('/')}} style={{marginTop: '4%', fontWeight:"bold"}}>BOREAL.ca</h1> 
            <Card style={{ width: '400px', position: 'absolute', top: '15%', outline: "solid" }}>
            
                <Card.Body>
                    <Card.Title style={{ textAlign: "center" }}>Add a Product</Card.Title>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Product title</Form.Label>
                            <Form.Control placeholder="Enter product's title" onChange={(e) => handleTitleChange(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control placeholder="Enter product's description" onChange={(e) => handleDescriptionChange(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control placeholder="Enter product's price" onChange={(e) => handlePriceChange(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Upload an Image</Form.Label>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <input type="file" onChange={(e) => {
                                handleUploadImage(e);
                            }}
                            />
                        </Form.Group>

                        { error && <div style={{color: 'red'}}>An error occured. Your file may be too large. Please, try again.</div> }

                        <div className='d-grid'>
                            <Button disabled={ !title || !description || !price || !img } variant="primary" type="submit" onClick={handlePlaceOrder}>Place Product for Sale</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default AddItemForm;