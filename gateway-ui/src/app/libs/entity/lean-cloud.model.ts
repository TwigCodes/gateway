import { startOfDay, endOfDay } from 'date-fns';
import { Sort } from '@angular/material';
import { Entity } from './entity.model';

export enum LeanCloudOp {
  NE,
  LT,
  LTE,
  GT,
  GTE,
  REGEX,
  IN,
  NIN,
  ALL,
  EXISTS,
  SELECT,
  NOT_SELECT
}

export class LeanCloudSearch {
  fieldName: string;
  value: string | Date | number | boolean;

  /**
   * constructor
   */
  public constructor(
    fieldName: string,
    value: string | Date | number | boolean
  ) {
    this.fieldName = fieldName;
    this.value = value;
  }

  /**
   * expression
   */
  public get expression(): string {
    return this.value instanceof Date
      ? JSON.stringify({
          $and: [
            {
              [this.fieldName]: {
                $gte: {
                  __type: 'Date',
                  iso: startOfDay(this.value).toUTCString
                }
              }
            },
            {
              [this.fieldName]: {
                $lt: {
                  __type: 'Date',
                  iso: endOfDay(this.value).toUTCString
                }
              }
            }
          ]
        })
      : JSON.stringify({ [this.fieldName]: { $regex: this.value } });
  }
}

export interface LeanCloudResult<T extends Entity> {
  results: T[];
  count: number;
}

export interface LeanCloudParams {
  pageIndex: number;
  pageSize: number;
  sort: { [column: string]: Sort };
  filter: { [column: string]: string };
}
