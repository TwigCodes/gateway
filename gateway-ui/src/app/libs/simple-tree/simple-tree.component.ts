import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  TemplateRef,
  OnDestroy
} from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import {
  SimpleTreeNode,
  getFlatNodes,
  getFlatNodeStates
} from './simple-tree-node';
import { untilDestroy } from '../utils';
import { rotateEnterAnimation } from '../animations';

@Component({
  selector: 'ngx-simple-tree',
  templateUrl: './simple-tree.component.html',
  styleUrls: ['./simple-tree.component.scss'],
  animations: [rotateEnterAnimation]
})
export class SimpleTreeComponent implements OnInit, OnDestroy {
  @Input() dataSource: Observable<SimpleTreeNode[]>;
  @Input() menuTemplate: TemplateRef<any>;
  @Input() loadMoreTemplate: TemplateRef<any>;
  @Input() showLoadMore = false;
  @Output() nodeSelected = new EventEmitter();
  menuToggle: { [id: string]: boolean };
  _selectedNodeId: string;
  _treeNodeStates: { [id: string]: boolean };
  nestedTreeControl: NestedTreeControl<SimpleTreeNode>;
  nestedDataSource: MatTreeNestedDataSource<SimpleTreeNode>;

  ngOnInit(): void {
    this.nestedDataSource = new MatTreeNestedDataSource();

    this.dataSource.pipe(untilDestroy(this)).subscribe(data => {
      this._treeNodeStates = {
        ...getFlatNodeStates(data),
        ...this._treeNodeStates
      };
      this.nestedDataSource.data = data;
      this.refreshTree();
      const flatData = getFlatNodes(this.nestedDataSource.data);
      if (!this.nestedTreeControl) return;
      for (const key in flatData) {
        if (flatData.hasOwnProperty(key)) {
          const expand = this._treeNodeStates[key];
          if (expand) {
            this.nestedTreeControl.expand(flatData[key].node);
          } else {
            this.nestedTreeControl.collapse(flatData[key].node);
          }
        }
      }
    });
    this.nestedTreeControl = new NestedTreeControl<SimpleTreeNode>(
      this._getChildren
    );
  }
  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
  }
  hasNestedChild = (_: number, nodeData: SimpleTreeNode) =>
    nodeData.children.length > 0;

  private _getChildren = (node: SimpleTreeNode) => node.children;

  handleNodeSelect(node: SimpleTreeNode) {
    this.nodeSelected.emit(node.value);
    this._selectedNodeId = node.id;
  }

  handleToggleMenu(state: boolean, id: string) {
    this.menuToggle = { [id]: state };
  }

  refreshTree() {
    const _data = this.nestedDataSource.data;
    this.nestedDataSource.data = null;
    this.nestedDataSource.data = _data;
  }

  toggleTreeNodeState(node: SimpleTreeNode) {
    this._treeNodeStates = {
      ...this._treeNodeStates,
      [node.id]: this.nestedTreeControl.isExpanded(node)
    };
  }
}
