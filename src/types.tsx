export type SortProps = "stars" | "updated" | "forks"

export interface Repo {
    id: number;
    name: string;
    full_name: string;
    owner: {
      login: string;
      avatar_url: string;
    };
    description: string | null;
    html_url: string;
    updated_at: string;
    stargazers_count: number;
    forks: number;
  }