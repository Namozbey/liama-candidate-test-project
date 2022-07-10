declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.svg";
declare module "*.webp";

type Params = {
  [key: string]: string | number | boolean;
};

type Property = {
  id: string;
  name: string;
  value: string;
};

interface Variation {
  id?: number;
  name?: string;
  barcode?: number;
  properties?: Property[];
  productProperties?: Property[];
  [key: string]: any;
}
