import { useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatchCart } from './Cart';



function ItemCard(props) {

  const [isHovering, setHover] = useState(false);

  // Handle adding items to cart using dispatch (state modifier)
  const dispatch = useDispatchCart();
  const addToCart = (item) => {
      console.log(item);
      dispatch({type: "ADD", item});
  }

  let navigate = useNavigate();

  const toggleHover = () => {
    setHover(!isHovering);
  };

  return (
    <Container>
      <Card
        style={{ width: "18rem", margin: "10%" }}
        onDoubleClick={() => {
          navigate("/item" + props._id);
        }}
      >
        <Card.Img variant="top" src={props.img} />
        <Card.Body>
          <Card.Title
            onClick={() => {
              navigate("/item" + props._id);
            }}
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
            style={{ color: isHovering ? "red" : "" }}
          >
            <b>{props.title}</b>
          </Card.Title>
          <Card.Text>{props.description}</Card.Text>
          <Card.Footer>Price : ${props.price}</Card.Footer>
          <Button
            class="addToCartBtn"
            variant="primary"
            style={{ marginTop: "10px" }}
            onClick = {() => addToCart(props)}
          >
            Add to cart
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ItemCard;
