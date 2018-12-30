import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { SimpleTreeNode } from './simple-tree-node';

@Component({
  selector: 'ngx-simple-tree',
  templateUrl: './simple-tree.component.html',
  styleUrls: ['./simple-tree.component.scss']
})
export class SimpleTreeComponent implements OnInit {
  @Input() dataSource: Observable<SimpleTreeNode[]>;
  @Output() nodeSelected = new EventEmitter();
  _selectedNodeId: string;
  nestedTreeControl: NestedTreeControl<SimpleTreeNode>;
  nestedDataSource: MatTreeNestedDataSource<SimpleTreeNode>;

  ngOnInit(): void {
    this.nestedDataSource = new MatTreeNestedDataSource();

    this.dataSource.subscribe(data => (this.nestedDataSource.data = data));
    this.nestedTreeControl = new NestedTreeControl<SimpleTreeNode>(
      this._getChildren
    );
  }
  hasNestedChild = (_: number, nodeData: SimpleTreeNode) =>
    nodeData.children.length > 0;

  private _getChildren = (node: SimpleTreeNode) => node.children;

  handleNodeSelect(node: SimpleTreeNode) {
    this.nodeSelected.emit(node.value);
    this._selectedNodeId = node.id;
  }
}
