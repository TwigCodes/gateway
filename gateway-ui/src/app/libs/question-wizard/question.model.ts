export interface Option {
  label: string;
  value: object;
}

export interface Question {
  id: string;
  title: string;
  type: string;
  displayOrder: number;
  options?: Option[];
}
