import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
const dropdownAnimation = trigger('dropdownAnimation', [
  state('open', style({
    height: '{{customHeight}}',
  }), { params: { customHeight: '*' }}),
  state('closed', style({
    height: '{{minHeight}}',
  }), { params: { minHeight: '66px' }}),
  transition('closed <=> open', [
    animate('300ms ease-in-out'),
  ]),
]);
@Component({
  selector: 'b2b-filters-dropdown',
  templateUrl: './filters-dropdown.component.html',
  styleUrls: ['./filters-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [dropdownAnimation]
})
export class FiltersDropdownComponent implements OnInit {
  @Input() title!: string;
  @Input() maxHeight?: number;
  @Input() menuIsOpen: boolean;
  @Input() selectedOption: any;
  @Input() options!: any[];
  @Input() openIsRestricted: boolean;
  @Output() changeOption: EventEmitter<void> = new EventEmitter<void>();
  constructor(private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
  }
  public resetSelected(e: any): void {
    e.stopPropagation();
    this.changeOption.emit();
    this.menuIsOpen = true;
  }
  openDropdown() {
    if (this.openIsRestricted) return;
    if (!this.selectedOption) {
      this.menuIsOpen = !this.menuIsOpen;
    }
  }
  dropdownIsClosed() {
    return !this.menuIsOpen && !this.selectedOption
  }
}
