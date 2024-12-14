import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="visible" 
         class="fixed bottom-4 right-4 p-4 rounded-lg shadow-lg transition-opacity duration-300"
         [ngClass]="{
           'bg-green-500': currentToast?.type === 'success',
           'bg-red-500': currentToast?.type === 'error',
           'bg-blue-500': currentToast?.type === 'info'
         }">
      <p class="text-white">{{ currentToast?.message }}</p>
    </div>
  `
})
export class ToastComponent implements OnInit {
  visible = false;
  currentToast: { message: string; type: string } | null = null;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toast$.subscribe(toast => {
      this.currentToast = toast;
      this.visible = true;
      setTimeout(() => {
        this.visible = false;
      }, 3000);
    });
  }
}