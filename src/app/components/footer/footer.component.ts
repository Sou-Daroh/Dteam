import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="bg-steam-dark py-4 mt-8">
      <div class="container mx-auto px-4 text-center">
        <p class="text-steam-text">&copy; 2024 Dteam. All rights reserved.</p>
      </div>
    </footer>
  `,
})
export class FooterComponent {}