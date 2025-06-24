import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../service/chat.service';

@Component({
  selector: 'app-chat',
  imports: [FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
  providers: [ChatService]
})
export class ChatComponent implements OnInit {
    dynamicContent: string = '';
    textoMensagem: string = '';

    @ViewChild('suaMensagem') htmlSuaMensagem!: ElementRef;
    @ViewChild('userMensagem') htmlUserMensagem!: ElementRef;
    @ViewChild('chatContainer') chatContainer!: ElementRef;

    constructor(private chatService: ChatService) {}

    ngOnInit(): void {
        // Conecta ao WebSocket e registra o callback para receber mensagens
        this.chatService.connect();
        this.chatService.onMessage((msg: string) => {
            this.receberMensagem(msg);
        });
    }

    clickEnviar() {
        const mensagem = this.htmlSuaMensagem.nativeElement.cloneNode(true);
        mensagem.classList.remove('d-none');
        mensagem.querySelector('.msg').textContent = this.textoMensagem;
        this.chatContainer.nativeElement.appendChild(mensagem);

        // Envia a mensagem pelo serviço do chat
        this.chatService.sendMessage(this.textoMensagem);

        this.textoMensagem = '';
        this.scrollToBottom();
    }

    receberMensagem(msg: string) {
        const mensagem = this.htmlUserMensagem.nativeElement.cloneNode(true);
        mensagem.classList.remove('d-none');
        mensagem.querySelector('.msg').textContent = msg;
        this.chatContainer.nativeElement.appendChild(mensagem);
        this.scrollToBottom();
    }

    private scrollToBottom(): void {
        const container = this.chatContainer.nativeElement;
        container.scrollTop = container.scrollHeight;
    }
}