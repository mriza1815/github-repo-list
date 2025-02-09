import { SortProps } from "@/types";
import { Octokit } from "@octokit/core";

// Move API configuration to a separate file
export const API_VERSION = '2022-11-28';
export const PER_PAGE = 10;

export const octokit = new Octokit({
  auth: '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'
})

export interface SearchParams {
  searchKeyword: string;
  selectedLang: string;
  currentPage: number;
  sortBy: string;
}

export const getSearchParams = (params: SearchParams) => ({
  headers: {
    'X-GitHub-Api-Version': API_VERSION
  },
  q: `${params.searchKeyword}+language:${params.selectedLang}`,
  per_page: PER_PAGE,
  page: params.currentPage,
  sort: params.sortBy as SortProps | undefined,
});