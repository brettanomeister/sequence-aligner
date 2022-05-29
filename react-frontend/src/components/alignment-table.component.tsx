import {Table} from "react-bootstrap";
import AlignmentTableItem from "./alignment-table-item.component";
import axios from "axios";
import {Alignment} from "../models/alignment.interface";
import {useQuery} from "react-query";

async function getAlignments() {
    try {
        const response = await axios.get(`http://localhost:8000/api/alignment-runs/`);
        return(response.data);
    } catch (error) {
        console.error(error);
    }
}

function AlignmentTable() {
  const demoAlignments: Alignment[] = [
    {
      pk: 9936,
      alignment_run_id: "3825",
      protein_ref_seq: "NP_2346",
      genome_ref_seq: "NC_99846",
      matched_fragment: "gattacac",
      start_position: 0,
      end_position: 7
    },
    {
      pk: 9937,
      alignment_run_id: "3825",
      protein_ref_seq: "NP_2300",
      genome_ref_seq: "NC_99846",
      matched_fragment: "gcattaca",
      start_position: 2,
      end_position: 8
    }
  ]

  const alignmentsQres = useQuery<Alignment[], Error>('alignments', () => getAlignments());

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
          <th>Alignment Run</th>
          <th>Protein Ref Seq</th>
          <th>Genome Ref Seq</th>
          <th>Matched Fragment</th>
          <th>Start</th>
          <th>End</th>
        </tr>
        </thead>
        <tbody>
        {demoAlignments.map((alignment) => {
          return <AlignmentTableItem alignment={alignment}/>
        })}
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