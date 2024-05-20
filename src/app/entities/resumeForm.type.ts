/* ••[1]••••••••••••••••••••••••• formResume.type.ts •••••••••••••••••••••••••••••• */

export type PriceT = {
  description: string;
  title: string;
  tag: string;
};

export type PhotosT = string;


export type ResumeFormT = {
  prices: Array<PriceT>;
  photos: Array<PhotosT>;
};
