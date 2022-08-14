export type AuthType = string | null;

export interface Auth {
  accessToken: AuthType;
  token: AuthType;
  user: any;
  loggedIn: boolean;
}

export interface NewsApiPost {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: { id: number; name: string };
  title: string;
  url: string;
  urlToImage: string;
}
