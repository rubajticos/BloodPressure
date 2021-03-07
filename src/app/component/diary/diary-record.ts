export class DiaryRecord {
  top: number;
  bottom: number;
  pulse: number;
  note: string;
  measureDate: Date;

  constructor(
    top: number,
    bottom: number,
    pulse: number,
    note: string,
    date: Date
  ) {
    this.top = top;
    this.bottom = bottom;
    this.pulse = pulse;
    this.note = note;
    this.measureDate = date;
  }
}
