export class DiaryRecord {
  top: number;
  bottom: number;
  pulse: number;
  comment: string;
  measureDate: Date;

  constructor(
    top: number,
    bottom: number,
    pulse: number,
    comment: string,
    date: Date
  ) {
    this.top = top;
    this.bottom = bottom;
    this.pulse = pulse;
    this.comment = comment;
    this.measureDate = date;
  }
}
