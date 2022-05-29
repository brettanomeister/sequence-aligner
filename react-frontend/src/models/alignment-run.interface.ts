export interface AlignmentRun {
  _id: string;
  name: string;
  description: string;
  query: string;
  submitted_at: string;
  completed_at?: string;
}