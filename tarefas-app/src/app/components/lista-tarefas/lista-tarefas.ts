import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tarefa } from '../../models/tarefa.model';
import { TarefaService } from '../../services/tarefa.service';

@Component({
  selector: 'app-lista-tarefas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-tarefas.html',
  styleUrls: ['./lista-tarefas.css'],
})
export class ListaTarefasComponent implements OnInit {
  tarefas: Tarefa[] = [];
  mensagem: string = '';
  tipoMensagem: 'sucesso' | 'erro' = 'sucesso';
  carregando: boolean = false;
  isDarkMode: boolean = false;

  constructor(
    private tarefaService: TarefaService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    // Carregar tema salvo
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme === 'dark';
    this.applyTheme();

    this.carregarTarefas();
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
  }

  applyTheme(): void {
    if (this.isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }

  carregarTarefas(): void {
    this.carregando = true;

    this.tarefaService.getTarefas().subscribe({
      next: (data) => {
        this.tarefas = data;
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.mostrarMensagem('Erro ao carregar tarefas: ' + error.message, 'erro');
        this.carregando = false;
        this.cdr.detectChanges();
      },
    });
  }

  deletar(id: number | undefined): void {
    if (id && confirm('Deseja realmente excluir esta tarefa?')) {
      this.tarefaService.deletarTarefa(id).subscribe({
        next: () => {
          this.mostrarMensagem('Tarefa excluída com sucesso!', 'sucesso');
          this.carregarTarefas();
        },
        error: (error) => {
          this.mostrarMensagem('Erro ao excluir tarefa: ' + error.message, 'erro');
        },
      });
    }
  }

  editar(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/editar', id]);
    }
  }

  novaTarefa(): void {
    this.router.navigate(['/nova']);
  }

  mostrarMensagem(texto: string, tipo: 'sucesso' | 'erro'): void {
    this.mensagem = texto;
    this.tipoMensagem = tipo;

    setTimeout(() => {
      this.mensagem = '';
    }, 3000);
  }
}
