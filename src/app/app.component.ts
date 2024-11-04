import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; 
import { HomeComponent } from "./home/home.component"; // Importa o HomeComponent se necessário

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Larissa e Lucas';
}
