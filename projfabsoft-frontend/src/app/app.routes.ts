import { Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { FormClienteComponent } from './form-cliente/form-cliente.component';

export const routes: Routes = [
    { path: 'clientes', component: ClienteComponent},
    { path: 'clientes/novo', component: FormClienteComponent},
    {path: 'clientes/alterar/:id', component: FormClienteComponent}
];
