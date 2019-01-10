import { startOfDay, endOfDay } from 'date-fns';

export interface TableFilter {
  getFilter(): object;
}

export class DateFilter implements TableFilter {
  fromDate: Date;
  toDate: Date;

  public constructor(private readonly column: string) {}

  getFilter(): object {
    const filter = {};

    this.leanCloudFilter(filter);

    return filter;
  }

  private leanCloudFilter(filter: {}) {
    if (this.fromDate && this.toDate) {
      filter[this.column] = {
        $gte: { __type: 'Date', iso: startOfDay(this.fromDate) },
        $lt: { __type: 'Date', iso: endOfDay(this.toDate) }
      };
    } else if (this.fromDate) {
      filter[this.column] = {
        $gte: { __type: 'Date', iso: startOfDay(this.fromDate) }
      };
    } else if (this.toDate) {
      filter[this.column] = {
        $lt: { __type: 'Date', iso: endOfDay(this.toDate) }
      };
    }
  }
}

export class TextFilter implements TableFilter {
  value: string;

  public constructor(private readonly column: string) {
    this.value = '';
  }

  getFilter(): object {
    const filter = {};

    filter[this.column] = { $regex: this.value };

    return filter;
  }
}
