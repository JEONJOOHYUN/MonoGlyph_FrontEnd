"use client";

import RunGrid from "../components/RunGrid";

export default function AdminPage() {
  const handleRunSelect = (runId: string) => {
    console.log("Selected run:", runId);
  };

  return (
    <div className="min-h-screen bg-bg font-paper">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <RunGrid onRunSelect={handleRunSelect} />
      </div>
    </div>
  );
}
