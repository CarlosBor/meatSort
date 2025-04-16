/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Job {
  jobId: string;
  type: string;
  status: 'pending' | 'in_progress' | 'complete';
  payload: any;
  result: any | null;
  artisan: string | null;
  createdAt: Date;
}

export interface LoremFormProps {
  jobId: string;
}