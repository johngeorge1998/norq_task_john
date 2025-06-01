"use client";

import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { v4 as uuidv4 } from "uuid";
import { fetchJobs } from "@/lib/api";
import JobCard from "./ui/JobCard";
import JobFilter from "./ui/JobFilter";
import { jobFilterAtom } from "@/lib/store";
import LoadingSpinner from "./ui/LoadingSpinner";
import { Job } from "@/lib/types";
import { motion } from "framer-motion";
import { Container, Grid, Button, Center, Text } from "@mantine/core";

export default function JobList() {
  const [jobMap, setJobMap] = useState<Map<string, Job>>(new Map());
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filters] = useAtom(jobFilterAtom);
  const size = 20;

  const loadJobs = async (reset = false) => {
    setLoading(true);
    try {
      const { data, links } = await fetchJobs(
        reset ? 1 : page,
        filters.search,
        filters.jobType,
        filters.remote,
        size
      );
      const newJobs = data.map((job) => ({
        ...job,
        uuid: uuidv4(),
      }));
      setJobMap((prev) => {
        const updatedMap = reset ? new Map() : new Map(prev);
        newJobs.forEach((job) => updatedMap.set(job.uuid!, job));
        return updatedMap;
      });
      setHasMore(!!links.next);
      if (!reset) setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error loading jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs(true);
  }, [filters]);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      loadJobs();
    }
  };

  return (
    <Container size="xl" py="xl">
      <JobFilter />
      {loading && page === 1 ? (
        <Center my="xl">
          <LoadingSpinner />
        </Center>
      ) : jobMap.size === 0 ? (
        <Center>
          <Text c="dimmed" size="lg">
            No jobs found.
          </Text>
        </Center>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Grid gutter="lg">
            {Array.from(jobMap.values()).map((job) => (
              <Grid.Col key={job.uuid} span={{ base: 12, md: 6, lg: 6 }}>
                <JobCard job={job} />
              </Grid.Col>
            ))}
          </Grid>
        </motion.div>
      )}
      {hasMore && !loading && (
        <Center my="xl">
          <Button
            onClick={handleLoadMore}
            loading={loading}
            color="indigo"
            radius="md"
            size="md"
          >
            Load More
          </Button>
        </Center>
      )}
    </Container>
  );
}
