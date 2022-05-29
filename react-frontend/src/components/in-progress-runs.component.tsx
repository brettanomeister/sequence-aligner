import RunAccordion from "./run-accordion.component";
import {Container, Col, Row} from "react-bootstrap";

function InProgressRuns() {
  return (
    <Container>
      <Row>
        <Col xs lg="1" />
        <Col md="10">
          <h2>In-Progress Runs</h2>
          <RunAccordion />
        </Col>
        <Col xs lg="1" />
      </Row>
    </Container>
  );
}

export default InProgressRuns;
