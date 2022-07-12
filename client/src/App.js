import { useContext } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/esm/NavbarBrand";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProductScreen from "./screens/ProductScreen";
import HomeScreen from "./screens/HomeScreen";
import { Store } from "./Store/Store";
import CartScreen from "./screens/CartScreen";
import SignInScreen from "./screens/SignInScreen";
import ShippingAddress from "./screens/ShippingAddressScreen";
import SignUpScreen from "./screens/SignUpScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const handleSignOut = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userinfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
  };
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <NavbarBrand>H2SHOP</NavbarBrand>
              </LinkContainer>
              <Nav className="me-auto">
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">
                    SignIn
                  </Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SignInScreen />} />
              <Route path="/signup" element={<SignUpScreen />} />
              <Route path="/shipping" element={<ShippingAddress />} />
              <Route path="/payment" element={<PaymentMethodScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
