import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tarefa } from '../../models/tarefa.model';
import { TarefaService } from '../../services/tarefa.service';

@Component({
  selector: 'app-form-tarefa',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-tarefa.html',
  styleUrls: ['./form-tarefa.css'],
})
export class FormTarefaComponent implements OnInit {
  tarefa: Tarefa = {
    titulo: '',
    descricao: '',
    status: 'Pendente',
  };
  isEdicao = false;
  mensagem: string = '';
  tipoMensagem: 'sucesso' | 'erro' = 'sucesso';
  carregando: boolean = false;
  erros: any = {};

  constructor(
    private tarefaService: TarefaService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdicao = true;
      this.carregarTarefa(id);
    }
  }

  carregarTarefa(id: number): void {
    this.carregando = true;
    this.tarefaService.getTarefa(id).subscribe({
      next: (data) => {
        this.tarefa = data;
        this.carregando = false;
        this.cdr.detectChanges(); // ADICIONADO
      },
      error: (error) => {
        this.mostrarMensagem('Erro ao carregar tarefa: ' + error.message, 'erro');
        this.carregando = false;
        this.cdr.detectChanges(); // ADICIONADO
      },
    });
  }

  validar(): boolean {
    this.erros = {};
    let valido = true;

    if (!this.tarefa.titulo || this.tarefa.titulo.trim() === '') {
      this.erros.titulo = 'O título é obrigatório';
      valido = false;
    }

    if (!this.tarefa.descricao || this.tarefa.descricao.trim() === '') {
      this.erros.descricao = 'A descrição é obrigatória';
      valido = false;
    }

    return valido;
  }

  salvar(): void {
    if (!this.validar()) {
      this.mostrarMensagem('Por favor, preencha todos os campos obrigatórios', 'erro');
      return;
    }

    this.carregando = true;

    if (this.isEdicao && this.tarefa.id) {
      this.tarefaService.atualizarTarefa(this.tarefa.id, this.tarefa).subscribe({
        next: () => {
          this.mostrarMensagem('Tarefa atualizada com sucesso!', 'sucesso');
          setTimeout(() => this.router.navigate(['/']), 1500);
        },
        error: (error) => {
          this.mostrarMensagem('Erro ao atualizar: ' + error.message, 'erro');
          this.carregando = false;
          this.cdr.detectChanges();
        },
      });
    } else {
      this.tarefaService.criarTarefa(this.tarefa).subscribe({
        next: () => {
          this.mostrarMensagem('Tarefa criada com sucesso!', 'sucesso');
          setTimeout(() => this.router.navigate(['/']), 1500);
        },
        error: (error) => {
          this.mostrarMensagem('Erro ao criar: ' + error.message, 'erro');
          this.carregando = false;
          this.cdr.detectChanges();
        },
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/']);
  }

  mostrarMensagem(texto: string, tipo: 'sucesso' | 'erro'): void {
    this.mensagem = texto;
    this.tipoMensagem = tipo;

    setTimeout(() => {
      this.mensagem = '';
    }, 3000);
  }
}
