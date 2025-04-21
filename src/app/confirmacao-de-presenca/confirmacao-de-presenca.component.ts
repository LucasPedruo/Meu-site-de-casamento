import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { SheetService } from '../service/sheet.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { ConfirmacaoDialogComponent } from '../dialogs/confirmacao-dialog.component';
import { SugestaoNomeDialogComponent } from '../dialogs/sugestao-nome-dialog.component';
import { JaConfirmadoDialogComponent } from '../dialogs/ja-confirmado-dialog.component';
import { NaoConvidadoDialogComponent } from '../dialogs/nao-convidado-dialog.component';
import { ContatoDialogComponent } from '../dialogs/contato-dialog.component';
import { ContatoInputDialogComponent } from '../dialogs/contato-input-dialog.component';


interface Pessoa {
  nome: string;
  valor: string;
}

interface ConvidadoData {
  nome: string;
  confirmado: boolean;
}

@Component({
  selector: 'app-confirmacao-de-presenca',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule, 
    MatSelectModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './confirmacao-de-presenca.component.html',
  styleUrl: './confirmacao-de-presenca.component.scss',
})
export class ConfirmacaoDePresencaComponent {
  private _snackBar = inject(MatSnackBar);
  private _dialog = inject(MatDialog);

  listaConvidados: string[] = [
    "Edson Asta",
    "Elianai Pedro da Silva Brasil da Silva",
    "Edson Brasil da silva",
    "Sandro Porto",
    "Rosane Moraes",
    "jessica mello",
    "Jeane santos",
    "Ana Flávia",
    "Lucas Sales",
    "Caio Roberto Magalhães da silva",
    "Leticia Farias",
    "Gustavo Farias",
    "Ana Lucia Santos Farias",
    "Juliana Rocha",
    "Nélio",
    "Gabriele Rocha",
    "Gabriella Agnelli",
    "Eude Reis",
    "Laís Candida",
    "Johny Mafra",
    "Joabe",
    "Roseane Santos da Silva",
    "Eliezer Pedro da Silva",
    "Erika Cristina",
    "Ana Julia",
    "Samuel",
    "Miriam",
    "Brenda Guarino",
    "Felipe Carvalho",
    "Luiz Neto",
    "Gilson Rocha",
    "Rosilene rocha",
    "Sonia Alves",
    "Lincoln Medeiros",
    "Marcio Carvalho",
    "Michelly Alves",
    "Guilherme Teixeira Ferreira",
    "Joice Portela Teixeira Ferreira",
    "Giovanni Teixeira Ferreira",
    "Gustavo Teixeira Ferreira",
    "Juliana Cardoso",
    "Vítor Cardoso",
    "Dulcineia agnelli calixto",
    "Joel Calixto dos santos",
    "Maycon Agnelli Calixto",
    "Sávio",
    "Herbenice",
    "Isabel",
    "Gabriela Santos do Carmo",
    "Wesley Melo",
    "Emanuelle Pereira",
    "Milena Aguiar",
    "Ualaston piano",
    "Victoria Pereira da Silva",
    "Sonia",
    "João Carlos Cruz da Silva",
    "Anadila Piano Pereira da Silva",
    "Dulcineia agnelli calixto",
    "Maycon Agnelli Calixto",
    "Joel Calixto dos",
    "Maria",
    "Valdomiro",
    "Edineia",
    "Jocileide Portela Teixeira Dias Sá",
    "José Enilson Dias Sá",
    "João André Portela Teixeira Dias Sá",
    "Josué Portela Teixeira Dias Sá",
    "Joana Portela Teixeira Dias Sá",
    "Rebeca Moreira Vieira",
    "Ananda Piano",
    "Aline Piano",
    "Alexsandre dos Santos Ferreira",
    "Arthur Piano",
    "Karine Gomes",
    "Mateus David",
    "Dida",
    "Edleuza Portela Gusmao",
    "zenaide",
    "maria pereira",
    "cristina raquel",
    "Matheus Moreira Vieira",
    "Lídia",
    "Jorge",
    "Pedro Rodrigues da Silva",
    "Gabriela de oliveira da silva",
    "Ageu",
    "Vania",
    "Cíntia Ramon",
    "Julia Ramon",
    "Fabiano Pastor",
    "Manuela Ramon",
    "Alzira Piano Pereira",
    "João Batista dos Santos Pereira",
    "Daniel Viana",
    "Daniele Mota",
    "Eneas Ferreira da silva",
    "Amanda Padula",
    "Vinicius Bernardo",
    "Rodrigo de Almeida da Rocha",
    "Andreia",
    "Isabella Rocha",
    "Josiane",
    "Joan",
    "Vinicius Guedes"
  ];

  constructor(
    private formBuilder: FormBuilder,
    private service: SheetService,
  ) { }

  ngOnInit() {
    this.carregarDadosPlanilha();
  }

  carregarDadosPlanilha() {
    this.carregando = true;
    this.service.listSheet().subscribe({
      next: (response: any) => {
        this.dadosPlanilha = response.map((item: any) => ({
          nome: item.Nome,
          confirmado: !!item.Status && item.Status.trim() !== ''
        }));
        this.carregando = false;
      },
      error: (error) => {
        console.error('Erro ao carregar dados da planilha:', error);
        this.carregando = false;
      }
    });
  }

  pessoas: Pessoa[] = [{ nome: '', valor: '' }];
  dadosPlanilha: ConvidadoData[] = [];
  carregando = true;

  adicionarPessoa() {
    this.pessoas.push({ nome: '', valor: '' });
  }

  removerPessoa(index: number) {
    if (this.pessoas.length > 1) {
      this.pessoas.splice(index, 1);
    }
  }

  calcularSimilaridade(s1: string, s2: string): number {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
    
    const costs: number[] = [];
    for (let i = 0; i <= s1.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= s2.length; j++) {
        if (i === 0) {
          costs[j] = j;
        } else {
          if (j > 0) {
            let newValue = costs[j - 1];
            if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
              newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
            }
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0) {
        costs[s2.length] = lastValue;
      }
    }
    return costs[s2.length];
  }

  encontrarNomesSimilares(nome: string): string[] {
    if (!nome || nome.trim().length < 3) return [];
    
    return this.listaConvidados
      .filter(convidado => {
        // Verificar se o nome digitado é parte do nome completo
        if (convidado.toLowerCase().includes(nome.toLowerCase())) {
          return true;
        }
        
        // Verificar primeiro nome
        const primeiroNomeDigitado = nome.split(' ')[0].toLowerCase();
        const primeiroNomeConvidado = convidado.split(' ')[0].toLowerCase();
        
        if (primeiroNomeDigitado === primeiroNomeConvidado) {
          return true;
        }
        
        // Verificar similaridade (distância de Levenshtein)
        const distancia = this.calcularSimilaridade(nome, convidado);
        return distancia <= 3; // Tolerância de até 3 caracteres diferentes
      })
      .slice(0, 5); // Limitar a 5 sugestões
  }

  verificarSeJaConfirmado(nome: string): boolean {
    return this.dadosPlanilha.some(item => 
      item.nome.toLowerCase() === nome.toLowerCase() && item.confirmado
    );
  }

  verificarSeConvidado(nome: string): boolean {
    return this.listaConvidados.some(convidado => 
      convidado.toLowerCase() === nome.toLowerCase()
    );
  }

 /*  processarPessoa(pessoa: Pessoa): Observable<any> {
    const nomeNormalizado = pessoa.nome.trim();
    
    if (this.verificarSeJaConfirmado(nomeNormalizado)) {
      const dialogRef = this._dialog.open(JaConfirmadoDialogComponent, {
        data: { nome: nomeNormalizado }
      });
      return of({ status: 'ja_confirmado' });
    }
    
    if (this.verificarSeConvidado(nomeNormalizado)) {
      return this.service.createSheet(nomeNormalizado, pessoa.valor).pipe(
        map(response => {
          const dialogRef = this._dialog.open(ConfirmacaoDialogComponent, {
            data: { nome: nomeNormalizado }
          });
          return { status: 'success', response };
        }),
        catchError(error => {
          console.error('Erro ao enviar confirmação:', error);
          return of({ status: 'error', error });
        })
      );
    } else {
      const nomesSimilares = this.encontrarNomesSimilares(nomeNormalizado);
      
      if (nomesSimilares.length > 0) {
        const dialogRef = this._dialog.open(SugestaoNomeDialogComponent, {
          data: { 
            nomeDigitado: nomeNormalizado, 
            sugestoes: nomesSimilares,
            valor: pessoa.valor
          }
        });
        
        return dialogRef.afterClosed().pipe(
          map(result => {
            if (result && result.confirmado) {
              return this.service.createSheet(result.nomeSelecionado, pessoa.valor).pipe(
                map(response => ({ status: 'success', response })),
                catchError(error => of({ status: 'error', error }))
              );
            } else if (result && result.contato) {
              this._dialog.open(ContatoDialogComponent);
              return of({ status: 'contato' });
            } else {
              this._dialog.open(NaoConvidadoDialogComponent);
              return of({ status: 'nao_convidado' });
            }
          })
        );
      } else {
        const dialogRef = this._dialog.open(NaoConvidadoDialogComponent);
        return of({ status: 'nao_convidado' });
      }
    }
  } */

  validarFormulario(): boolean {
    for (const pessoa of this.pessoas) {
      if (!pessoa.nome || !pessoa.valor) {
        return false;
      }
    }
    return true;
  }

  // Update the processarPessoa method to handle phone number
/* processarPessoa(pessoa: Pessoa): Observable<any> {
  const nomeNormalizado = pessoa.nome.trim();
  
  if (this.verificarSeJaConfirmado(nomeNormalizado)) {
    const dialogRef = this._dialog.open(JaConfirmadoDialogComponent, {
      data: { nome: nomeNormalizado }
    });
    return of({ status: 'ja_confirmado' });
  }
  
  if (this.verificarSeConvidado(nomeNormalizado)) {
    // For direct matches, also collect phone number
    const dialogRefContato = this._dialog.open(ContatoInputDialogComponent, {
      data: { nome: nomeNormalizado }
    });
    
    return dialogRefContato.afterClosed().pipe(
      switchMap(result => {
        if (result && result.telefone) {
          return this.service.createSheet(nomeNormalizado, pessoa.valor, result.telefone).pipe(
            map(response => {
              const dialogRef = this._dialog.open(ConfirmacaoDialogComponent, {
                data: { nome: nomeNormalizado }
              });
              return { status: 'success', response };
            }),
            catchError(error => {
              console.error('Erro ao enviar confirmação:', error);
              return of({ status: 'error', error });
            })
          );
        } else {
          return of({ status: 'cancelled' });
        }
      })
    );
  } else {
    const nomesSimilares = this.encontrarNomesSimilares(nomeNormalizado);
    
    if (nomesSimilares.length > 0) {
      const dialogRef = this._dialog.open(SugestaoNomeDialogComponent, {
        data: { 
          nomeDigitado: nomeNormalizado, 
          sugestoes: nomesSimilares,
          valor: pessoa.valor
        }
      });
      
      return dialogRef.afterClosed().pipe(
        switchMap(result => {
          if (result && result.confirmado) {
            return this.service.createSheet(result.nomeSelecionado, pessoa.valor, result.telefone).pipe(
              map(response => ({ status: 'success', response })),
              catchError(error => of({ status: 'error', error }))
            );
          } else if (result && result.contato) {
            this._dialog.open(ContatoDialogComponent);
            return of({ status: 'contato' });
          } else {
            this._dialog.open(NaoConvidadoDialogComponent);
            return of({ status: 'nao_convidado' });
          }
        })
      );
    } else {
      const dialogRef = this._dialog.open(NaoConvidadoDialogComponent);
      return of({ status: 'nao_convidado' });
    }
  }
} */

/*   processarPessoa(pessoa: Pessoa): Observable<any> {
  const nomeNormalizado = pessoa.nome.trim();

  if (this.verificarSeJaConfirmado(nomeNormalizado)) {
    this._dialog.open(JaConfirmadoDialogComponent, {
      data: { nome: nomeNormalizado }
    });
    return of({ status: 'ja_confirmado' });
  }

  if (this.verificarSeConvidado(nomeNormalizado)) {
    const dialogRefContato = this._dialog.open(ContatoInputDialogComponent, {
      data: { nome: nomeNormalizado }
    });

    return dialogRefContato.afterClosed().pipe(
      switchMap(result => {
        if (result && result.telefone) {
          return this.service.createSheet(nomeNormalizado, pessoa.valor, result.telefone).pipe(
            map(response => {
              this._dialog.open(ConfirmacaoDialogComponent, {
                data: { nome: nomeNormalizado }
              });
              return { status: 'success', response };
            }),
            catchError(error => {
              console.error('Erro ao enviar confirmação:', error);
              return of({ status: 'error', error });
            })
          );
        } else {
          return of({ status: 'cancelled' });
        }
      })
    );
  } else {
    const nomesSimilares = this.encontrarNomesSimilares(nomeNormalizado);

    if (nomesSimilares.length > 0) {
      const dialogRef = this._dialog.open(SugestaoNomeDialogComponent, {
        data: { 
          nomeDigitado: nomeNormalizado, 
          sugestoes: nomesSimilares,
          valor: pessoa.valor
        }
      });

      return dialogRef.afterClosed().pipe(
        switchMap(result => {
          if (result && result.confirmado) {
            return this.service.createSheet(result.nomeSelecionado, pessoa.valor, result.telefone).pipe(
              map(response => {
                this._dialog.open(ConfirmacaoDialogComponent, {
                  data: { nome: result.nomeSelecionado }
                });
                return { status: 'success', response };
              }),
              catchError(error => {
                console.error('Erro ao enviar confirmação:', error);
                return of({ status: 'error', error });
              })
            );
          } else if (result && result.contato) {
            this._dialog.open(ContatoDialogComponent);
            return of({ status: 'contato' });
          } else {
            this._dialog.open(NaoConvidadoDialogComponent);
            return of({ status: 'nao_convidado' });
          }
        })
      );
    } else {
      this._dialog.open(NaoConvidadoDialogComponent);
      return of({ status: 'nao_convidado' });
    }
  }
} */

  processarPessoa(pessoa: Pessoa): Observable<any> {
    const nomeNormalizado = pessoa.nome.trim();
  
    return this.service.listSheet().pipe(
      switchMap((dados: any[]) => {
        const nomeJaConfirmado = dados.some(entry => entry.Nome?.toLowerCase().trim() === nomeNormalizado.toLowerCase());
  
        if (nomeJaConfirmado) {
          this._dialog.open(JaConfirmadoDialogComponent, {
            data: { nome: nomeNormalizado }
          });
          return of({ status: 'ja_confirmado' });
        }
  
        if (this.verificarSeConvidado(nomeNormalizado)) {
          const dialogRefContato = this._dialog.open(ContatoInputDialogComponent, {
            data: { nome: nomeNormalizado }
          });
  
          return dialogRefContato.afterClosed().pipe(
            switchMap(result => {
              if (result && result.telefone) {
                return this.service.createSheet(nomeNormalizado, pessoa.valor, result.telefone).pipe(
                  map(response => {
                    this._dialog.open(ConfirmacaoDialogComponent, {
                      data: { nome: nomeNormalizado }
                    });
                    return { status: 'success', response };
                  }),
                  catchError(error => {
                    console.error('Erro ao enviar confirmação:', error);
                    return of({ status: 'error', error });
                  })
                );
              } else {
                return of({ status: 'cancelled' });
              }
            })
          );
        } else {
          const nomesSimilares = this.encontrarNomesSimilares(nomeNormalizado);
  
          if (nomesSimilares.length > 0) {
            const dialogRef = this._dialog.open(SugestaoNomeDialogComponent, {
              data: { 
                nomeDigitado: nomeNormalizado, 
                sugestoes: nomesSimilares,
                valor: pessoa.valor
              }
            });
  
            return dialogRef.afterClosed().pipe(
              switchMap(result => {
                if (result && result.confirmado) {
                  const nomeSelecionado = result.nomeSelecionado;
                  const nomeSelecionadoJaConfirmado = dados.some(entry => entry.Nome?.toLowerCase().trim() === nomeSelecionado.toLowerCase());
  
                  if (nomeSelecionadoJaConfirmado) {
                    this._dialog.open(JaConfirmadoDialogComponent, {
                      data: { nome: nomeSelecionado }
                    });
                    return of({ status: 'ja_confirmado' });
                  }
  
                  return this.service.createSheet(nomeSelecionado, pessoa.valor, result.telefone).pipe(
                    map(response => {
                      this._dialog.open(ConfirmacaoDialogComponent, {
                        data: { nome: nomeSelecionado }
                      });
                      return { status: 'success', response };
                    }),
                    catchError(error => {
                      console.error('Erro ao enviar confirmação:', error);
                      return of({ status: 'error', error });
                    })
                  );
                } else if (result && result.contato) {
                  this._dialog.open(ContatoDialogComponent);
                  return of({ status: 'contato' });
                } else {
                  this._dialog.open(NaoConvidadoDialogComponent);
                  return of({ status: 'nao_convidado' });
                }
              })
            );
          } else {
            this._dialog.open(NaoConvidadoDialogComponent);
            return of({ status: 'nao_convidado' });
          }
        }
      })
    );
  }
  
  

  onSubmit() {
    if (!this.validarFormulario()) {
      const config: MatSnackBarConfig = {
        duration: 3000,
        panelClass: ['error-snackbar']
      };
      this._snackBar.open('Por favor, preencha todos os campos obrigatórios!', 'Fechar', config);
      return;
    }

    this.processarPessoa(this.pessoas[0]).subscribe({
      next: (result) => {
        if (result.status === 'success') {
          this.limparFormulario();
          this.carregarDadosPlanilha();
        }
      }
    });
  }

  /* 
  
    onSubmit() {
    if (!this.validarFormulario()) {
      const config: MatSnackBarConfig = {
        duration: 3000,
        panelClass: ['error-snackbar']
      };
      this._snackBar.open('Por favor, preencha todos os campos obrigatórios!', 'Fechar', config);
      return;
    }

    let confirmacoesConcluidas = 0;
    let erros = 0;

    for (const pessoa of this.pessoas) {
      console.log('Valores a serem enviados:', { nome: pessoa.nome, valor: pessoa.valor });

      this.service.createSheet(pessoa.nome, pessoa.valor).subscribe({
        next: (res) => {
          console.log(res);
          confirmacoesConcluidas++;
          
          if (confirmacoesConcluidas + erros === this.pessoas.length) {
            this.finalizarEnvio(confirmacoesConcluidas, erros);
          }
        },
        error: (error) => {
          console.log(error);
          erros++;
          
          if (confirmacoesConcluidas + erros === this.pessoas.length) {
            this.finalizarEnvio(confirmacoesConcluidas, erros);
          }
        },
      });
    }
  }

  */

  private finalizarEnvio(sucessos: number, erros: number) {
    if (erros === 0) {
      const config: MatSnackBarConfig = {
        duration: 3000,
        panelClass: ['success-snackbar']
      };
      this._snackBar.open(`${sucessos} confirmação(ões) enviada(s) com sucesso!`, 'Fechar', config);
      this.limparFormulario();
    } else if (sucessos === 0) {
      const config: MatSnackBarConfig = {
        duration: 3000,
        panelClass: ['error-snackbar']
      };
      this._snackBar.open('Houve um erro com as confirmações!', 'Fechar', config);
    } else {
      const config: MatSnackBarConfig = {
        duration: 3000,
        panelClass: ['warning-snackbar']
      };
      this._snackBar.open(`${sucessos} confirmação(ões) enviada(s) com sucesso e ${erros} falha(s)!`, 'Fechar', config);
      this.limparFormulario();
    }
  }

  private limparFormulario() {
    this.pessoas = [{ nome: '', valor: '' }];
  }

  

}