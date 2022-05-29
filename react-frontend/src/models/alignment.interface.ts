export interface Alignment {
  _id: string;
  alignment_run_id: string;
  protein_ref_seq: string;
  genome_ref_seq: string;
  matched_fragment: string;
  start_position: number;
  end_position: number;
}
