export interface SimpleTreeNode {
  id: string;
  label: string;
  value: any;
  children: SimpleTreeNode[];
}

export interface FlatNode {
  node: SimpleTreeNode;
  expand: boolean;
}

export const getFlatNodes = (
  nodes: SimpleTreeNode[]
): { [id: string]: FlatNode } => {
  return nodes.reduce((acc, curr) => {
    const flatNodes = getFlatNodes(curr.children);
    return {
      ...acc,
      ...flatNodes,
      [curr.id]: { node: curr, expand: false }
    };
  }, {});
};
