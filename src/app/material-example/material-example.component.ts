import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Component} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MaterialExampleService} from "./material-example.service";


export class CategoryItemNode {
  children: CategoryItemNode[] = [];
  item: string = '';
  value: string = '';
}

export class CategoryItemFlatNode {
  item: string = '';
  level: number = 1;
  expandable: boolean = false;
  value: string = '';
}

@Component({
  selector: 'app-material-example',
  templateUrl: 'material-example.component.html',
  styleUrls: ['material-example.component.scss'],
  providers: [MaterialExampleService],
  standalone: true,
  imports: [
    MatTreeModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
})
export class MaterialExampleComponent {
  public flatNodeMap = new Map<CategoryItemFlatNode, CategoryItemNode>();

  public nestedNodeMap = new Map<CategoryItemNode, CategoryItemFlatNode>();

  public treeControl: FlatTreeControl<CategoryItemFlatNode>;

  public treeFlattener: MatTreeFlattener<CategoryItemNode, CategoryItemFlatNode>;

  public dataSource: MatTreeFlatDataSource<CategoryItemNode, CategoryItemFlatNode>;

  public checklistSelection = new SelectionModel<CategoryItemFlatNode>(true);

  constructor(private _database: MaterialExampleService) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren,
    );
    this.treeControl = new FlatTreeControl<CategoryItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    _database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  public getLevel = (node: CategoryItemFlatNode) => node.level;

  public isExpandable = (node: CategoryItemFlatNode) => node.expandable;

  public getChildren = (node: CategoryItemNode): CategoryItemNode[] => node.children;

  public hasChild = (_: number, _nodeData: CategoryItemFlatNode) => _nodeData.expandable;

  public transformer = (node: CategoryItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.item === node.item ? existingNode : new CategoryItemFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
    flatNode.value = node.value;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  public descendantsAllSelected(node: CategoryItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => this.checklistSelection.isSelected(child));
    return descAllSelected;
  }

  public descendantsPartiallySelected(node: CategoryItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  public todoItemSelectionToggle(node: CategoryItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  public todoLeafItemSelectionToggle(node: CategoryItemFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  public checkAllParentsSelection(node: CategoryItemFlatNode): void {
    let parent: CategoryItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  public checkRootNodeSelection(node: CategoryItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  public getParentNode(node: CategoryItemFlatNode): CategoryItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  public save(): void {
    const selectedValues: string[] = this.checklistSelection.selected.map(selectedItem => selectedItem.value)
    // console.log(this.checklistSelection.selected);
    console.log(selectedValues)
  }
}
