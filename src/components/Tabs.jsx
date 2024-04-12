import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { useSelector } from "react-redux";

function Tabs() {
  const { username, name, lastName, email } = useSelector(
    (state) => state.login
  );
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Məlumatlarım</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Maraq Sahələri</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <span>Name: </span> <b>{name}</b>
              <br />
              <span>Last Name: </span> <b>{lastName}</b>
              <span>Username: </span> <b>{username}</b> <br />
              <span>Email: </span> <b>{email}</b>
            </Tab.Pane>
            <Tab.Pane eventKey="second">Second tab content</Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default Tabs;
