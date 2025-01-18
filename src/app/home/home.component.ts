import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-home',
    imports: [],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

    constructor(
        private router: Router
    ){}

 dataAlvo = new Date(2025, 4, 16); 

 formatarDataParaBrasileiro(data: Date): string {
     let dia = data.getDate().toString().padStart(2, '0');  
     let mes = (data.getMonth() + 1).toString().padStart(2, '0'); 
     let ano = data.getFullYear(); 
    return `${dia}.${mes}.${ano}`;
}
calcularDiasRestantes(dataFutura: Date): number {
    let hoje = new Date(); 
    let diferencaEmMilissegundos = dataFutura.getTime() - hoje.getTime();
    let diferencaEmDias = Math.ceil(diferencaEmMilissegundos / (1000 * 60 * 60 * 24)); 
    return diferencaEmDias;
}

dataFormatada = this.formatarDataParaBrasileiro(this.dataAlvo);
diasRestantes = this.calcularDiasRestantes(this.dataAlvo);

irParaListaDePresentes(){
    this.router.navigate(['/lista-de-presente']);
}

irParaDressCode(){
    this.router.navigate(['/sugestao-de-traje']);
}

}
