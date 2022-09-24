import { Col, Container, Row } from "react-bootstrap";
import ItemCard from "./ItemCard";

function ItemShelf(props) {
  return (
    <Container>
      <Row>
        {props.items.map((item) => (
          <Col>
            <ItemCard {...item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ItemShelf;
