import { Pipe, PipeTransform } from '@angular/core';
import { Client } from '../client/client.model';

@Pipe({
  name: 'clientFilter'
})
export class ClientFilterPipe implements PipeTransform {

  transform(clients: Client[], name: string): Client[] {
    if (!name || name.length === 0) {
      return clients;
    }
    return clients.filter(rec =>
      rec.name.toLowerCase().startsWith(name.toLowerCase())
    );
  }

}
