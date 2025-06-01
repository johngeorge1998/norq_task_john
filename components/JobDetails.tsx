"use client";

import { useState, useEffect } from "react";
import { fetchJobBySlug } from "@/lib/api";
import JobApplyForm from "./ui/JobApplyForm";
import LoadingSpinner from "./ui/LoadingSpinner";
import { Job } from "@/lib/types";
import { motion } from "framer-motion";
import {
  Container,
  Title,
  Text,
  Badge,
  Group,
  Button,
  Center,
  Card,
  Flex,
} from "@mantine/core";

interface JobDetailsProps {
  slug: string;
}

export default function JobDetails({ slug }: JobDetailsProps) {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const loadJob = async () => {
      const jobData = await fetchJobBySlug(slug);
      setJob(jobData);
      setLoading(false);
    };
    loadJob();
  }, [slug]);

  if (loading) {
    return (
      <Center my="xl">
        <LoadingSpinner />
      </Center>
    );
  }

  if (!job) {
    return (
      <Center>
        <Text c="dimmed" size="lg">
          Job not found.
        </Text>
      </Center>
    );
  }

  const createMarkup = () => {
    return { __html: job.description };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container size="lg" py="xl">
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Title order={1} c="indigo">
            {job.title}
          </Title>
          <Text size="lg" c="dimmed" mt={10}>
            {job.company_name}
          </Text>
          <Text size="md">{job.location}</Text>
          <Group gap={8} my="sm">
            {job.job_types.map((type) => (
              <Badge key={type} color="indigo" radius="sm">
                {type}
              </Badge>
            ))}
            <Text size="sm" c="dimmed">
              Posted on {new Date(job.created_at * 1000).toLocaleDateString()}
            </Text>
          </Group>

          <div
            dangerouslySetInnerHTML={createMarkup()}
            className="job-description"
          />

          <Flex justify="flex-start">
            <Button
              mt="xl"
              color="indigo"
              radius="md"
              size="md"
              onClick={() => setShowForm(true)}
            >
              Apply Now
            </Button>
          </Flex>
        </Card>
        {showForm && (
          <JobApplyForm
            jobTitle={job.title}
            onClose={() => setShowForm(false)}
          />
        )}
      </Container>
    </motion.div>
  );
}
