import { useMemo, useState } from 'react';
import { octokit } from '../api/config';
import { getSearchParams } from '../api/config';
import { Repo, SearchParams } from '@/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

//Only the first 1000 search results are available - https://docs.github.com/v3/search/
export const MAX_TOTAL_COUNT = 1000;

export const useGithubRepos = (params: SearchParams) => {
  const [totalCount, setTotalCount] = useState(0);

  const { isPending, data, isLoading, isPlaceholderData, error } = useQuery<Repo[]>({
    queryKey: ['repoData', params],
    queryFn: async () => {
      const response = await octokit.request('GET /search/repositories', 
        getSearchParams(params)
      );
      setTotalCount(response.data.total_count > MAX_TOTAL_COUNT ? MAX_TOTAL_COUNT : response.data.total_count);
      return response.data.items as Repo[];
    },
    placeholderData: keepPreviousData,
  });

  const isWaiting = useMemo(() => isPending || isLoading || isPlaceholderData, [isPending, isLoading, isPlaceholderData])

  return {
    repos: data ?? [],
    totalCount,
    isWaiting,
    error
  };
}; 