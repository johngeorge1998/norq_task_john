import type { Metadata } from "next";
import Providers from "./providers";
import Header from "@/components/Header";
import { Box, Card } from "@mantine/core";
import "./globals.css";

export const metadata: Metadata = {
  title: "Job Board",
  description: "A sleek and modern job board application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Box
            data-mantine-box
            style={{
              minHeight: "100vh",
            }}
          >
            <Card
              radius={0}
              style={{
                height: "60px",
                borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                position: "sticky",
                top: 0,
                zIndex: 100,
                backgroundColor: "var(--mantine-color-body)",
              }}
              className="header-border"
            >
              <Header />
            </Card>

            <Card
              radius={0}
              p="md"
              style={{
                minHeight: "calc(100vh - 60px)",
              }}
            >
              {children}
            </Card>
          </Box>
        </Providers>
      </body>
    </html>
  );
}
