import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-lista-de-presentes',
    imports: [
      CommonModule
    ],
    standalone: true,
    templateUrl: './lista-de-presentes.component.html',
    styleUrl: './lista-de-presentes.component.scss'
})
export class ListaDePresentesComponent {

  constructor(private router: Router) {}

  popupVisible = false

 items = [
    { id: 1, title: 'Sofá', category: 'casa', price: 1500, image: 'sofa.jpg', status: 'disponivel' },
    { id: 2, title: 'Viagem para Paris', category: 'lua_de_mel', price: 10000, image: 'paris.jpg', status: 'disponivel' },
    { id: 3, title: 'Jogo de Panelas', category: 'casa', price: 500, image: 'panelas.jpg', status: 'disponivel' },
    { id: 4, title: 'Quadro Moderno', category: 'criativos', price: 300, image: 'quadro.jpg', status: 'disponivel' },
    { id: 5, title: 'Mesa de Jantar', category: 'casa', price: 2500, image: 'mesa.jpg', status: 'disponivel' },
    { id: 6, title: 'Cafeteira Elétrica', category: 'cozinha', price: 350, image: 'cafeteira.jpg', status: 'disponivel' },
    { id: 7, title: 'Tênis Esportivo', category: 'esporte', price: 450, image: 'tenis.jpg', status: 'indisponivel' },
    { id: 8, title: 'Smartphone', category: 'tecnologia', price: 3000, image: 'smartphone.jpg', status: 'disponivel' },
    { id: 9, title: 'Livro de Romance', category: 'livros', price: 40, image: 'livro.jpg', status: 'disponivel' },
    { id: 10, title: 'Fones de Ouvido', category: 'tecnologia', price: 200, image: 'fones.jpg', status: 'disponivel' },
    { id: 11, title: 'Relógio de Parede', category: 'casa', price: 120, image: 'relogio.jpg', status: 'disponivel' },
    { id: 12, title: 'Bicicleta', category: 'esporte', price: 1200, image: 'bicicleta.jpg', status: 'indisponivel' },
    { id: 13, title: 'Jogo de Cama', category: 'casa', price: 180, image: 'cama.jpg', status: 'disponivel' },
    { id: 14, title: 'Óculos de Sol', category: 'moda', price: 600, image: 'oculos.jpg', status: 'disponivel' },
    { id: 15, title: 'Tablet', category: 'tecnologia', price: 2500, image: 'tablet.jpg', status: 'indisponivel' },
    { id: 16, title: 'Garrafa Térmica', category: 'cozinha', price: 80, image: 'garrafa.jpg', status: 'disponivel' },
    { id: 17, title: 'Patins In-Line', category: 'esporte', price: 700, image: 'patins.jpg', status: 'disponivel' },
    { id: 18, title: 'Monitor 4K', category: 'tecnologia', price: 2000, image: 'monitor.jpg', status: 'disponivel' },
    { id: 19, title: 'Câmera Fotográfica', category: 'tecnologia', price: 3500, image: 'camera.jpg', status: 'indisponivel' },
    { id: 20, title: 'Abajur de Mesa', category: 'casa', price: 150, image: 'abajur.jpg', status: 'disponivel' },
    { id: 21, title: 'Cadeira Gamer', category: 'tecnologia', price: 1200, image: 'cadeira.jpg', status: 'disponivel' },
    { id: 22, title: 'Mochila Executiva', category: 'moda', price: 300, image: 'mochila.jpg', status: 'disponivel' },
    { id: 23, title: 'Churrasqueira Portátil', category: 'casa', price: 500, image: 'churrasqueira.jpg', status: 'disponivel' },
    { id: 24, title: 'Piscina Inflável', category: 'casa', price: 1000, image: 'piscina.jpg', status: 'indisponivel' },
    { id: 25, title: 'Kit de Ferramentas', category: 'casa', price: 250, image: 'ferramentas.jpg', status: 'disponivel' },
    { id: 26, title: 'Batedeira Planetária', category: 'cozinha', price: 400, image: 'batedeira.jpg', status: 'disponivel' },
    { id: 27, title: 'Carrinho de Bebê', category: 'infantil', price: 900, image: 'carrinho.jpg', status: 'disponivel' },
    { id: 28, title: 'Boneca de Pano', category: 'infantil', price: 100, image: 'boneca.jpg', status: 'disponivel' },
    { id: 29, title: 'Suporte para TV', category: 'casa', price: 150, image: 'suporte.jpg', status: 'disponivel' },
    { id: 30, title: 'Climatizador de Ar', category: 'tecnologia', price: 800, image: 'climatizador.jpg', status: 'indisponivel' }
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
    this.popupVisible = true;
  }
}