import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-show-clients',
  templateUrl: './show-clients.component.html',
  styleUrls: ['./show-clients.component.css']
})

export class ShowClientsComponent {
  public clients: Client[];
  enableEdit = false;
  enableEditIndex = null;
  clientOriginal: Client;
  http: HttpClient;
  baseUrl: string;
  creatingClient = false;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;
    this.http.get<Client[]>(baseUrl + 'clients').subscribe(result => { this.clients = result; }, error => console.error(error));
  }

  enableEditMethod(e, i, client) {
    this.enableEdit = true;
    this.enableEditIndex = i;
    this.clientOriginal = Object.assign({}, client);
  }

  addClient(e) {
    this.creatingClient = true;

  }

  saveClient(e) {
    let url = this.baseUrl + 'postclient';
    //this.http.post(url, this.newClient)
    this.creatingClient = false;
  }

  cancelChanges(e, client) {
    this.enableEdit = false;
    this.enableEditIndex = null;
    Object.assign(client, this.clientOriginal);
    this.clientOriginal = null;
  }

  saveChanges(e, client) {
    let url = this.baseUrl + 'putclient/' + client.id;
    this.http.put(url, client).subscribe(error => console.error(error));
    this.enableEdit = false;
    this.enableEditIndex = null;
    this.clientOriginal = null;
  }

  removeClient(e, client) {
    let url = this.baseUrl + 'putclient/' + client.id;
    this.http.delete(url);
  }

  showServices(e, cilent) {

  }
}

class Client {
  id: number;
  name: string;
  phoneNumber: string;
  carModel: string;
  carNumber: string;
  services: Service[];
}

class Service {
  id: number;
  clientId: number;
  client: Client;
  operation: string;
  amount: number;
  date: Date;
  price: number;
}
