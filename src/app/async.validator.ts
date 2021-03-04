import { AsyncValidatorFn, AbstractControl } from "@angular/forms";
import { Observable } from "rxjs";
import { ajax } from "rxjs/ajax";
import { map, delay } from "rxjs/operators";

export function usernameValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<any> => {
    return checkIfUsernameExists().pipe(
      map(res => {
        return res.username === control.value ? { usernameExists: true } : null;
      })
    );
  };
  function checkIfUsernameExists(): Observable<any> {
    console.log("in ajax");
    return ajax
      .getJSON("https://jsonplaceholder.typicode.com/users/1")
      .pipe(delay(1000));
  }
}
