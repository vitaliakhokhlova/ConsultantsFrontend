import { Component, Inject, TemplateRef } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
  <h1 mat-dialog-title align="center"> <p>{{data.headerText}}{{ data.item }} </p></h1>
  <ng-container [ngTemplateOutlet]="data.template"></ng-container>
  `
})
export class ConfirmationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public data: {
      headerText: string,
      template: TemplateRef<any>,
      item: any
    }
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
