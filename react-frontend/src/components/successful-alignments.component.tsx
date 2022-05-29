import AlignmentTable from "./alignment-table.component";
import {Container, Col, Row} from "react-bootstrap";

function SuccessfulAlignments() {
  return (
    <Container>
      <Row>
        <Col>
          <h2>Successful Alignments</h2>
          <AlignmentTable />
        </Col>
      </Row>
    </Container>
  );
}

export default SuccessfulAlignments;
