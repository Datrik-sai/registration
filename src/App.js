import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import Header from './components/shared/Header/header.component';
import Footer from './components/shared/Footer/footer.component';
import Register from './components/Register/register.component';
import RegistrationForm from './components/Register/registration';
import Checkout from "./components/Register/Checkout";

function App() {
  return (
    // <Container>
    //   {/* <Row>
    //     <Col>
    //       <Header />
    //     </Col>
    //   </Row> */}

    //   <Row>
    //     <Col md={4}>
    //       <Checkout />
    //     </Col>
    //   </Row>

    //   {/* <Row>
    //     <Col>
    //       <Footer />
    //     </Col>
    //   </Row> */}
    // </Container>
    <div>
      <Checkout/>
    </div>
  );
}

export default App;
