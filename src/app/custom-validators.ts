import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";

export class CustomValidators {
  static invalidProjectName(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'test') {
      return {'invalidProjectName': true};
    } else {
      return null;
    }
  }

  static asyncInvalidProjectName(control: FormControl): Promise<any> | Observable<any> {
    return new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            if (control.value === 'Testproject') {
              resolve({'invalidProjectName': true});
            } else {
              resolve(null);
            }
          }

          , 1500)

      }
    )
  }
}
