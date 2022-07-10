declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.svg";
declare module "*.webp";

interface Item {
  id?: number;
  title?: string;
  tagline?: string;
  poster_path?: string;
  genres?: string[];
  release_date?: string;
  overview?: string;
  vote_average?: number;
  vote_count?: number;
  runtime?: number;
  budget?: number;
  revenue?: number;
}

type Params = {
  [key: string]: string | number;
};
