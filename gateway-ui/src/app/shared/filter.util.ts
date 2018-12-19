export interface FilterField {
  label: string;
  name: string;
}

export enum OperatorType {
  EQUALS,
  NOT_EQUAL,
  CONTAINS,
  START_WITH,
  END_WITH,
  GREATER_THAN,
  LESS_THAN,
  GREATER_THAN_EQUALS,
  LESS_THAN_EQUALS,
  RANGE
}

export interface Operator {
  label: string;
  type: OperatorType;
}
export interface FilterValue {
  value: string;
  rangeValueTop?: string;
}

export class QueryPart {
  private field: FilterField;
  private op: Operator;
  private filterValue: FilterValue;
  constructor(builder: QueryPartBuilder) {
    this.field = builder.getField();
    this.op = builder.getOp();
    this.filterValue = builder.getFilterValue();
  }
  toLabel() {
    switch (this.op.type) {
      case OperatorType.EQUALS: {
        return `${this.field.label} 等于 ${this.filterValue.value}`;
      }
      case OperatorType.NOT_EQUAL: {
        return `!(${this.field.label} 不等于 ${this.filterValue.value})`;
      }
      case OperatorType.START_WITH: {
        return `${this.field.label} 以 ${this.filterValue.value} 开头`;
      }
      case OperatorType.END_WITH: {
        return `${this.field.label} 以 ${this.filterValue.value} 结束`;
      }
      case OperatorType.CONTAINS: {
        return `${this.field.label} 包含 ${this.filterValue.value}`;
      }
      case OperatorType.GREATER_THAN: {
        return `${this.field.label} 大于 ${this.filterValue.value}`;
      }
      case OperatorType.LESS_THAN: {
        return `${this.field.label} 小于 ${this.filterValue.value}`;
      }
      case OperatorType.GREATER_THAN_EQUALS: {
        return `${this.field.label} 大于等于 ${this.filterValue.value}`;
      }
      case OperatorType.LESS_THAN_EQUALS: {
        return `${this.field.label} 小于等于 ${this.filterValue.value}`;
      }
      case OperatorType.RANGE: {
        return `${this.field.label} 在区间 ${this.filterValue.value} 到 ${
          this.filterValue.rangeValueTop
        } 之间`;
      }
      default:
        return;
    }
  }
  toString(): string {
    if (!this.op) {
      return;
    }
    switch (this.op.type) {
      case OperatorType.EQUALS: {
        return `${this.field.name}:"${this.filterValue.value}"`;
      }
      case OperatorType.NOT_EQUAL: {
        return `!(${this.field.name}:${this.filterValue.value})`;
      }
      case OperatorType.START_WITH: {
        return `${this.field.name}:${this.filterValue.value}*`;
      }
      case OperatorType.END_WITH: {
        return `${this.field.name}:*${this.filterValue.value}`;
      }
      case OperatorType.CONTAINS: {
        return `${this.field.name}:*${this.filterValue.value}*`;
      }
      case OperatorType.GREATER_THAN: {
        return `${this.field.name}:{${this.filterValue.value} TO *}`;
      }
      case OperatorType.LESS_THAN: {
        return `${this.field.name}:{* TO ${this.filterValue.value}}`;
      }
      case OperatorType.GREATER_THAN_EQUALS: {
        return `${this.field.name}:[${this.filterValue.value} TO *]`;
      }
      case OperatorType.LESS_THAN_EQUALS: {
        return `${this.field.name}:[* TO ${this.filterValue.value}]`;
      }
      case OperatorType.RANGE: {
        return `${this.field.name}:[${this.filterValue.value} TO ${
          this.filterValue.rangeValueTop
        }]`;
      }
      default:
        return;
    }
  }
}

export class QueryPartBuilder {
  private field: FilterField;
  private op: Operator;
  private filterValue: FilterValue;

  public getField(): FilterField {
    return this.field;
  }

  public Field(field: FilterField): QueryPartBuilder {
    this.field = field;
    return this;
  }

  public getOp(): Operator {
    return this.op;
  }

  public Op(op: Operator): QueryPartBuilder {
    this.op = op;
    return this;
  }

  public getFilterValue(): FilterValue {
    return this.filterValue;
  }

  public FilterValue(filterValue: FilterValue): QueryPartBuilder {
    this.filterValue = filterValue;
    return this;
  }

  build(): QueryPart {
    return new QueryPart(this);
  }
}

export class QueryStringBuilder {
  private queryString: string;

  public QueryParts(queryParts: QueryPart[]): QueryStringBuilder {
    queryParts.forEach(
      part =>
        (this.queryString =
          typeof this.queryString === 'undefined'
            ? part.toString()
            : `${this.queryString} AND ${part.toString()}`)
    );
    return this;
  }

  public QueryPart(queryPart: QueryPart): QueryStringBuilder {
    this.queryString +=
      typeof this.queryString === 'undefined'
        ? queryPart.toString()
        : ` AND ${queryPart.toString()}`;
    return this;
  }

  public build(): string {
    return this.queryString;
  }
}

export const OP_EQUALS: Operator = { label: '等于', type: OperatorType.EQUALS };
export const OP_NOTEQUAL: Operator = {
  label: '不等于',
  type: OperatorType.NOT_EQUAL
};
export const OP_START_WITH: Operator = {
  label: '以...开头',
  type: OperatorType.START_WITH
};
export const OP_END_WITH: Operator = {
  label: '以...结尾',
  type: OperatorType.END_WITH
};
export const OP_CONTAINS: Operator = {
  label: '包含',
  type: OperatorType.CONTAINS
};
export const OP_GREATER_THAN: Operator = {
  label: '大于',
  type: OperatorType.GREATER_THAN
};
export const OP_GREATER_THAN_EQUALS: Operator = {
  label: '大于等于',
  type: OperatorType.GREATER_THAN_EQUALS
};
export const OP_LESS_THAN: Operator = {
  label: '小于',
  type: OperatorType.LESS_THAN
};
export const OP_LESS_THAN_EQUALS: Operator = {
  label: '小于等于',
  type: OperatorType.LESS_THAN_EQUALS
};
export const OP_RANGE: Operator = {
  label: '在区间之中',
  type: OperatorType.RANGE
};
