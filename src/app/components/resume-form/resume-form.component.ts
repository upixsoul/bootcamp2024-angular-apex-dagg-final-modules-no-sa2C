import {
  PriceFormGroupT,
  ResumeFormGroupT,
  PhotoFormControlT,
} from './resume-form.type';
import {
  PriceT,
  ResumeFormT,
  PhotosT,
} from '../../entities/resumeForm.type';
import {
  Component,
  inject,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { JsonPipe, NgTemplateOutlet } from '@angular/common';
import {
  MatAccordion,
  MatExpansionModule,
  MatExpansionPanel,
} from '@angular/material/expansion';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogDataT } from '../../entities/confirmationDialogData.type';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RESUME_FORM_LABELS } from './resume-form.labels';
import { RESUME_FORM_TEST_VALUE } from './resume-form.data';

@Component({
  imports: [
    ConfirmationDialogComponent,
    JsonPipe,
    MatButtonModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatTooltipModule,
    NgTemplateOutlet,
    ReactiveFormsModule,
  ],
  selector: 'app-resume-form',
  standalone: true,
  templateUrl: './resume-form.component.html',
})
export class ResumeFormComponent {
  @ViewChild(MatAccordion, { static: true })
  protected matAccordion!: MatAccordion;

  @ViewChildren(MatExpansionPanel)
  protected matExpansionPanels!: QueryList<MatExpansionPanel>;

  /* ••[2]•••••••••• Labels ••••••••••••••• */

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected label: any = RESUME_FORM_LABELS;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected minLengthErrorFieldLabel: (error: any) => string = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any
  ): string => {
    return `This field should be ${error.minlength.requiredLength} characters long`;
  };

  private sentenceValidators: Array<ValidatorFn> = [
    Validators.required,
    Validators.minLength(3),
    // Validators.pattern(/^[\w ]+$/),
  ];

  private extendedSentenceValidators: Array<ValidatorFn> = [
    Validators.required,
    Validators.minLength(3),
    Validators.pattern('[-_a-zA-Z0-9]*')
  ];

  //private URL_PATTERN: RegExp = /(https?:\/\/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9])(:?\d*)\/?([a-z_\/0-9\-#.]*)\??([a-z_\/0-9\-#=&]*)/g;

  private httpUrlValidators: Array<ValidatorFn> = [
    Validators.required,
    Validators.minLength(3),
    Validators.pattern("((http|ftp|https):\\/\\/)?[\\w\\-_]+(\\.[\\w\\-_]+)+([\\w\\-\\.,@?^=%&amp;:/~\\+#]*[\\w\\-\\@?^=%&amp;/~\\+#])?")
  ];

  protected maxDate: Date = new Date();

  protected resumeForm: ResumeFormGroupT = new FormGroup({
    prices: new FormArray(
      [this.getNewPrice()],
      Validators.minLength(1)
    ),
    photos: new FormArray([this.getNewPhoto()], Validators.minLength(1)),
  });

  private matDialog: MatDialog = inject(MatDialog);
  private matSnackBar: MatSnackBar = inject(MatSnackBar);

  /* ••[2]•••••••••• Prices ••••••••••••••• */

  private getNewPrice(): PriceFormGroupT {
    return new FormGroup({
      tag: new FormControl('', {
        nonNullable: true,
        validators: this.extendedSentenceValidators,
      }),
      description: new FormControl('', {
        nonNullable: true,
        validators: this.sentenceValidators,
      }),
      title: new FormControl('', {
        nonNullable: true,
        validators: this.sentenceValidators,
      }),
    });
  }

  private createPrice(
    price: PriceT,
    priceIndex: number,
    append: boolean = true
  ): void {
    if (append) {
      const newPrice: PriceFormGroupT = this.getNewPrice();
      newPrice.setValue(price);
      this.resumeForm.controls.prices.controls.push(newPrice);
    } else {
      this.resumeForm.controls.prices.controls
        .at(priceIndex)
        ?.setValue(price);
    }

    this.resumeForm.controls.prices.updateValueAndValidity();
  }

  protected addPrice(): void {
    this.resumeForm.controls.prices.push(this.getNewPrice());
  }

  protected removePrice(priceIndex: number): void {
    if (this.resumeForm.controls.prices.controls.length > 1) {
      this.resumeForm.controls.prices.removeAt(priceIndex);
    }
  }

  /* ••[2]•••••••••• Photos ••••••••••••••• */

  private getNewPhoto(): PhotoFormControlT {
    return new FormControl('', {
      nonNullable: true,
      validators: this.httpUrlValidators,
    });
  }

  private createPhoto(
    photo: PhotosT,
    photoIndex: number,
    append: boolean = true
  ): void {
    if (append) {
      const newPhoto: PhotoFormControlT = this.getNewPhoto();
      newPhoto.setValue(photo);
      this.resumeForm.controls.photos.push(newPhoto);
    } else {
      this.resumeForm.controls.photos.at(photoIndex)?.setValue(photo);
    }

    this.resumeForm.controls.photos.updateValueAndValidity();
  }

  protected addPhoto(): void {
    this.resumeForm.controls.photos.push(this.getNewPhoto());
  }

  protected removePhoto(photoIndex: number): void {
    if (this.resumeForm.controls.photos.length > 1) {
      this.resumeForm.controls.photos.removeAt(photoIndex);
    }
  }

  
  /* ••[2]•••••••••• Resume form ••••••••••••••• */

  private triggerMatSnackBar(message: string): void {
    this.matSnackBar.open(message, undefined, {
      duration: 3000,
    });
  }

  private recreateFormInitialState(): void {
    while (this.resumeForm.controls.prices.length > 1) {
      this.removePrice(this.resumeForm.controls.prices.length - 1);
    }
    while (this.resumeForm.controls.photos.length > 1) {
      this.removePhoto(this.resumeForm.controls.photos.length - 1);
    }
  }

  private resetForm(): void {
    this.matAccordion.closeAll();
    this.recreateFormInitialState();
    this.resumeForm.reset();
    this.matExpansionPanels.get(0)?.open();
  }

  protected triggerResetForm(): void {
    const matDialogRef: MatDialogRef<ConfirmationDialogComponent, boolean> =
      this.matDialog.open<ConfirmationDialogComponent, ConfirmationDialogDataT>(
        ConfirmationDialogComponent,
        {
          data: {
            content: this.label.resetContent,
            icon: 'restart_alt',
            title: this.label.resetTitle,
          },
          width: '400px',
        }
      );

    matDialogRef
      .afterClosed()
      /* NOTE: this observable completes after emission */
      .subscribe((dialogResponse: boolean | undefined): void => {
        if (dialogResponse) {
          this.resetForm();
          this.triggerMatSnackBar(this.label.resetExecuted);
        }
      });
  }

  private loadData(resumeFormValue: ResumeFormT): void {
    this.resetForm();
    this.matAccordion.openAll();

    resumeFormValue.prices.forEach(
      (price: PriceT, priceIndex: number): void => {
        this.createPrice(
          price,
          priceIndex,
          priceIndex !== 0
        );
      }
    );

    resumeFormValue.photos.forEach(
      (photo: PhotosT, photoIndex: number): void => {
        this.createPhoto(photo, photoIndex, photoIndex !== 0);
      }
    );

    this.resumeForm.updateValueAndValidity();
  }

  protected triggerLoadTestData(): void {
    const matDialogRef: MatDialogRef<ConfirmationDialogComponent, boolean> =
      this.matDialog.open<ConfirmationDialogComponent, ConfirmationDialogDataT>(
        ConfirmationDialogComponent,
        {
          data: {
            content: this.label.loadTestDataContent,
            icon: 'science',
            title: this.label.loadTestDataTitle,
          },
          width: '400px',
        }
      );

    matDialogRef
      .afterClosed()
      .subscribe((dialogResponse: boolean | undefined): void => {
        if (dialogResponse) {
          this.loadData(RESUME_FORM_TEST_VALUE);
          this.triggerMatSnackBar(this.label.loadTestDataExecuted);
        }
      });
  }

  private loadForm(): void {
    try {
      const resumeFormValue: ResumeFormT = JSON.parse(
        localStorage.getItem('resumeFormValue') as string
      );

      if (resumeFormValue) {
        this.loadData(resumeFormValue);
        this.triggerMatSnackBar(this.label.loadFormExecuted);
      } else {
        this.triggerMatSnackBar(this.label.savedDataUnavailable);
      }
    } catch (error) {
      this.triggerMatSnackBar(this.label.errorWhileLoadingSavedData);
    }
  }

  protected triggerLoadForm(): void {
    const matDialogRef: MatDialogRef<ConfirmationDialogComponent, boolean> =
      this.matDialog.open<ConfirmationDialogComponent, ConfirmationDialogDataT>(
        ConfirmationDialogComponent,
        {
          data: {
            content: this.label.loadFormContent,
            icon: 'cloud_download',
            title: this.label.loadFormTitle,
          },
          width: '400px',
        }
      );

    matDialogRef
      .afterClosed()
      .subscribe((dialogResponse: boolean | undefined): void => {
        if (dialogResponse) {
          this.loadForm();
        }
      });
  }

  private saveForm(): void {
    const resumeFormValue: ResumeFormT = this.resumeForm.getRawValue();

    localStorage.setItem('resumeFormValue', JSON.stringify(resumeFormValue));
    this.triggerMatSnackBar(this.label.saveFormExecuted);
  }

  protected triggerSaveForm(): void {
    const matDialogRef: MatDialogRef<ConfirmationDialogComponent, boolean> =
      this.matDialog.open<ConfirmationDialogComponent, ConfirmationDialogDataT>(
        ConfirmationDialogComponent,
        {
          data: {
            content: this.label.saveFormContent,
            icon: 'cloud_upload',
            title: this.label.saveFormTitle,
          },
          width: '400px',
        }
      );

    matDialogRef
      .afterClosed()
      .subscribe((dialogResponse: boolean | undefined): void => {
        if (dialogResponse) {
          this.saveForm();
        }
      });
  }

  protected onSubmit(_event: SubmitEvent, _form: ResumeFormGroupT): void {
    console.log('%c\nonSubmit', 'color: SpringGreen');
    console.log('this.resumeForm.value: %O', this.resumeForm.value);
  }
}
