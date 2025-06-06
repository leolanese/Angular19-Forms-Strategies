import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Item, items } from '../mocks/mocks-items';

@Component({
  selector: 'app-signal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet
  ],
  template: `
    <h2>Signal Forms</h2>
    <div class="container">
      <h2>Items</h2>
      <ul>
        <li *ngFor="let item of items(); let i = index">
          <input type="checkbox" [(ngModel)]="item.isChecked">
          <span>{{ item.name }}</span>
          <div>
            <button (click)="modifyItem(i)">Edit</button>
            <button (click)="deleteItem(i)">Delete</button>
          </div>
        </li>
      </ul>
      <div class="add-item">
        <input type="text" [(ngModel)]="newItemName" placeholder="Enter item name">
        <button class="add-button" (click)="addItem()">Add Item</button>
        <span>{{ newItemName }}</span>
      </div>
    </div>
  `,
  styleUrls: ['../ReactiveForm/reactive.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalComponent {
  // Signals for items list
  items = signal<Item[]>([...items]);

  // Template form bindings
  newItemName = '';

  addItem(): void {
    if (this.newItemName.trim()) {
      this.items.update(items => [...items, { name: this.newItemName.trim(), isChecked: false }]);
      this.newItemName = '';
    } else {
      alert('Item name cannot be empty.');
    }
  }

  deleteItem(index: number): void {
    this.items.update(items => items.filter((_, i) => i !== index));
  }

  modifyItem(index: number): void {
    const newName = prompt('Modify Item Name:', this.items()[index].name);
    if (newName?.trim()) {
      this.items.update(items => 
        items.map((item, i) => i === index ? { ...item, name: newName.trim() } : item)
      );
    } else {
      alert('Item name cannot be empty.');
    }
  }
}