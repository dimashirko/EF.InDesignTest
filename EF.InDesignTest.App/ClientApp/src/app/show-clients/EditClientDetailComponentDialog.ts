import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Service } from '../Model/service';
import { DateFormatPipe } from './DateFormatPipe';
import { ServiceDetailComponentDialog } from './ServiceDetailComponentDialog';
import { DialogData } from './show-clients.component';
import { BehaviorSubject } from 'rxjs';

export interface ServiceDialogData {
  newService: Service;
  saveService: boolean;
  clientName: string;
}

@Component({
  selector: 'edit-client-detail.component',
  templateUrl: 'edit-client-detail.component.html',
})
export class EditClientDetailComponentDialog {
  displayedColumns: string[] = ['operation', 'amount', 'date', 'price', 'remove'];
  baseUrl: string;
  http: HttpClient;
  services: BehaviorSubject<Service[]>;

  constructor(public dialogRef: MatDialogRef<EditClientDetailComponentDialog>, private _dateFormatPipe: DateFormatPipe,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, http: HttpClient, @Inject('BASE_URL') baseUrl: string, public dialog: MatDialog) {
    this.http = http;
    this.baseUrl = baseUrl;
    this.services = new BehaviorSubject(data.selectedClient.services);
  }

  onNoClick(): void {
    this.data.saveClient = false;
    this.dialogRef.close(this.data);
  }

  addService(): void {
    let newService = new Service();
    newService.date = new Date();
    newService.clientId = this.data.selectedClient.id;
    const dialogRef = this.dialog.open(ServiceDetailComponentDialog, {
      width: '60%',
      data: { newService: newService, saveService: true, clientName: this.data.selectedClient.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result?.saveService) {
        let url = this.baseUrl + 'postservice';
        this.http.post(url, result.newService).subscribe(error => console.error(error));
        this.data.selectedClient.services.push(result.newService);
        this.services.next(this.data.selectedClient.services);
      }
    });
  }

  removeService(e, service) {
    let url = this.baseUrl + 'deleteservice/' + service.id;
    this.http.delete(url).subscribe(error => console.error(error));
    this.data.selectedClient.services.splice(this.data.selectedClient.services.indexOf(service), 1);
    this.services.next(this.data.selectedClient.services);
  }
}
