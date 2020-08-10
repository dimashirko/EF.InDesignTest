import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../Model/client';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Service } from '../Model/service';
import { DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject } from 'rxjs';

export interface DialogData {
  selectedClient: Client;
  saveClient: boolean;
}

@Component({
  selector: 'app-show-clients',
  templateUrl: './show-clients.component.html',
  styleUrls: ['./show-clients.component.css']
})
export class ShowClientsComponent {
  public clientsSource: Client[];
  public clients: BehaviorSubject<Client[]>;
  clientOriginal: Client;
  http: HttpClient;
  baseUrl: string;
  public clientServices: Service[];
  mainTableColumns: string[] = ['name', 'phoneNumber', 'carModel', 'carNumber', 'details', 'remove'];
  expandedElement: Client | null;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, public dialog: MatDialog) {
    this.http = http;
    this.baseUrl = baseUrl;
    this.http.get<Client[]>(baseUrl + 'clients').subscribe(result => {
      this.clients = new BehaviorSubject(result);
      this.clientsSource = result;
    }, error => console.error(error));
  }

  enableEditMethod(e, client) {
    this.clientOriginal = Object.assign({}, client);
    this.clientServices = client.services;

    const dialogRef = this.dialog.open(EditClientDetailComponentDialog, {
      width: '75%',
      data: { selectedClient: client, saveClient: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result.saveClient) {
        let url = this.baseUrl + 'putclient/' + client.id;
        this.http.put(url, client).subscribe(error => console.error(error));
        this.clientOriginal = null;
        return;
      }
      Object.assign(client, this.clientOriginal);
      this.clientOriginal = null;
    });
  }

  addClient(e) {
    let newClient = new Client();
    const dialogRef = this.dialog.open(ClientDetailComponentDialog, {
      width: '75%',
      data: { selectedClient: newClient, saveClient: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result.saveClient) {
        let url = this.baseUrl + 'postclient';
        this.http.post(url, result.selectedClient).subscribe(error => console.error(error));
        this.clientsSource.push(result.selectedClient);
        this.clients.next(this.clientsSource);
      }
    });
  }

  removeClient(e, client) {
    let url = this.baseUrl + 'deleteclient/' + client.id;
    this.http.delete(url).subscribe(error => console.error(error));
    this.clientsSource.splice(this.clientsSource.indexOf(client), 1);
    this.clients.next(this.clientsSource);
  }
}

@Component({
  selector: 'client-detail.component',
  templateUrl: 'client-detail.component.html',
})
export class ClientDetailComponentDialog {
  displayedColumns: string[] = ['operation', 'amount', 'date', 'price'];
  constructor(
    public dialogRef: MatDialogRef<ClientDetailComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.data.saveClient = false;
    this.dialogRef.close(this.data);
  }
}

@Component({
  selector: 'edit-client-detail.component',
  templateUrl: 'edit-client-detail.component.html',
})
export class EditClientDetailComponentDialog {
  displayedColumns: string[] = ['operation', 'amount', 'date', 'price'];
  constructor(
    public dialogRef: MatDialogRef<EditClientDetailComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.data.saveClient = false;
    this.dialogRef.close(this.data);
  }
}


export class ClientsListDataSource extends DataSource<any> {
  constructor(private _clientsList$: Observable<Client[]>) {
    super();
  }

  connect(): Observable<Client[]> {
    return this._clientsList$;
  }

  disconnect() {
  }
}
