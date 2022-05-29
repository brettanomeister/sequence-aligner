import {Alignment} from "../models/alignment.interface";

interface AlignmentListItemProps {
  alignment: Alignment;
}

function AlignmentListItem({alignment}: AlignmentListItemProps) {
  return (
    <tr>
      <td>{alignment._id}</td>
      <td>{alignment.alignment_run_id}</td>
      <td>{alignment.protein_ref_seq}</td>
      <td>{alignment.genome_ref_seq}</td>
      <td>{alignment.matched_fragment}</td>
      <td>{alignment.start_position}</td>
      <td>{alignment.end_position}</td>
    </tr>
  );
}

export default AlignmentListItem;
