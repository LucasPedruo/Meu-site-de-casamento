import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
export class ListaDePresentesComponent implements OnInit {
  constructor(private router: Router, private dialog: MatDialog) { }

  popupVisible = false;
  itemsPerPage = 12;
  currentPage = 0;

  items = [
    { id: 0, title: 'teste', category: 'casa', price: 0.1, image: 'https://images.tcdn.com.br/img/img_prod/481109/estante_home_theater_para_tv_ate_70_polegadas_com_porta_correr_220_cm_guaruja_permobili_nature_grafi_123460817_1_9793237c98201a1523fea2a4043f14ef.jpg', status: 'disponivel' },
    { id: 1, title: 'Estante', category: 'casa', price: 900, image: 'https://images.tcdn.com.br/img/img_prod/481109/estante_home_theater_para_tv_ate_70_polegadas_com_porta_correr_220_cm_guaruja_permobili_nature_grafi_123460817_1_9793237c98201a1523fea2a4043f14ef.jpg', status: 'disponivel' },
    { id: 2, title: 'Televisão', category: 'casa', price: 2273, image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6', status: 'disponivel' },
    { id: 3, title: 'Tapete', category: 'casa', price: 390, image: 'https://images.unsplash.com/photo-1575414003591-ece8d0416c7a', status: 'disponivel' },
    { id: 4, title: 'Cortina', category: 'casa', price: 590, image: 'https://cdn.awsli.com.br/2500x2500/1060/1060865/produto/161736078/promacal-3mb-38-ktqlij.jpg', status: 'disponivel' },
    { id: 5, title: 'Pendente de teto', category: 'casa', price: 369, image: 'https://m.media-amazon.com/images/I/61d+0jPmZiL._AC_UF894,1000_QL80_.jpg', status: 'disponivel' },
    { id: 6, title: 'Ar-condicionado', category: 'casa', price: 1998, image: 'https://habitacional.com.br/wp-content/uploads/2021/02/cuidados-ao-instalar-ar-condicionado-em-seu-apartamento.webp  ', status: 'disponivel' },
    { id: 7, title: 'Tranca de porta (Digital)', category: 'casa', price: 399, image: 'https://images.unsplash.com/photo-1558002038-1055907df827', status: 'disponivel' },
    { id: 8, title: 'Mesa de jantar', category: 'casa', price: 1295, image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200', status: 'disponivel' },
    { id: 9, title: 'Jogo com 4 cadeiras', category: 'casa', price: 2150, image: 'https://http2.mlstatic.com/D_NQ_NP_814963-MLB72140093158_102023-O.webp', status: 'disponivel' },
    { id: 10, title: 'Toalha de mesa', category: 'casa', price: 200, image: 'https://casabergan.fbitsstatic.net/img/p/toalha-de-mesa-quadrada-dohler-athenas-classicos-de-natal-4-lugares-1-40m-x-1-40m-152325/344008.jpg?w=1000&h=1000&v=no-value', status: 'disponivel' },
    { id: 11, title: 'Lustre', category: 'casa', price: 300, image: 'https://cdn.dlojavirtual.com/static1/102182/sku/lustre-pendente-pendente-lustre-cristal-legitimo-classica-sala-jantar-quarto-p-1731078998976.jpg', status: 'disponivel' },
    { id: 12, title: 'Geladeira', category: 'casa', price: 4300, image: 'https://cozinhaflor.com.br/wp-content/uploads/2024/04/qual-a-melhor-geladeira-side-by-side.webp', status: 'disponivel' },
    { id: 13, title: 'Robo aspirador de pó', category: 'casa', price: 1150, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdJ9cR1XOBgWeiJ176gPiQMKLcGVZamoFdaQ&s', status: 'disponivel' },
    { id: 14, title: 'Lava-louças', category: 'casa', price: 2029, image: 'https://acdn.mitiendanube.com/stores/272/552/products/lava-loucas-de-embutir-14-servicos-tecno-vintage-220v-td14exdv2-51-cf2d760831aa6884a516854573705918-1024-1024.jpg', status: 'disponivel' },
    { id: 15, title: 'Panela de pressão', category: 'casa', price: 200, image: 'https://http2.mlstatic.com/D_Q_NP_934718-MLU78023693073_072024-O.webp', status: 'disponivel' },
    { id: 16, title: 'Cafeteira', category: 'casa', price: 200, image: 'https://cdn.sistemawbuy.com.br/arquivos/f8d1f4a04e988aeb5f9660e041392be7/produtos/65d7a20b25237/101db-cafeteira-expresso-21-bar-1350w-telefunken-roma-pro-110v-06-65d7a212796da.jpg', status: 'disponivel' },
    { id: 17, title: 'Jogo de assadeira', category: 'casa', price: 170, image: 'https://cdn.awsli.com.br/2500x2500/2202/2202636/produto/164806188715b8b7df3.jpg', status: 'disponivel' },
    { id: 18, title: 'Jogo de pirex', category: 'casa', price: 129, image: 'https://a-static.mlcdn.com.br/1500x1500/conjunto-de-assadeiras-de-vidro-sempre-quadrado-3-pecas/magazineluiza/215533000/f5ca2610b8952cc906e302bec4948bee.jpg', status: 'disponivel' },
    { id: 19, title: 'Escorredor de massa', category: 'casa', price: 25, image: 'https://images.tcdn.com.br/img/img_prod/641157/escorredor_de_massas_76_1_20180718212557.jpg', status: 'disponivel' },
    { id: 20, title: 'Abridor de lata', category: 'casa', price: 15, image: 'https://cdn.awsli.com.br/618/618763/produto/16759328683bc7ca0e1.jpg', status: 'disponivel' },
    { id: 21, title: 'Porta detergente', category: 'casa', price: 30, image: 'https://images.tcdn.com.br/img/img_prod/689809/porta_detergente_completo_6977_plasutil_2869_1_20190527210106.jpg', status: 'disponivel' },
    { id: 22, title: 'Potes de armazenamento', category: 'casa', price: 500, image: 'https://down-br.img.susercontent.com/file/br-11134207-7r98o-lu0ressazvro12', status: 'disponivel' },
    { id: 23, title: 'Porta tempeiros', category: 'casa', price: 180, image: 'https://images.unsplash.com/photo-1509448613959-44d527dd5d86', status: 'disponivel' },
    { id: 24, title: 'Ralador', category: 'casa', price: 24, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkchkX0yikO60R_MTey_8QrzliRJYwuhHfDg&s', status: 'disponivel' },
    { id: 25, title: 'Lixeira', category: 'casa', price: 300, image: 'https://cdn.awsli.com.br/600x450/1358/1358824/produto/23929103689aaf47da9.jpg', status: 'disponivel' },
    { id: 26, title: 'Cooktop', category: 'casa', price: 1300, image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f', status: 'disponivel' },
    { id: 27, title: 'Sanduicheira', category: 'casa', price: 250, image: 'https://lojasafubra.vtexassets.com/arquivos/ids/192137-800-800?v=638300485604330000&width=800&height=800&aspect=true', status: 'disponivel' },
    { id: 28, title: 'Organizador de gaveta', category: 'casa', price: 250, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOk6Qe118g8jQPQINHRreltwXGOMHGDxKdtNVe7lXETWyPHwGbYDIuAdZPlcBRwiv_Wtk&usqp=CAU', status: 'disponivel' },
    { id: 29, title: 'Rolo de massa', category: 'casa', price: 30, image: 'https://http2.mlstatic.com/D_NQ_NP_738423-MLU72754255044_112023-O.webp', status: 'disponivel' },
    { id: 30, title: 'Espremedor', category: 'casa', price: 20, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNCriw9p5l9QJGCSf2XfoIBR8u4smHhlBjvg&s', status: 'disponivel' },
    { id: 31, title: 'Taças', category: 'casa', price: 140, image: 'https://a-static.mlcdn.com.br/800x560/jogo-de-tacas-para-vinho-e-agua-em-vidro-6-pecas-490ml-nadir-barone/magazineluiza/142245200/02089f9b7f598eb77c869c7c6ed99a5a.jpg', status: 'disponivel' },
    { id: 33, title: 'Formas de bolo', category: 'casa', price: 100, image: 'https://down-br.img.susercontent.com/file/br-11134207-7qukw-ljn51dvrl7om2a', status: 'disponivel' },
    { id: 34, title: 'Marmitex de vidro', category: 'casa', price: 300, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7gRtKOTS8r1VJsUBoYaICPiMiAs8CjSpQsg&s', status: 'disponivel' },
    { id: 35, title: 'Kit Pizza', category: 'casa', price: 50, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591', status: 'disponivel' },
    { id: 36, title: 'Grelha para churrasco', category: 'casa', price: 200, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1', status: 'disponivel' },
    { id: 37, title: 'Pia', category: 'casa', price: 479, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a', status: 'disponivel' },
    { id: 38, title: 'Cama', category: 'casa', price: 1995, image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c', status: 'disponivel' },
    { id: 39, title: 'Roupas de cama', category: 'casa', price: 400, image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af', status: 'disponivel' },
    { id: 40, title: 'Travesseiro', category: 'casa', price: 350, image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2', status: 'disponivel' },
    { id: 41, title: 'Televisão quarto', category: 'casa', price: 1350, image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6', status: 'disponivel' },
    { id: 42, title: 'Hospedagem para 1 noite', category: 'lua_de_mel', price: 1580, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945', status: 'disponivel' },
    { id: 43, title: 'Perrengue chique na Grécia', category: 'lua_de_mel', price: 621, image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077', status: 'disponivel' },
    { id: 44, title: 'Hospedagem 15 dias', category: 'lua_de_mel', price: 3000, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd', status: 'disponivel' },
    { id: 45, title: 'Tour gastronômico', category: 'lua_de_mel', price: 450, image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0', status: 'disponivel' },
    { id: 46, title: 'Compras aleatórias', category: 'lua_de_mel', price: 2000, image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b', status: 'disponivel' },
    { id: 47, title: 'Passeios', category: 'lua_de_mel', price: 1000, image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800', status: 'disponivel' },
    { id: 48, title: 'Jantar romântico', category: 'lua_de_mel', price: 290, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFXZMCMvKk7HtihHTYfRR35cqz2aTJCN1aTQ&s', status: 'disponivel' },
    { id: 49, title: 'Vinho para postar no story', category: 'lua_de_mel', price: 363, image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3', status: 'disponivel' },
    { id: 50, title: 'Passagem só de ida para a lua de mel', category: 'lua_de_mel', price: 4500, image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05', status: 'disponivel' },
    { id: 51, title: 'Noite no cassino', category: 'lua_de_mel', price: 932, image: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d', status: 'disponivel' },
    { id: 52, title: 'Jogar o buquê na sua direção', category: 'criativos', price: 200, image: 'https://casacomidaeroupaespalhada.com/wp-content/uploads/2016/01/formas_jogar_buque_tradicional_classico_01.jpg?w=1200', status: 'disponivel' },
    { id: 53, title: 'Garantir o primeiro lugar na fila do buffet', category: 'criativos', price: 134, image: 'https://images.unsplash.com/photo-1555244162-803834f70033', status: 'disponivel' },
    { id: 54, title: 'Levar 2 lembrancinhas para casa', category: 'criativos', price: 155, image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a', status: 'disponivel' },
    { id: 55, title: 'Curso de serviços domésticos para o noivo', category: 'criativos', price: 310, image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952', status: 'disponivel' },
    { id: 56, title: 'Aluguel de bebê para treinamento', category: 'criativos', price: 518, image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9', status: 'disponivel' },
    { id: 57, title: 'Levar alguém que não foi convidado', category: 'criativos', price: 5000, image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf', status: 'disponivel' },
    { id: 58, title: 'Pix de 5', category: 'criativos', price: 5, image: 'https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4', status: 'disponivel' },
    { id: 59, title: 'Pix de 10', category: 'criativos', price: 10, image: 'https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4', status: 'disponivel' },
    { id: 60, title: 'Pix de 20', category: 'criativos', price: 20, image: 'https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4', status: 'disponivel' },
    { id: 61, title: 'Pix de 50', category: 'criativos', price: 50, image: 'https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4', status: 'disponivel' },
    { id: 62, title: 'Pix de 100', category: 'criativos', price: 100, image: 'https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4', status: 'disponivel' },
    { id: 63, title: 'Pix de 200', category: 'criativos', price: 200, image: 'https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4', status: 'disponivel' },
    { id: 64, title: 'Pix de 300', category: 'criativos', price: 300, image: 'https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4', status: 'disponivel' },
    { id: 65, title: 'Pix de 400', category: 'criativos', price: 400, image: 'https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4', status: 'disponivel' },
    { id: 66, title: 'Pix de 500', category: 'criativos', price: 500, image: 'https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4', status: 'disponivel' },
    { id: 67, title: 'Pix de 600', category: 'criativos', price: 600, image: 'https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4', status: 'disponivel' },
    { id: 68, title: 'Pix de 700', category: 'criativos', price: 700, image: 'https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4', status: 'disponivel' },
    { id: 69, title: 'Pix de 800', category: 'criativos', price: 800, image: 'https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4', status: 'disponivel' },
    { id: 70, title: 'Pix de 900', category: 'criativos', price: 900, image: 'https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4', status: 'disponivel' },
    { id: 71, title: 'Pix de 1000', category: 'criativos', price: 1000, image: 'https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4', status: 'disponivel' },
  ];

  async ngOnInit() {
      const itensPre: any = []
      await this.items
    }

  buttonActive: string = 'all';

  filteredItems: any[] = this.items;

  openBuyItemModal(item: any) {
    this.dialog.open(BuyItemModalComponent, {
      width: 'fit-contetn',
      height: 'fit-content',
      data: { item },
    });
  }

  get paginatedItems() {
    const start = this.currentPage * this.itemsPerPage;
    return this.filteredItems.slice(start, start + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.filteredItems.length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  filterItems(category: string) {
    this.buttonActive = category;
    this.currentPage = 0; // Reset to first page when filtering
    if (category === 'all') {
      this.filteredItems = this.items;
    } else {
      this.filteredItems = this.items.filter((item) => item.category === category);
    }
  }

}
