import JobDetails from '@/components/JobDetails';

interface JobPageProps {
  params: { slug: string };
}

export default function JobPage({ params }: JobPageProps) {
  return <JobDetails slug={params.slug} />;
}