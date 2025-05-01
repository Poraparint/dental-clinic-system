"use client";

import ErrorUI from "@/components/props/error-ui";

export default function Error() {
  return (
     <div className="min-h-screen">
          <ErrorUI type="error" />
        </div>
  );
}
