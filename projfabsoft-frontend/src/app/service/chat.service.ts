import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket!: WebSocket;
  private messageCallback!: (message: string) => void;
  
  //código para conectar no servidor em produção
  //apiBase = (window as any).env.apiUrl.replace('/api/v1','').replace('https://','').replace('http://','');
  //apiURL = (this.apiBase !== null ? ('wss://' + this.apiBase) : 'ws://localhost:8080') + "/ws/chat";

  apiURL = 'ws://localhost:8080/ws/chat';
  
  constructor() { }

  connect(): void {
    this.socket = new WebSocket(this.apiURL);

    this.socket.onopen = () => {
      console.log('WebSocket connection established.');
    };

    this.socket.onmessage = (event) => {
      console.log('Message received from server:', event.data);
      if (this.messageCallback) {
        this.messageCallback(event.data);
      }
    };

    this.socket.onclose = () => {
      console.log('WebSocket connection closed.');
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  onMessage(callback: (message: string) => void): void {
    this.messageCallback = callback;
  }

  sendMessage(message: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.error('WebSocket is not open. Unable to send message.');
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
}