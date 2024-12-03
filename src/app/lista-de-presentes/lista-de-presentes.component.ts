import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-lista-de-presentes',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './lista-de-presentes.component.html',
  styleUrl: './lista-de-presentes.component.scss'
})
export class ListaDePresentesComponent {


  items = [
    { id: 1, title: 'Sofá', category: 'casa', price: 1500, image: 'sofa.jpg' },
    { id: 2, title: 'Viagem para Paris', category: 'lua_de_mel', price: 10000, image: 'paris.jpg' },
    { id: 3, title: 'Jogo de Panelas', category: 'casa', price: 500, image: 'panelas.jpg' },
    { id: 4, title: 'Quadro Moderno', category: 'criativos', price: 300, image: 'quadro.jpg' },
  ];

  buttonActive: string = 'all'; 

  filteredItems: any[] = this.items; 

  filterItems(category: string) {
    this.buttonActive = category;
    if (category === 'all') {
      this.filteredItems = this.items; 
    } else {
      this.filteredItems = this.items.filter(item => item.category === category);
    }
  }

  buyItem(item: any) {
  }


}
