import {Accordion, ProgressBar} from "react-bootstrap";
import {AlignmentRun} from "../models/alignment-run.interface";

interface RunAccordionItemProps {
  run: AlignmentRun;
}

function RunAccordionItem({run}: RunAccordionItemProps) {
  return (
    <Accordion.Item eventKey={run.pk.toString()}>
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

export default RunAccordionItem;