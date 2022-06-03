import {Accordion} from "react-bootstrap";
import {AlignmentRun} from "../models/alignment-run.interface";

interface RunAccordionItemProps {
  run: AlignmentRun;
}

function RunAccordionItem({run}: RunAccordionItemProps) {
  return (
    <Accordion.Item eventKey={run.pk.toString()}>
      <Accordion.Header>
        Run Id: {run.pk} - {run.name}
      </Accordion.Header>
      <Accordion.Body>
        Description: {run.description}
        <br/>
        Query Sequence: {run.query}
        <br/>
        Submitted: {run.submitted_at}
        <br/>
        Completed: {run.completed_at}
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default RunAccordionItem;