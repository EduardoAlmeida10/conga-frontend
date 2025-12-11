import { useEffect, useState } from "react";
import { mapApiRecordsToRecentRecords } from "./mapApiRecordsToRecentRecords";
import { getDashboardRecords, type DashboardRecords } from "@/api/dashboard/dashboard";
import type { RecentRecord } from "@/components/RecentRecord/RecentRecord";

export function useDashboardRecords() {
  const [records, setRecords] = useState<RecentRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const apiData: DashboardRecords = await getDashboardRecords();
        const mapped = mapApiRecordsToRecentRecords(apiData);
        setRecords(mapped);
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar os registros.");
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, []);

  return { records, isLoading, error };
}
