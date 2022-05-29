import RunList from "./run-list.component";
import {Container, Col, Row} from "react-bootstrap";

function InProgressRuns() {
  return (
    <Container>
      <Row>
        <Col xs lg="1" />
        <Col md="10">
          <h2>In-Progress Runs</h2>
          <RunList />
        </Col>
        <Col xs lg="1" />
      </Row>
    </Container>
  );
}

export default InProgressRuns;
