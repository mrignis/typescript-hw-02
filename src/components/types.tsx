// types.ts
export type Image = {
  id: string;
  urls: {
    small?: string;
    regular?: string;
  };
  alt_description: string;
  user: {
    name: string;
  };
  views: number;
};
