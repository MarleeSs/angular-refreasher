import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})

export class PersonService {
  personChanged = new Subject<string[]>();
  persons: string[] = [];

  constructor(private httpClient: HttpClient) {

  }

  fetchPersons(){
    this.httpClient.get<any>('https://swapi.dev/api/people').pipe(map(resData => {
      return resData.results.map((char: any) => char.name);
    })).subscribe(transformData => {
      this.personChanged.next(transformData);
    });
  }

  addPerson(name: string){
    this.persons.push(name);
    this.personChanged.next(this.persons);
  }

  removePerson(name: string){
    this.persons = this.persons.filter(person => {
      return person !== name;
    });

    this.personChanged.next(this.persons);
  }
}
