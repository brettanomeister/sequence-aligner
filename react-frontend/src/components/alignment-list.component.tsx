import {Table} from "react-bootstrap";
import AlignmentListItem from "./alignment-list-item.component";
import {Alignment} from "../models/alignment.interface";

function AlignmentList() {
  const demoAlignments: Alignment[] = [
    {
      _id: "9936",
      alignment_run_id: "3825",
      protein_ref_seq: "NP_2346",
      genome_ref_seq: "NC_99846",
      matched_fragment: "gattacac",
      start_position: 0,
      end_position: 7
    },
    {
      _id: "9937",
      alignment_run_id: "3825",
      protein_ref_seq: "NP_2300",
      genome_ref_seq: "NC_99846",
      matched_fragment: "gcattaca",
      start_position: 2,
      end_position: 8
    }
  ]

  return (
    <Table striped bordered hover>
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
        return <AlignmentListItem alignment={alignment} />
      })}
      </tbody>
    </Table>
  );
}

export default AlignmentList;
