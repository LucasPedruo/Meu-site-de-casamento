import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; // Importa MatDialog
import { BuyItemModalComponent } from '../buy-item-modal/buy-item-modal.component'; // Importa a modal

@Component({
  selector: 'app-lista-de-presentes',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './lista-de-presentes.component.html',
  styleUrls: ['./lista-de-presentes.component.scss'],
})
export class ListaDePresentesComponent {
  constructor(private router: Router, private dialog: MatDialog) { }

  popupVisible = false;

  items = [
    { id: 0, title: 'TESTE', category: 'casa', price: 0.01, image: 'https://ellycandido.com.br/wp-content/uploads/2024/08/Como-funciona-um-casamento-na-praia-1024x683.jpg', status: 'disponivel' },
    { id: 1, title: 'Sofá', category: 'casa', price: 1500, image: 'https://ellycandido.com.br/wp-content/uploads/2024/08/Como-funciona-um-casamento-na-praia-1024x683.jpg', status: 'disponivel' },
    { id: 2, title: 'Viagem para Paris', category: 'lua_de_mel', price: 10000, image: 'https://ellycandido.com.br/wp-content/uploads/2024/08/Como-funciona-um-casamento-na-praia-1024x683.jpg', status: 'disponivel' },
    { id: 3, title: 'Jogo de Panelas', category: 'casa', price: 500, image: 'https://ellycandido.com.br/wp-content/uploads/2024/08/Como-funciona-um-casamento-na-praia-1024x683.jpg', status: 'disponivel' },
    { id: 4, title: 'Quadro Moderno', category: 'criativos', price: 300, image: 'https://ellycandido.com.br/wp-content/uploads/2024/08/Como-funciona-um-casamento-na-praia-1024x683.jpg', status: 'disponivel' },
    { id: 5, title: 'Mesa de Jantar', category: 'casa', price: 2500, image: 'https://ellycandido.com.br/wp-content/uploads/2024/08/Como-funciona-um-casamento-na-praia-1024x683.jpg', status: 'disponivel' },
    { id: 6, title: 'Cafeteira Elétrica', category: 'cozinha', price: 350, image: 'https://ellycandido.com.br/wp-content/uploads/2024/08/Como-funciona-um-casamento-na-praia-1024x683.jpg', status: 'disponivel' },
    { id: 7, title: 'Tênis Esportivo', category: 'esporte', price: 450, image: 'https://ellycandido.com.br/wp-content/uploads/2024/08/Como-funciona-um-casamento-na-praia-1024x683.jpg', status: 'indisponivel' },
    { id: 8, title: 'Smartphone', category: 'tecnologia', price: 3000, image: 'https://ellycandido.com.br/wp-content/uploads/2024/08/Como-funciona-um-casamento-na-praia-1024x683.jpg', status: 'disponivel' },
    { id: 9, title: 'Livro de Romance', category: 'livros', price: 40, image: 'https://ellycandido.com.br/wp-content/uploads/2024/08/Como-funciona-um-casamento-na-praia-1024x683.jpg', status: 'disponivel' },
    { id: 10, title: 'Fones de Ouvido', category: 'tecnologia', price: 200, image: 'https://ellycandido.com.br/wp-content/uploads/2024/08/Como-funciona-um-casamento-na-praia-1024x683.jpg', status: 'disponivel' },
    { id: 11, title: 'Relógio de Parede', category: 'casa', price: 120, image: 'https://ellycandido.com.br/wp-content/uploads/2024/08/Como-funciona-um-casamento-na-praia-1024x683.jpg', status: 'disponivel' },
    { id: 12, title: 'Bicicleta', category: 'esporte', price: 1200, image: 'https://ellycandido.com.br/wp-content/uploads/2024/08/Como-funciona-um-casamento-na-praia-1024x683.jpg', status: 'indisponivel' },
    { id: 13, title: 'Jogo de Cama', category: 'casa', price: 180, image: 'https://ellycandido.com.br/wp-content/uploads/2024/08/Como-funciona-um-casamento-na-praia-1024x683.jpg', status: 'disponivel' },
    { id: 14, title: 'Óculos de Sol', category: 'moda', price: 600, image: 'https://ellycandido.com.br/wp-content/uploads/2024/08/Como-funciona-um-casamento-na-praia-1024x683.jpg', status: 'disponivel' },
    { id: 15, title: 'Tablet', category: 'tecnologia', price: 2500, image: 'https://ellycandido.com.br/wp-content/uploads/2024/08/Como-funciona-um-casamento-na-praia-1024x683.jpg', status: 'indisponivel' },
    { id: 16, title: 'Garrafa Térmica', category: 'cozinha', price: 80, image: 'https://ellycandido.com.br/wp-content/uploads/2024/08/Como-funciona-um-casamento-na-praia-1024x683.jpg', status: 'disponivel' },
    { id: 17, title: 'Patins In-Line', category: 'esporte', price: 700, image: 'https://ellycandido.com.br/wp-content/uploads/2024/08/Como-funciona-um-casamento-na-praia-1024x683.jpg', status: 'disponivel' },
    { id: 18, title: 'Monitor 4K', category: 'tecnologia', price: 2000, image: 'https://ellycandido.com.br/wp-content/uploads/2024/08/Como-funciona-um-casamento-na-praia-1024x683.jpg', status: 'disponivel' },
    { id: 19, title: 'Câmera Fotográfica', category: 'tecnologia', price: 3500, image: 'https://ellycandido.com.br/wp-content/uploads/2024/08/Como-funciona-um-casamento-na-praia-1024x683.jpg', status: 'indisponivel' },
    { id: 20, title: 'Abajur de Mesa', category: 'casa', price: 150, image: 'https://ellycandido.com.br/wp-content/uploads/2024/08/Como-funciona-um-casamento-na-praia-1024x683.jpg', status: 'disponivel' },
    { id: 21, title: 'Cadeira Gamer', category: 'tecnologia', price: 1200, image: 'https://ellycandido.com.br/wp-content/uploads/2024/08/Como-funciona-um-casamento-na-praia-1024x683.jpg', status: 'disponivel' },
    { id: 22, title: 'Mochila Executiva', category: 'moda', price: 300, image: 'https://ellycandido.com.br/wp-content/uploads/2024/08/Como-funciona-um-casamento-na-praia-1024x683.jpg', status: 'disponivel' },
    { id: 23, title: 'Churrasqueira Portátil', category: 'casa', price: 500, image: 'https://ellycandido.com.br/wp-content/uploads/2024/08/Como-funciona-um-casamento-na-praia-1024x683.jpg', status: 'disponivel' },
    { id: 24, title: 'Piscina Inflável', category: 'casa', price: 1000, image: 'https://ellycandido.com.br/wp-content/uploads/2024/08/Como-funciona-um-casamento-na-praia-1024x683.jpg', status: 'indisponivel' },
    { id: 25, title: 'Kit de Ferramentas', category: 'casa', price: 250, image: 'https://ellycandido.com.br/wp-content/uploads/2024/08/Como-funciona-um-casamento-na-praia-1024x683.jpg', status: 'disponivel' },
    { id: 26, title: 'Batedeira Planetária', category: 'cozinha', price: 400, image: 'https://ellycandido.com.br/wp-content/uploads/2024/08/Como-funciona-um-casamento-na-praia-1024x683.jpg', status: 'disponivel' },
    { id: 27, title: 'Carrinho de Bebê', category: 'infantil', price: 900, image: 'https://ellycandido.com.br/wp-content/uploads/2024/08/Como-funciona-um-casamento-na-praia-1024x683.jpg', status: 'disponivel' },
    { id: 28, title: 'Boneca de Pano', category: 'infantil', price: 100, image: 'https://ellycandido.com.br/wp-content/uploads/2024/08/Como-funciona-um-casamento-na-praia-1024x683.jpg', status: 'disponivel' },
    { id: 29, title: 'Suporte para TV', category: 'casa', price: 150, image: 'https://ellycandido.com.br/wp-content/uploads/2024/08/Como-funciona-um-casamento-na-praia-1024x683.jpg', status: 'disponivel' },
    { id: 30, title: 'Climatizador de Ar', category: 'tecnologia', price: 800, image: 'https://ellycandido.com.br/wp-content/uploads/2024/08/Como-funciona-um-casamento-na-praia-1024x683.jpg', status: 'indisponivel' }
  ];




  buttonActive: string = 'all';

  filteredItems: any[] = this.items;

  filterItems(category: string) {
    this.buttonActive = category;
    if (category === 'all') {
      this.filteredItems = this.items;
    } else {
      this.filteredItems = this.items.filter((item) => item.category === category);
    }
  }

  openBuyItemModal(item: any) {
    this.dialog.open(BuyItemModalComponent, {
      width: '1000px',
      height: '500px',
      data: { item },
    });
  }

}
