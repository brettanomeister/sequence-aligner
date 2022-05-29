import AlignmentList from "./alignment-list.component";
import {Container, Col, Row} from "react-bootstrap";

function SuccessfulAlignments() {
  return (
    <Container>
      <Row>
        <Col>
          <h2>Successful Alignments</h2>
          <AlignmentList />
        </Col>
      </Row>
    </Container>
  );
}

export default SuccessfulAlignments;
