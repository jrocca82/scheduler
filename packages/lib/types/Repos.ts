export interface Repository {
  description: string | null;
  id: number;
  name: string;
  html_url: string
}

export interface RepoInfo {
  createdAt: number;
  deployHooks: any[]; // You might want to replace any[] with a more specific type
  org: string;
  productionBranch: string;
  repo: string;
  repoId: number;
  sourceless: boolean;
  type: string;
  updatedAt: number;
}

interface AliasInfo {
  alias: string[];
  id: string;
  name: string;
  teamId: string | null;
  url: string;
}


export interface VercelDeployment {
  createdAt: number;
  id: string;
  link: RepoInfo;
  live: boolean;
  name: string;
  targets: {
    [key: string]: AliasInfo;
  };
  updatedAt: number;
}  