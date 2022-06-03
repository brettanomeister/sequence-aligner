import React from "react";
import {Accordion} from "react-bootstrap";
import RunAccordionItem from "./run-accordion-item.component";
import {AlignmentRun} from "../models/alignment-run.interface";
import axios from "axios";
import {useQuery} from "react-query";

async function getAlignmentRuns() {
  try {
    const response = await axios.get(`http://${process.env.REACT_APP_DOMAIN}:8000/api/alignment-runs/`);
    return(response.data);
  } catch (error) {
    console.error(error);
  }
}

function RunAccordion() {

  const [intervalMs, setIntervalMs] = React.useState(1000)
  const runsQres = useQuery<AlignmentRun[], Error>(
    'runs',
    () => getAlignmentRuns(),
    {refetchInterval: intervalMs});

  if (runsQres.isLoading) {
    return(<span>Loading...</span>);
  }

  if (runsQres.isError) {
    return(<span>Error: {runsQres.error.message}</span>);
  }

  if (runsQres.isIdle) {
    return(<span></span>)
  }

  if (runsQres.isSuccess) {
    return (
      <Accordion defaultActiveKey={runsQres.data?.flatMap(run => run.pk.toString())} alwaysOpen>
        {runsQres.data.map((run) => {
          return <RunAccordionItem run={run}/>;
        })}
      </Accordion>
    );
  }

  return(<span></span>);
}

export default RunAccordion;
