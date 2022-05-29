import {Alignment} from "../models/alignment.interface";

interface AlignmentTableItemProps {
  alignment: Alignment;
}

function truncate(str: string, n: number){
  return (str.length > n) ? str.substr(0, n-1) + '...' : str;
};

function AlignmentTableItem({alignment}: AlignmentTableItemProps) {
  return (
    <tr>
      <td>{alignment.pk}</td>
      <td>{alignment.alignment_run_fk}</td>
      <td>{alignment.protein_ref_seq}</td>
      <td>{alignment.genome_ref_seq}</td>
      <td>{alignment.start_position}</td>
      <td>{alignment.end_position}</td>
      <td>{truncate(alignment.matched_fragment, 90)}</td>
    </tr>
  );
}

export default AlignmentTableItem;
