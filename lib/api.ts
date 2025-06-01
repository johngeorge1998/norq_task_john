import axios from "axios";
import { Job } from "./types";
import { v4 as uuidv4 } from "uuid";

const API_BASE_URL = "https://www.arbeitnow.com/api/job-board-api";

export const fetchJobs = async (
  page: number,
  search: string,
  jobType: string,
  remote: boolean,
  size: number = 20
): Promise<{
  data: Job[];
  meta: { current_page: number; last_page: number | null };
  links: { next: string | null };
}> => {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: {
        page,
        keyword: search || undefined,
        job_type: jobType || undefined,
        remote: remote ? 1 : undefined,
        per_page: size,
      },
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });

    const data = response.data.data.slice(0, size).map((job: any) => ({
      slug: job.slug || "",
      title: job.title || "",
      company_name: job.company_name || "",
      location: job.location || "",
      job_types: Array.isArray(job.job_types) ? job.job_types : [],
      description: job.description || "",
      requirements: Array.isArray(job.requirements) ? job.requirements : [],
      created_at: job.created_at || 0,
      uuid: uuidv4(),
    }));
    return {
      data,
      meta: response.data.meta || { current_page: 1, last_page: null },
      links: response.data.links || { next: null },
    };
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return {
      data: [],
      meta: { current_page: 1, last_page: null },
      links: { next: null },
    };
  }
};

export const fetchJobBySlug = async (slug: string): Promise<Job | null> => {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: { page: 1 },
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
    const job = response.data.data.find((j: any) => j.slug === slug);
    if (!job) return null;
    return {
      slug: job.slug || "",
      title: job.title || "",
      company_name: job.company_name || "",
      location: job.location || "",
      job_types: Array.isArray(job.job_types) ? job.job_types : [],
      description: job.description || "",
      requirements: Array.isArray(job.requirements) ? job.requirements : [],
      created_at: job.created_at || 0,
      uuid: uuidv4(),
    };
  } catch (error) {
    console.error("Error fetching job:", error);
    return null;
  }
};

export const submitApplication = async (
  formData: FormData
): Promise<boolean> => {
  try {
    const response = await axios.post(
      "https://webhook-test.com/91ee0d920da16c5cb92ac44babd05d79",

      formData,
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
    return response.status === 200;
  } catch (error) {
    console.error("Error submitting application:", error);
    return false;
  }
};
