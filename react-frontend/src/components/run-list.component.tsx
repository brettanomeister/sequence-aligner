import {Accordion} from "react-bootstrap";
import RunListItem from "./run-list-item.component";
import {AlignmentRun} from "../models/alignment-run.interface";

function RunList() {
  const demoRuns: AlignmentRun[] = [
      {
        _id: "3825",
        name: "test run",
        description: "Lorem ipsum dolor set",
        query: "gattaca",
        submitted_at: "05-29-2022"
      },
      {
        _id: "3826",
        name: "test run",
        description: "Lorem ipsum dolor set",
        query: "gattaca",
        submitted_at: "05-29-2022"
      }
    ]

  return (
      <Accordion defaultActiveKey={demoRuns.flatMap(run => run._id)} alwaysOpen>
        {demoRuns.map((run, index) => {
          return <RunListItem run={run} />;
        })}
      </Accordion>
  );
}

export default RunList;
