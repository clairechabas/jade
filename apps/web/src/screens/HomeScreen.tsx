import { HealthResponseSchema, type HealthResponse } from '@bml/api-client';
import { Button } from '@bml/ui';
import { useQuery } from '@tanstack/react-query';

export function HomeScreen() {
  const { data, status, isFetching, refetch } = useQuery<HealthResponse>({
    queryKey: ['health'],
    queryFn: async (): Promise<HealthResponse> => {
      const res = await fetch('/api/health');
      const json = await res.json();
      return HealthResponseSchema.parse(json);
    },
  });

  if (status === 'pending') return <p>Loading…</p>;
  if (status === 'error') return <p>Request failed.</p>;

  if (!data.ok) {
    return (
      <div>
        <p>API error:</p>
        <pre>{JSON.stringify(data.error, null, 2)}</pre>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 items-start">
      <div>
        <p>API status: {isFetching ? 'Refreshing...' : <strong>{data.data.status}</strong>}</p>
        <p>Service: {isFetching ? 'Refreshing...' : data.data.service}</p>
        <p>Timestamp: {isFetching ? 'Refreshing...' : data.data.timestamp}</p>
      </div>

      <Button kind="primary" onClick={() => refetch()}>
        Refetch health
      </Button>
    </div>
  );
}
