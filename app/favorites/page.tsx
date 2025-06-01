"use client";

import { useAtom } from "jotai";
import { favoriteJobsAtom } from "@/lib/store";
import { Container, Title, Text, Grid } from "@mantine/core";
import JobCard from "@/components/ui/JobCard";

export default function FavoritesPage() {
  const [favoriteJobs] = useAtom(favoriteJobsAtom);

  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="xl">
        Your Favorite Jobs
      </Title>
      {favoriteJobs.length === 0 ? (
        <Text c="dimmed">You haven't saved any jobs yet.</Text>
      ) : (
        <Grid gutter="lg">
          {favoriteJobs.map((job) => (
            <Grid.Col key={job.uuid} span={{ base: 12, md: 12, lg: 12 }}>
              <JobCard job={job} />
            </Grid.Col>
          ))}
        </Grid>
      )}
    </Container>
  );
}
