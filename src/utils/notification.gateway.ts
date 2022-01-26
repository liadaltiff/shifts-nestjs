import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
@WebSocketGateway()
export class NotificationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('NotificationGateway');
  @SubscribeMessage('messageToServer')
  handleMessage(client: Socket, payload: string): void {
    this.server.emit('messageToClient', payload, client.id);
  }
  afterInit(server: any) {
    this.logger.log('Init');
    console.log('init');
  }
  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
    console.log('client connected');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`client disconnected: ${client.id}`);
    console.log('client disconnected');
  }
}
