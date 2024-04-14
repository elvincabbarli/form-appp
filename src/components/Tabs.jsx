import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import PersonalIno from "./PersonalIno";
import InterestsField from "./InterestsField";
import TextEditor from "./Editor";

function Tabs() {
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={2}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Məlumatlarım</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Maraq Sahələri</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="third">Bildirimlər</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="six">Post Paylaş</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fourth">Postların</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fifth">Takipçilər</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={10}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <PersonalIno />
              <InterestsField />
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <h1>Hi </h1>
            </Tab.Pane>
            <Tab.Pane eventKey="third">
              <h1>Third</h1>
            </Tab.Pane>
            <Tab.Pane eventKey="fourth">
              <h1>Fourth</h1>
            </Tab.Pane>
            <Tab.Pane eventKey="fifth">
              <h1>Fifth</h1>
            </Tab.Pane>
            <Tab.Pane eventKey="six">
              <TextEditor />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default Tabs;
