// types.ts

export type Image = {
  id: string;
  urls: {
    small: string;
  };
  alt_description: string;
  user: {
    name: string;
  };
  views: number;
};

