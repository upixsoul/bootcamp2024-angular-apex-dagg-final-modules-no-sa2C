/* ••[1]••••••••••••••••••••••••• resume-form.data.ts •••••••••••••••••••••••••••••• */

import {
  PriceT,
  ResumeFormT,
  PhotosT,
} from '../../entities/resumeForm.type';

const PRICES: Array<PriceT> = [
  {
    description:
      'Design and develop software that offers users with significant and appropriate experiences',
    title: 'User Experiences',
    tag: 'tag1'
  },
  {
    description:
      'Ensure scalability, security, reusability, extensibility, modularity, and maintainability while meeting business requirements.',
    title: 'Software Architecture',
    tag: 'tag2'
  },
  {
    description:
      'I have had the chance to oversee various projects from the planning stage to execution and implementation.',
    title: 'Project Implementation',
    tag: 'tag3'
  },
];

const PHOTOS: Array<PhotosT> = [
  'https://api.slingacademy.com/public/sample-photos/1.jpeg',
  'https://api.slingacademy.com/public/sample-photos/2.jpeg',
  'https://api.slingacademy.com/public/sample-photos/3.jpeg',
  'https://api.slingacademy.com/public/sample-photos/4.jpeg',
  'https://api.slingacademy.com/public/sample-photos/5.jpeg',
  'https://api.slingacademy.com/public/sample-photos/6.jpeg',
  'https://api.slingacademy.com/public/sample-photos/7.jpeg',
  'https://api.slingacademy.com/public/sample-photos/8.jpeg',
  'https://api.slingacademy.com/public/sample-photos/9.jpeg',
  'https://api.slingacademy.com/public/sample-photos/10.jpeg',
  'https://api.slingacademy.com/public/sample-photos/11.jpeg',
  'https://api.slingacademy.com/public/sample-photos/12.jpeg',
  'https://api.slingacademy.com/public/sample-photos/13.jpeg',
  'https://api.slingacademy.com/public/sample-photos/14.jpeg',
  'https://api.slingacademy.com/public/sample-photos/15.jpeg',
  'https://api.slingacademy.com/public/sample-photos/16.jpeg',
  'https://api.slingacademy.com/public/sample-photos/17.jpeg',
  'https://api.slingacademy.com/public/sample-photos/18.jpeg',
  'https://api.slingacademy.com/public/sample-photos/19.jpeg',
  'https://api.slingacademy.com/public/sample-photos/20.jpeg',
];


export const RESUME_FORM_TEST_VALUE: ResumeFormT = {
  prices: PRICES,
  photos: PHOTOS,
};
