export interface AlignmentRun {
  pk: number;
  name: string;
  description: string;
  query: string;
  submitted_at: string;
  completed_at?: string;
}