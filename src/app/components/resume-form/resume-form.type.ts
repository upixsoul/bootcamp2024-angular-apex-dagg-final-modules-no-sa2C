/* ••[1]••••••••••••••••••••••••• resume-form.type.ts •••••••••••••••••••••••••••••• */

import {
  PriceT,
  PhotosT,
} from '../../entities/resumeForm.type';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type PriceFormGroupT = FormGroup<{
  description: FormControl<PriceT['description']>;
  title: FormControl<PriceT['title']>;
  tag: FormControl<PriceT['tag']>;
}>;

export type PhotoFormControlT = FormControl<PhotosT>;

export type ResumeFormGroupT = FormGroup<{
  prices: FormArray<PriceFormGroupT>;
  photos: FormArray<PhotoFormControlT>;
}>;
