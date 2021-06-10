import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ngFormsAssignment';
  projectForm!: FormGroup;
  forbiddenProjectNames = ['Test'];

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      'projectData': new FormGroup({
        'projectName': new FormControl(null, [Validators.required, this.asyncforbiddenProjectNames]),
        'email': new FormControl(null, [Validators.required, Validators.email])
      })
    })

    this.projectForm.statusChanges.subscribe(
      (status) => {
        console.log(status);
      })
    //
    // this.projectForm.setValue({
    //   'projectData': {
    //     'projectName': '',
    //     'email': ''
    //   }
    // })
  }

  onSubmit() {
    console.log(this.projectForm);
  }

  // forbiddenNames(control: FormControl): { [s: string]: boolean } {
  //   if (this.forbiddenProjectNames.indexOf(control.value) !== -1) {
  //     return {'forbiddenProjectNames': true}
  //   } else {
  //     return null;
  //   }
  // }

  asyncforbiddenProjectNames(control: FormControl): Promise<any> | Observable<any> {
    return new Promise<any>(
      (resolve, reject) => {
        setTimeout(
          () => {
            if (control.value === 'Test' || control.value === 'test') {
              resolve({'forbiddenProjectNames': true});
            } else {
              resolve(null);
            }
          }
          , 1500);
      }
    );
  }

}
