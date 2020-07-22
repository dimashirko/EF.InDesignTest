import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-show-clients',
  templateUrl: './show-clients.component.html'
})
export class ShowClientsComponent {
  public clients: Client[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Client[]>(baseUrl + 'api/Clients/Clients').subscribe(result => {
      this.clients = result;
    }, error => console.error(error));
  }
}

interface Client {
  id: number;
  name: string;
  phoneNumber: string;
  carModel: string;
  carNumber: string;
  services: Service[];
}

interface Service {
  id: number;
  clientId: number;
  client: Client;
  operation: string;
  amount: number;
  date: Date;
  price: number;
}
