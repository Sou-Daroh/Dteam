import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ScrollToTopService } from './services/scroll-to-top.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    RouterOutlet, 
    CommonModule,
    HeaderComponent,
    FooterComponent
  ]
})
export class AppComponent {
  title = 'Dteam';
  
  constructor(private scrollToTopService: ScrollToTopService) {}
}