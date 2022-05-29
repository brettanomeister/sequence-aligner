import RunAccordion from "./run-accordion.component";
import {Container, Col, Row} from "react-bootstrap";
import CreateRunButtonModal from "./create-run-modal.component";

function InProgressRuns() {
  return (
    <Container>
      <Row>
        <Col xs lg="1" />
        <Col md="8">
          <h2>In-Progress Runs</h2>
        </Col>
        <Col md="2" >
          <CreateRunButtonModal />
        </Col>
        <Col xs lg="1" />
      </Row>
      <Row>
        <Col xs lg="1" />
        <Col md="10">
          <RunAccordion />
        </Col>
        <Col xs lg="1" />
      </Row>
    </Container>
  );
}

export default InProgressRuns;
