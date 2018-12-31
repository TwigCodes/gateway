import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  TemplateRef
} from '@angular/core';
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
  @Input() menuTemplate: TemplateRef<any>;
  @Input() loadMoreTemplate: TemplateRef<any>;
  @Input() showLoadMore = false;
  @Output() nodeSelected = new EventEmitter();
  menuToggle: { [id: string]: boolean };
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
}
