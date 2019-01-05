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
  value: string;

  /**
   * constructor
   */
  public constructor(fieldName: string, value: string) {
    this.fieldName = fieldName;
    this.value = value;
  }

  /**
   * expression
   */
  public get expression(): string {
    return JSON.stringify({ [this.fieldName]: { $regex: this.value } });
  }
}

export interface LeanCloudResult<T extends Entity> {
  results: T[];
  count: number;
}
