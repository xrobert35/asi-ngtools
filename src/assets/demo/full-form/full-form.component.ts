import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import * as lodash from 'lodash';

@Component({
  selector: 'full-form',
  templateUrl: './full-form.component.html',
  host: { 'class': 'flex' }
})
export class FullFormComponent {

  exempleForm: FormGroup;

  today = new Date();

  jobs = [
    'Architect',
    'Electrician',
    'Plumber',
    'Teacher',
    'Web developper'
  ];

  hobbies = [
    'Cinema',
    'Music',
    'Football',
    'Tennis',
    'Fishing',
    'Art',
    'Book'
  ];

  towns = [
    'Paris',
    'Marseille',
    'Lyon',
    'les Escaldes',
    'Andorra la Vella',
    'Umm al Qaywayn',
    'Ras al-Khaimah',
    'Khawr Fakkān',
    'Dubai',
    'Dibba Al-Fujairah',
    'Dibba Al-Hisn',
    'Sharjah',
    'Ar Ruways',
    'Al Fujayrah',
    'Al Ain',
    'Ajman',
    'Adh Dhayd',
    'Abu Dhabi',
    'Zaranj',
    'Taloqan',
    'Shīnḏanḏ'
  ];

  constructor(fb: FormBuilder) {
    this.exempleForm = fb.group({
      sexe: [null, Validators.required],
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      birthdate: [null, Validators.required],
      email: [null, Validators.email],
      job: [null, Validators.required],
      town: [null, Validators.required],
      hobbies : [null, Validators.required]
    });
  }

  enableForm(enable: boolean) {
    if (enable) {
      this.exempleForm.enable();
    } else {
      this.exempleForm.disable();
    }
  }

  requestTown = (fullText: string) => {
    const towns = lodash.filter(this.towns, (town) => {
      return town.startsWith(fullText);
    });
    return towns;
  }

  requestHobbies = (fullText: string) => {
    const hobbies = lodash.filter(this.hobbies, (hobby) => {
      return hobby.startsWith(fullText);
    });
    return hobbies;
  }

  createContent() {}
}
