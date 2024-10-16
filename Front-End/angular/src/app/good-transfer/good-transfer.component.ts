import { Component } from '@angular/core';

@Component({
  selector: 'app-good-transfer',
  templateUrl: './good-transfer.component.html',
  styleUrls: ['./good-transfer.component.scss']
})
export class GoodTransferComponent {
  
  selectedRow: HTMLElement | null = null;

  // Hàm để xử lý click vào hàng
  selectRow(event: Event) {
    const clickedRow = event.currentTarget as HTMLElement;

    // Nếu đã chọn hàng trước đó, xóa class 'selected-good-transfer' khỏi hàng cũ
    if (this.selectedRow) {
      this.selectedRow.classList.remove('selected-good-transfer');
    }

    // Thêm class 'selected-good-transfer' vào hàng mới được click
    clickedRow.classList.add('selected-good-transfer');
    this.selectedRow = clickedRow;
  }
}
