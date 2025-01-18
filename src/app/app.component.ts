import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { BuyItemModalComponent } from './buy-item-modal/buy-item-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Larissa e Lucas';
  isScrolled = false;

  constructor(private dialog: MatDialog) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 10;
  }

  openBuyItemModal(item: any) {
    this.dialog.open(BuyItemModalComponent, {
      width: '400px',
      data: { item },
    });
  }

  showMenu : boolean = false;
  toggleMenu(){
    this.showMenu =!this.showMenu;
  }

}
