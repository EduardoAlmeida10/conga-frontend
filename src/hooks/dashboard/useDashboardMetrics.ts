import { getDashboardMetrics, type DashboardMetrics } from '@/api/dashboard/dashboard';
import { useState, useEffect } from 'react';

interface DashboardHookResult {
    metrics: DashboardMetrics | null;
    isLoading: boolean;
    error: string | null;
}

export const useDashboardMetrics = (): DashboardHookResult => {
    const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await getDashboardMetrics();
                setMetrics(data);
            } catch (err) {
                console.error("Erro ao carregar o Dashboard:", err);
                setError("Não foi possível carregar as métricas.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    return { metrics, isLoading, error };
};