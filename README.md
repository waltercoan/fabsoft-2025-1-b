# Fábrica de Software 2025/1

## Repositório dos alunos
- [Repos](https://gist.github.com/d4e37df9f6772173110603fc8bf90b84.git)

## Propostas de projeto

- Nome do sistema Ex:(Sistema para Mecânica)
  - Funcionalidade 1
  - Funcionalidade 2
  - Funcionalidade 3

<s>

- Nome do sistema Ex:(Sistema para Mecânica)
  - Funcionalidade 1
  - Funcionalidade 2
  - Funcionalidade 3

</s>


## Livro Eng Software Moderna
[Eng. Soft Moderna - Requisitos](https://engsoftmoderna.info/cap3.html)

## Histórias de Usuário
- Como um Atendente eu gostaria de registrar os dados do cliente como: nome, endereço, telefone, email
- Como um Atendente eu gostaria de registrar os dados do Carro do cliente como: marca, modelo, placa
- Como um Atendente eu gostaria de vincular o Carro ao Cliente
- Como um Atedente eu gostaria de agendar uma revisão com os seguintes dados: cliente, carro, data entrada, data saida, valor da revisão
- Como um Atendente eu gostaria de vincular peças trocadas na revisão com os seguintes dados: codigo, nome, preço unitário
- Como um Atendente eu gostaria de vincular os serviços de mão de obra realizados na revisão com os seguintes dados: nome do funcionário, quantidade de horas, valor


## Comandos do Git

### Instalação
[Git Bash](https://git-scm.com/downloads)

### Configuração inicial

```
git config --global user.name "NOME DO USUARIO NO GITHUB"
git config --global user.email "EMAIL DA CONTA DO GITHUB"
```
### Tipos de mensagens do commit

- feat: (new feature for the user, not a new feature for build script)
- fix: (bug fix for the user, not a fix to a build script)
- docs: (changes to the documentation)
- style: (formatting, missing semi colons, etc; no production code change)
- refactor: (refactoring production code, eg. renaming a variable)
- test: (adding missing tests, refactoring tests; no production code change)
- chore: (updating grunt tasks etc; no production code change)

### Commit e Push

```
git add .
git commit -m "tipo: o que foi feito"
git push -u origin main
```

### Ambiente de desenvolvimento JAVA
[Eclipse Adoptium](https://adoptium.net/)
[Microsoft OpenJDK](https://www.microsoft.com/openjdk)
[AWS CORRETTO](https://aws.amazon.com/pt/corretto/)
[VSCode](https://code.visualstudio.com/download)
[Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack)


- JRE - Java Runtime Environment
   - Java Virtual Machine JVM 
     - java.exe / javaw.exe
- JDK - Java Development Kit
  - Compilar o java (javac.exe)

## Diagrama de classes
![Diagrama](./diagramas/png/classes.png)


## Prompts Aula 01/04/2025
- Encontrar as entidades nas histórias de usuário
```bash
@workspace #sym:## Histórias de Usuário quais são as entidades
```
- Gerar as classes java das entidades
```bash
@workspace por favor, crie as classe em java no pacote entity para representar as entidades
```
- Gerar o Diagrama de Classes de Entidade (Domínio)
```bash
@workspace por favor gere um diagrama uml no padrão plantuml das classes do pacote br.univille.projfabsoft
```
- Instalar a extensão [PlantUML](https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml)

## Diagrama de classes Entidade (Domínio)
![Diagrama](./diagramas/png/classes_projfabsoft.png)

## Clean Architecture

[Livro Arquitetura Limpa](https://integrada.minhabiblioteca.com.br/reader/books/9788550808161/pageid/0)

![Arquitetura Limpa](./diagramas/CleanArchitecture.jpg)

## Frontend Angular

- Criar o projeto Angular
```bash
ng new projfabsoft-frontend
```

- Acessar a pasta do projeto

```bash
cd projfabsoft-frontend
```

- Executar o servidor do Angular

```bash
ng serve
```
- Para acessar o frontend utilize o link [http://localhost:4200](http://localhost:4200)

- Instalação do Bootstrap

```bash
npm install bootstrap
```

- No arquivo angular.json [🔗](./projfabsoft-frontend/angular.json)

```json
"styles": [
    "src/styles.css",
    "node_modules/bootstrap/dist/css/bootstrap.css"
],
"scripts": [
    "node_modules/bootstrap/dist/js/bootstrap.js"
]
```

### Gerando a primeira tela de Cliente 

- Gerando o componente do Angular

```bash
ng generate component cliente
```

- Criando a interface gráfica HTML /src/app/cliente/cliente.component.html [🔗](./projfabsoft-frontend/src/app/cliente/cliente.component.html)

```html
<main class="container">
    <table class="table">
        ....
    </table>
</main>
```

- Criando a classe Model

```bash
ng generate class model/cliente
```

- Código da classe /src/app/model/cliente.ts [🔗](./projfabsoft-frontend/src/app/model/cliente.ts)

```ts
export class Cliente {
    id: number;
    nome: string;
    endereco: string;
    telefone: string;
    email: string;
    dataNascimento: Date;
}
```

- Configurar o arquivo tsconfig.json [🔗](./projfabsoft-frontend/tsconfig.json) para suportar a não inicialização dos atributos 

```bash
"compilerOptions": {
    "strictPropertyInitialization": false,
} 
```

- Gerar o serviço

```bash
ng generate service service/cliente
```

- Codigo do serviço /src/app/service/cliente.service.ts [🔗](./projfabsoft-frontend/src/app/service/cliente.service.ts)

```ts
import { Injectable } from '@angular/core';
import { Cliente } from '../model/cliente';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  apiURL = "http://localhost:8080/api/v1/clientes";
  
  constructor(private http:HttpClient) { }

  getClientes(){
    return this.http.get<Cliente[]>(this.apiURL);
  }

}
```

- Alterar o arquivo /src/app/app.component.html [🔗](./projfabsoft-frontend/src/app/app.component.html) para gerar apenas a tela dos componentes

```html
<router-outlet />
```

- Modificar o código do componente /src/app/cliente/cliente.component.ts [🔗](./projfabsoft-frontend/src/app/cliente/cliente.component.ts) para chamar o serviço e guardar a lista de clientes em um atributo

```ts
import { Component } from '@angular/core';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente',
  imports: [HttpClientModule,CommonModule],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css',
  providers: [ClienteService]
})
export class ClienteComponent {
  listaClientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) {}

  ngOnInit() {
    console.log("Carregando clientes...");
    this.clienteService.getClientes().subscribe(clientes => {
      this.listaClientes = clientes;
    });
  }
}
```

- Modificar o arquivo /src/app/cliente/cliente.component.html [🔗](./projfabsoft-frontend/src/app/cliente/cliente.component.html) para desenhar a tabela de clientes

```html
<main class="container">
    <h2>Clientes</h2>
    <table class="table">
        <thead>
            <tr>
                <th>Nome</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let umCliente of listaClientes">
                <td>{{umCliente.nome}}</td>
            </tr>
        </tbody>
    </table>
</main>
```

- Modificar o arquivo /src/app/app.routes.ts [🔗](./projfabsoft-frontend/src/app/app.routes.ts) para incluir a rota para o componente

```ts
import { Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
export const routes: Routes = [
    { path: 'clientes', component: ClienteComponent }
];
```

- Rodar a aplicação

```bash
ng serve
```

- [Cross-origin resource sharing](https://pt.wikipedia.org/wiki/Cross-origin_resource_sharing)

- No projeto Backend Java Spring Boot crie um pacote chamado br.univille.projfabsoft.config, e dentro dele uma classe WebConfig.java [🔗](./projfabsoft/src/main/java/br/univille/projfabsoft/config/WebConfig.java) com o seguinte código:


```java
package br.univille.projfabsoft.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer  {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedHeaders("*")
                .allowedOriginPatterns("*")
                .allowedOrigins("*")
                .allowedMethods("*")
                .maxAge(1800);

    }
}
```

## Criação da tela de cadastro de clientes

- Alterar o arquivo /src/app/cliente/cliente.component.ts para importar o RouterLink

```ts
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cliente',
  imports: [HttpClientModule, CommonModule, RouterLink],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css',
  providers: [ClienteService]
})
```
- Alterar o arquivo /src/app/cliente/cliente.component.html criar o botao para a nova tela de formulário

```html
<a routerLink="/clientes/novo" class="btn btn-primary">Novo</a>
```

- Alterar o arquivo /app/app.routes.ts para registrar a rota da nova tela

```ts
import { Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { FormClienteComponent } from './form-cliente/form-cliente.component';

export const routes: Routes = [
    { path: 'clientes', component: ClienteComponent},
    { path: 'clientes/novo', component: FormClienteComponent},
];
```

- Abrir o console e digitar o comando para criar um novo componente que será a tela de cadastro

```bash
ng generate component form-cliente
```

- Alterar o arquivo /app/service/cliente.service.ts para incluir o método de salvar o cliente e chamar o endpoint POST da API

```ts
import { Injectable } from '@angular/core';
import { Cliente } from '../model/cliente';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  apiURL = "http://localhost:8080/api/v1/clientes";
  
  constructor(private http:HttpClient) { }

  getClientes(){
    return this.http.get<Cliente[]>(this.apiURL);
  }

  saveCliente(cliente:Cliente){
    return this.http.post(this.apiURL,cliente);
  }

}
``` 

- Alterar o codigo do arquivo /app/form-cliente/form-cliente.component.ts para importar os componentes e chamar o método salvar do serviço

```ts
import { Component } from '@angular/core';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-cliente',
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './form-cliente.component.html',
  styleUrl: './form-cliente.component.css',
  providers: [ClienteService, Router]
})
export class FormClienteComponent {
    cliente: Cliente = new Cliente();

    constructor(
      private clienteService:ClienteService,
      private router:Router
    ){}

    salvar(){
      this.clienteService.saveCliente(this.cliente)
        .subscribe(resultado => {
            this.router.navigate(['clientes']);
        });
    }
}
```

- Alterar o codigo do arquivo /app/form-cliente/form-cliente.component.html para desenhar a tela

```ts
<main class="container">
    <h2>Cliente</h2>
    <div class="card">
        <div class="card-body">
            <div class="form-group">
                <label for="txtNome">Nome</label>    
                <input type="text" 
                    [(ngModel)]="cliente.nome"
                    class="form-control"
                    id="txtNome">
            </div>
        </div>
        <button (click)="salvar()" 
        class="btn btn-primary">Salvar</button>
    </div>
</main>
```