import {Accordion, ProgressBar} from "react-bootstrap";
import {AlignmentRun} from "../models/alignment-run.interface";

interface RunListItemProps {
  run: AlignmentRun;
}

function RunListItem({run}: RunListItemProps) {
  return (
    <Accordion.Item eventKey={run._id}>
      <Accordion.Header>
        {run.name} - Submitted: {run.submitted_at}
      </Accordion.Header>
      <Accordion.Body>
        {run.description}
        <ProgressBar now={Math.random()*100} />
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default RunListItem;