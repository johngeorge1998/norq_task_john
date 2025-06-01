"use client";

import { useAtom } from "jotai";
import { jobFilterAtom } from "@/lib/store";
import { useForm, Controller } from "react-hook-form";
import { JobFilterType } from "@/lib/types";
import {
  TextInput,
  Select,
  Checkbox,
  Button,
  Group,
  Stack,
} from "@mantine/core";
import { useState, useEffect } from "react";

export default function JobFilter() {
  const [filters, setFilters] = useAtom(jobFilterAtom);
  const { control, handleSubmit } = useForm<JobFilterType>({
    defaultValues: filters,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubmit = (data: JobFilterType) => {
    setFilters(data);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="md" mb="lg">
        <Group justify="flex-start" gap="md" grow>
          <Controller
            name="search"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder="Search jobs..."
                radius="md"
                size="md"
              />
            )}
          />
          <Controller
            name="jobType"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                value={field.value || ""}
                placeholder="Select job type"
                data={[
                  { value: "", label: "All Job Types" },
                  { value: "full-time", label: "Full-time" },
                  { value: "part-time", label: "Part-time" },
                ]}
                radius="md"
                size="md"
              />
            )}
          />
          <Controller
            name="remote"
            control={control}
            render={({ field: { value, onChange, onBlur, name, ref } }) => (
              <Checkbox
                checked={value}
                onChange={onChange}
                onBlur={onBlur}
                name={name}
                ref={ref}
                label="Remote Only"
                size="md"
              />
            )}
          />
          <Button type="submit" color="indigo" radius="md" size="md">
            Apply Filters
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
