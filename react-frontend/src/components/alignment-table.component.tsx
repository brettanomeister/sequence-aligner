import React from "react";
import {Table} from "react-bootstrap";
import AlignmentTableItem from "./alignment-table-item.component";
import axios from "axios";
import {Alignment} from "../models/alignment.interface";
import {useQuery} from "react-query";

async function getAlignments() {
    try {
        const response = await axios.get(`http://localhost:8000/api/alignments/`);
        return(response.data);
    } catch (error) {
        console.error(error);
    }
}

function AlignmentTable() {

  const [intervalMs, setIntervalMs] = React.useState(1000)
  const alignmentsQres = useQuery<Alignment[], Error>(
    'alignments',
    () => getAlignments(),
    {refetchInterval: intervalMs}
  );

  if (alignmentsQres.isLoading) {
    return(<span>Loading...</span>);
  }

  if (alignmentsQres.isError) {
    return(<span>Error: {alignmentsQres.error.message}</span>);
  }

  if (alignmentsQres.isIdle) {
    return(<span></span>)
  }

  if (alignmentsQres.isSuccess) {
    return (
      <Table striped bordered hover responsive>
        <thead>
        <tr>
          <th>#</th>
          <th>Run</th>
          <th>Protein Ref Seq</th>
          <th>Genome Ref Seq</th>
          <th>Start</th>
          <th>End</th>
        </tr>
        </thead>
        <tbody>
        {alignmentsQres.data.map((alignment) => {
          return <AlignmentTableItem alignment={alignment}/>
        })}
        </tbody>
      </Table>
    );
  }

  return (<span></span>);
}

export default AlignmentTable;