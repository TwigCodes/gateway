import { Entity } from '@app/libs/entity';

export class Question extends Entity {
  title: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  objectId: string;
  constructor(init?: Partial<Question>) {
    super(init);
  }
  /**
   * get id
   */
  public get id() {
    return this.objectId;
  }
}
