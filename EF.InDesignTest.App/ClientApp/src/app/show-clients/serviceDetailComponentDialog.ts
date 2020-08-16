import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceDialogData } from './EditClientDetailComponentDialog';

@Component({
    selector: 'service-detail.component',
    templateUrl: 'service-detail.component.html',
})
export class ServiceDetailComponentDialog {
    displayedColumns: string[] = ['operation', 'amount', 'date', 'price'];
    constructor(
        public dialogRef: MatDialogRef<ServiceDetailComponentDialog>,
        @Inject(MAT_DIALOG_DATA) public data: ServiceDialogData) { }

    onNoClick(): void {
        this.data.saveService = false;
        this.dialogRef.close(this.data);
    }
}
