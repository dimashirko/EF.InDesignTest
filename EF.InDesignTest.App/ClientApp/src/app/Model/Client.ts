import { Service } from "./service";

export class Client {
  id: number;
  name: string;
  phoneNumber: string;
  carModel: string;
  carNumber: string;
  services: Service[];
}
