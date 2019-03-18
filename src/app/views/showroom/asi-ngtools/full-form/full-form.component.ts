import { Component, HostBinding } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import * as lodash from 'lodash';

@Component({
  selector: 'presentation-full-form',
  templateUrl: './full-form.component.html',
})
export class FullFormComponent {

  @HostBinding('class') class = 'flex';

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

  items = [
    {
      id: 1,
      label: 'parent 1',
      children: [
        {
          id: 2,
          label: 'parent 1-1',
          children: [
            {
              id: 3,
              label: 'child 1-1-1',
              children: []
            },
            {
              id: 4,
              label: 'child 1-1-2',
              children: []
            }
          ]
        },
        {
          id: 5,
          label: 'child 1-2',
          children: []
        },
        {
          id: 6,
          label: 'child 1-3',
          children: []
        }
      ]
    }, {
      id: 7,
      label: 'child 2',
      children: []
    }
  ];

  constructor(fb: FormBuilder) {
    this.exempleForm = fb.group({
      sexe: [null, Validators.required],
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      birthdate: [null, Validators.required],
      email: [null, Validators.email],
      other: fb.group({
        job: [null, Validators.required],
        town: [null, Validators.required],
        hobbies : [null, Validators.required]
      }),
      children: [null, Validators.required]
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
  
  childrenTreeSelectFilter = (item: any, filter: string) => {
    return item && item['label'] && item['label'].indexOf(filter) >= 0;
  }

}
