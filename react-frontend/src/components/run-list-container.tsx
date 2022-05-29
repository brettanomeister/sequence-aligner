import {Accordion, Col, Container, Row} from "react-bootstrap";
import RunListItem from "./run-list-item";

function RunListContainer() {
  return (
    <div>
      <Container>
        <Row>
          <Col xs lg="2" />
          <Col md="auto">
      <h2>Runs</h2>

      <Accordion defaultActiveKey={['0', '1']} alwaysOpen>
        <RunListItem />
      </Accordion>
            </Col>
          <Col xs lg="2" />
          </Row>
        </Container>
    </div>
  );
}

export default RunListContainer;
