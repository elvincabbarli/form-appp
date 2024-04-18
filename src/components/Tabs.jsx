import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import { Link, Outlet } from "react-router-dom";

function Tabs() {
  return (
    <>
      {" "}
      <Row>
        <Col sm={2}>
          <Nav>
            <Nav.Item>
              <Link to="/profile/personal">Məlumatlarım</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/profile/myinterests">Maraq Sahələri</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/profile/notifications">Bildirimlər</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/profile/addpost">Post Paylaş</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/profile/myposts">Postların</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/profile/followers">Takipçilər</Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
      <Outlet />
    </>
  );
}

export default Tabs;
