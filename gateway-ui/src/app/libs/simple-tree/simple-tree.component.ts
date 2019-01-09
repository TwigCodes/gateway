import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  TemplateRef,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource, MatTree } from '@angular/material';
import { Observable } from 'rxjs';
import { SimpleTreeNode, getFlatNodes, FlatNode } from './simple-tree-node';
import { untilDestroy } from '../utils';

@Component({
  selector: 'ngx-simple-tree',
  templateUrl: './simple-tree.component.html',
  styleUrls: ['./simple-tree.component.scss']
})
export class SimpleTreeComponent implements OnInit, OnDestroy {
  @Input() dataSource: Observable<SimpleTreeNode[]>;
  @Input() menuTemplate: TemplateRef<any>;
  @Input() loadMoreTemplate: TemplateRef<any>;
  @Input() showLoadMore = false;
  @Output() nodeSelected = new EventEmitter();
  @ViewChild('simpleTree') simpleTree: MatTree<SimpleTreeNode>;
  menuToggle: { [id: string]: boolean };
  _selectedNodeId: string;
  _treeNodeStates: { [id: string]: FlatNode };
  nestedTreeControl: NestedTreeControl<SimpleTreeNode>;
  nestedDataSource: MatTreeNestedDataSource<SimpleTreeNode>;

  ngOnInit(): void {
    this.nestedDataSource = new MatTreeNestedDataSource();

    this.dataSource.pipe(untilDestroy(this)).subscribe(data => {
      const flatData = getFlatNodes(data);
      this._treeNodeStates = { ...flatData, ...this._treeNodeStates };
      this.nestedDataSource.data = data;
      for (const key in flatData) {
        if (flatData.hasOwnProperty(key)) {
          const flatNode = this._treeNodeStates[key];
          if (flatNode.expand) {
            this.nestedTreeControl.expand(flatData[key].node);
          } else {
            this.nestedTreeControl.collapse(flatData[key].node);
          }
        }
      }
      this.refreshTree();
    });
    this.nestedTreeControl = new NestedTreeControl<SimpleTreeNode>(
      this._getChildren
    );
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
  hasNestedChild = (_: number, nodeData: SimpleTreeNode) =>
    nodeData.children.length > 0;
  loadMore = (index: number, _: SimpleTreeNode) =>
    this.showLoadMore && index === this.nestedDataSource.data.length - 1;

  private _getChildren = (node: SimpleTreeNode) => node.children;

  handleNodeSelect(node: SimpleTreeNode) {
    this.nodeSelected.emit(node.value);
    this._selectedNodeId = node.id;
  }

  handleToggleMenu(state: boolean, id: string) {
    this.menuToggle = { [id]: state };
  }

  refreshTree() {
    let _data = this.nestedDataSource.data;
    this.nestedDataSource.data = null;
    this.nestedDataSource.data = _data;
  }

  toggleTreeNodeState(node: SimpleTreeNode) {
    this._treeNodeStates = {
      ...this._treeNodeStates,
      [node.id]: {
        ...this._treeNodeStates[node.id],
        expand: this.nestedTreeControl.isExpanded(node)
      }
    };
  }
}
