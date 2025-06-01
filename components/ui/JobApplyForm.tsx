"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { submitApplication } from "@/lib/api";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Modal,
  TextInput,
  Button,
  Group,
  Text,
  FileInput,
  Stack,
} from "@mantine/core";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  linkedin: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
  resume: z
    .instanceof(File, { message: "Resume is required" })
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "File size should be less than 5MB"
    )
    .refine(
      (file) => file.type === "application/pdf",
      "Only PDF files are allowed"
    ),
});

interface JobApplyFormProps {
  jobTitle: string;
  onClose: () => void;
}

export default function JobApplyForm({ jobTitle, onClose }: JobApplyFormProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("linkedin", data.linkedin || "");
    formData.append("resume", data.resume);
    formData.append("jobTitle", jobTitle);

    const success = await submitApplication(formData);
    setStatus(success ? "success" : "error");
  };

  return (
    <Modal
      opened={true}
      onClose={onClose}
      centered
      size="md"
      radius="md"
      styles={{
        header: { display: "none" },
        content: { padding: 10 },
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {status === "success" ? (
          <Text c="green" size="lg" ta="center">
            Application submitted successfully!
          </Text>
        ) : status === "error" ? (
          <Text c="red" size="lg" ta="center">
            Failed to submit application. Please try again.
          </Text>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap="md">
              <TextInput
                label="Name"
                {...register("name")}
                error={errors.name?.message as string}
                radius="md"
                size="md"
              />
              <TextInput
                label="Email"
                {...register("email")}
                error={errors.email?.message as string}
                radius="md"
                size="md"
              />
              <TextInput
                label="LinkedIn URL (Optional)"
                {...register("linkedin")}
                error={errors.linkedin?.message as string}
                radius="md"
                size="md"
              />
              <Controller
                name="resume"
                control={control}
                render={({ field: { onChange, value, ...rest } }) => (
                  <FileInput
                    label="Resume"
                    onChange={(file) => onChange(file)}
                    value={value}
                    error={errors.resume?.message as string}
                    radius="md"
                    size="md"
                    accept="application/pdf"
                  />
                )}
              />
              <Group justify="flex-end" mt="md">
                <Button type="submit" color="indigo" radius="md" size="md">
                  Submit
                </Button>
                <Button
                  variant="outline"
                  color="gray"
                  onClick={onClose}
                  radius="md"
                  size="md"
                >
                  Cancel
                </Button>
              </Group>
            </Stack>
          </form>
        )}
      </motion.div>
    </Modal>
  );
}
