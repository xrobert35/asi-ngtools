export class Month {
  num: number;
  libelle: string;
}

export class Day {
  num: number;
  libelle: string;
}

export class DayItem {
  day: number;
  month: number;
  year: number;
  date: Date;
  class: string;

  constructor(num: number, month: number, year: number, date : Date,  aClass: string) {
    this.day = num;
    this.month = month;
    this.year = year;
    this.date = date;
    this.class = aClass;
  }
}

export const months_fr: Array<Month> = [
  { num: 1, libelle: "Janvier" },
  { num: 2, libelle: "Février" },
  { num: 3, libelle: "Mars" },
  { num: 4, libelle: "Avril" },
  { num: 5, libelle: "Mai" },
  { num: 6, libelle: "Juin" },
  { num: 7, libelle: "Juillet" },
  { num: 8, libelle: "Août" },
  { num: 9, libelle: "Septembre" },
  { num: 10, libelle: "Octobre" },
  { num: 11, libelle: "Novembre" },
  { num: 12, libelle: "Décembre" },
];

export const months_en = [
  { num: 1, libelle: "January" },
  { num: 2, libelle: "February" },
  { num: 3, libelle: "March" },
  { num: 4, libelle: "April" },
  { num: 5, libelle: "May" },
  { num: 6, libelle: "June" },
  { num: 7, libelle: "July" },
  { num: 8, libelle: "August" },
  { num: 9, libelle: "September" },
  { num: 10, libelle: "October" },
  { num: 11, libelle: "November" },
  { num: 12, libelle: "Decemder" }];

export const days_fr: Array<Day> = [
  { num: 1, libelle: "L" },
  { num: 2, libelle: "M" },
  { num: 3, libelle: "M" },
  { num: 4, libelle: "J" },
  { num: 5, libelle: "V" },
  { num: 6, libelle: "S" },
  { num: 7, libelle: "D" },
];

export const days_en = [
  { num: 1, libelle: "M" },
  { num: 2, libelle: "T" },
  { num: 3, libelle: "W" },
  { num: 4, libelle: "T" },
  { num: 5, libelle: "F" },
  { num: 6, libelle: "S" },
  { num: 7, libelle: "S" },
];