import { useMemo, useState } from 'react';
import { octokit, SearchParams } from '../api/config';
import { getSearchParams } from '../api/config';
import { Repo } from '@/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useGithubRepos = (params: SearchParams) => {
  const [totalCount, setTotalCount] = useState(0);

  const { isPending, data, isLoading, isPlaceholderData } = useQuery<Repo[]>({
    queryKey: ['repoData', params],
    queryFn: async () => {
      const response = await octokit.request('GET /search/repositories', 
        getSearchParams(params)
      );
      setTotalCount(response.data.total_count);
      return response.data.items as Repo[];
    },
    placeholderData: keepPreviousData,
  });

  const isWaiting = useMemo(() => isPending || isLoading || isPlaceholderData, [isPending, isLoading, isPlaceholderData])

  return {
    repos: data ?? [],
    totalCount,
    isWaiting
  };
}; 