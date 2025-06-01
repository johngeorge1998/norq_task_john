export interface Job {
  slug: string;
  title: string;
  company_name: string;
  location: string;
  job_types: string[];
  description: string;
  requirements?: string[];
  created_at: number;
  uuid: string;
}

export interface JobFilterType {
  search: string;
  jobType: string;
  remote: boolean;
}

export interface ApplyFormData {
  name: string;
  email: string;
  linkedin: string;
  resume: File | null;
}
