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
import { usePathname } from "next/navigation";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const [favorites] = useAtom(favoriteJobsAtom);
  const [, toggleFavorite] = useAtom(toggleFavoriteAtom);
  const pathname = usePathname();

  const isFavorite = favorites.some((fav) => fav.slug === job.slug);
  const isFavoritesPage = pathname === "/favorites";

  const truncationLimit = isFavoritesPage ? 90 : 40;
  const truncatedTitle =
    job.title.length > truncationLimit
      ? `${job.title.slice(0, truncationLimit)}...`
      : job.title;

  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.1 }}>
      <Card shadow="sm" padding="lg" radius="sm" withBorder mih={150}>
        <Group justify="space-between">
          <div>
            <Link href={`/jobs/${job.slug}`}>
              <Tooltip label={job.title} withArrow>
                <Title order={3} style={{ cursor: "pointer" }}>
                  {truncatedTitle}
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
