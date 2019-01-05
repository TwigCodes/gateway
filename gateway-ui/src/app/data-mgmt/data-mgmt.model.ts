import { Entity } from '@app/libs/entity';

export class Question extends Entity {
  title: string;
  type: string;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
  objectId: string;
  /**
   * get id
   */
  public get id() {
    return this.objectId;
  }
}
