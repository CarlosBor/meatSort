/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Job {
  _id: string;
  type: string;
  status: 'pending' | 'in_progress' | 'complete';
  payload: any;
  result: any | null;
  artisan: string | null;
  createdAt: Date;
}

export interface SimpleFormProps {
  jobId: string;
}

export interface SortableFormProps {
  jobId: string;
  sortable: any[];
}