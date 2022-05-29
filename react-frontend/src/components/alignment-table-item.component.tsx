import {Alignment} from "../models/alignment.interface";

interface AlignmentTableItemProps {
  alignment: Alignment;
}

function AlignmentTableItem({alignment}: AlignmentTableItemProps) {
  return (
    <tr>
      <td>{alignment.pk}</td>
      <td>{alignment.alignment_run_id}</td>
      <td>{alignment.protein_ref_seq}</td>
      <td>{alignment.genome_ref_seq}</td>
      <td>{alignment.matched_fragment}</td>
      <td>{alignment.start_position}</td>
      <td>{alignment.end_position}</td>
    </tr>
  );
}

export default AlignmentTableItem;
