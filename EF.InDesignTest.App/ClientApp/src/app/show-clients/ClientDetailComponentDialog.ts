import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateFormatPipe } from './DateFormatPipe';
import { DialogData } from './show-clients.component';

@Component({
    selector: 'client-detail.component',
    templateUrl: 'client-detail.component.html',
})
export class ClientDetailComponentDialog {
    displayedColumns: string[] = ['operation', 'amount', 'date', 'price'];
    constructor(public dialogRef: MatDialogRef<ClientDetailComponentDialog>, private _dateFormatPipe: DateFormatPipe,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    onNoClick(): void {
        this.data.saveClient = false;
        this.dialogRef.close(this.data);
    }
}
