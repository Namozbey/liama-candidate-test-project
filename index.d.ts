declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.svg";
declare module "*.webp";

type Params = {
  _sort?: string;
  _order?: "desc" | "asc";
  _start?: number;
  _end?: number;
  [key: string]: number | string | boolean | undefined;
};

interface ProductType {
  id?: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageSrc?: string;
}
