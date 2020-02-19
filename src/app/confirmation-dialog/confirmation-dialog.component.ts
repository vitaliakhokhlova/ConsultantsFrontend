import { Component, Inject, TemplateRef } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
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
