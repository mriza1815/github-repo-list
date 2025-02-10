import { SearchParams, SortProps } from "@/types";
import { Octokit } from "@octokit/core";

// Move API configuration to a separate file
export const API_VERSION = '2022-11-28';
export const PER_PAGE = 10;

export const octokit = new Octokit({
  auth: ''
})


export const GITHUB_AUTH_CONFIG = {
  CLIENT_ID: import.meta.env.VITE_GITHUB_CLIENT_ID,
  REDIRECT_URI: `${window.location.origin}/login`,
  OAUTH_URL: 'https://github.com/login/oauth/authorize',
  SCOPE: '',
};

export const getSearchParams = (params: SearchParams) => ({
  headers: {
    'X-GitHub-Api-Version': API_VERSION
  },
  q: `${params.searchKeyword}+language:${params.selectedLang}`,
  per_page: PER_PAGE,
  page: params.currentPage,
  sort: params.sortBy as SortProps | undefined,
});