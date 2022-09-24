import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar, Button } from "react-bootstrap";
import { useCart } from "../Cart";
import { Link } from "react-router-dom";
import { useUser } from "../UserContext";


function Navigation() {

  const userState = useUser();

  const items = useCart();

  return (
    <Navbar bg="light" expand="sm">
      <Navbar.Brand as={Link} to="/">Boreal.ca</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          { userState &&  <Nav.Link as={Link} to="/editprofile">Manage My Profile</Nav.Link> }
          { userState && userState.account_type == 'Seller' && <Nav.Link as={Link} to={"/additemform"}>Add Product</Nav.Link> }
          { userState && userState.account_type == 'Admin' && <Nav.Link as={Link} to={"/userslist"}>List of Users</Nav.Link> }
        </Nav>
        <Nav>
          { userState && userState.account_type == 'Seller' && <Nav.Link as={Link} to={"/myproducts"}>My Products</Nav.Link> }
          { userState && <Nav.Link as={Link} to="/myorders">My Orders</Nav.Link> }
          <Nav.Link as={Link} to="/cartpage">Cart({(items && items.length) ? items.length : '0'})</Nav.Link>
          { !userState &&  <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link> }
          { !userState && <Nav.Link as={Link} to="/login">Log In</Nav.Link> }
          { userState && <Nav.Link href="/">Log Out</Nav.Link> }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
