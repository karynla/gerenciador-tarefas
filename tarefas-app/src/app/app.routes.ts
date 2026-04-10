import { Routes } from '@angular/router';
import { FormTarefaComponent } from './components/form-tarefa/form-tarefa';
import { ListaTarefasComponent } from './components/lista-tarefas/lista-tarefas';

export const routes: Routes = [
  { path: '', component: ListaTarefasComponent },
  { path: 'nova', component: FormTarefaComponent },
  { path: 'editar/:id', component: FormTarefaComponent },
];
