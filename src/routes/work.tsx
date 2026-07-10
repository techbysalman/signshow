import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Signshow Catalog" },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  useEffect(() => {
    window.location.href = "https://catlo.ai/org/signshow-advertising-mmx5o1o2";
  }, []);
  return null;
}
