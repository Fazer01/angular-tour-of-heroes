import { InMemoryDbService } from 'angular-in-memory-web-api';
//not the latest, but 0.6.0 works only with Angular 6.0.0 beta (see https://stackoverflow.com/questions/49470299/angular-tour-of-heroes-problems-with-inmemory-web-api/49600587#49600587)
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let heroes = [
      { id: 11, name: 'Mr. Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    return {heroes};
  }
}