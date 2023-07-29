import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <>
      <Container>
        <Row className="mt-3 mb-3">
          <Col>
            <div className="text-center">
              <p>Copyright©: Luis Torres 2023.</p>
            </div>
            <div className="text-center">
              <p>
                Todos los datos de esta app son suministrados por:
                <a href="https://developer.marvel.com/" target="_blank">
                  Marvel®
                </a>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Footer;
