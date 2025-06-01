import {
  Card,
  Text,
  Title,
  Group,
  Badge,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { motion } from "framer-motion";
import Link from "next/link";
import { Job } from "@/lib/types";
import { useAtom } from "jotai";
import { favoriteJobsAtom, toggleFavoriteAtom } from "@/lib/store";
import { IconHeart } from "@tabler/icons-react";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const [favorites] = useAtom(favoriteJobsAtom);
  const [, toggleFavorite] = useAtom(toggleFavoriteAtom);

  const isFavorite = favorites.some((fav) => fav.slug === job.slug);

  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.1 }}>
      <Card shadow="sm" padding="lg" radius="sm" withBorder mih={150}>
        <Group justify="space-between">
          <div>
            <Link href={`/jobs/${job.slug}`}>
              <Tooltip label={job.title} withArrow>
                <Title order={3} style={{ cursor: "pointer" }}>
                  {job.title.length > 50
                    ? `${job.title.slice(0, 37)}...`
                    : job.title}
                </Title>
              </Tooltip>
            </Link>
            <Text c="dimmed" size="sm" mt={10}>
              {job.company_name}
            </Text>
            <Text size="sm">{job.location}</Text>
            <Group gap={8} mt={8}>
              {job.job_types.map((type) => (
                <Badge key={type} radius="xs">
                  {type}
                </Badge>
              ))}
            </Group>
          </div>
          <ActionIcon
            onClick={() => toggleFavorite(job)}
            variant="subtle"
            color={isFavorite ? "red" : "gray"}
          >
            <IconHeart
              size={18}
              fill={isFavorite ? "red" : "none"}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </Card>
    </motion.div>
  );
}
