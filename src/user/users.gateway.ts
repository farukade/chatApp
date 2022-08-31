import { Logger } from '@nestjs/common';
import { OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { UserDto } from './dto/user.dto';

const { log } = console;

let activeUsers = [];
@WebSocketGateway({ namespace: 'user' })
export class UsersGateway implements OnGatewayInit, OnGatewayDisconnect {

  
  private logger: Logger = new Logger('userGateway');
  @WebSocketServer() wss: Server;
  
  afterInit(server: any) {
    this.logger.log('user connected');
  };

  handleDisconnect(client: Socket) {
    this.logger.log('disconnected');
  };

  @SubscribeMessage('activeUsers')
  getActiveUsers(client: Socket, payload: UserDto) {
    if (!activeUsers.includes(payload.username)) {
      activeUsers.push(payload.username);
    };
    log(payload);
    log(activeUsers);
    this.wss.emit('clientUsers', { activeUsers });
  }
}
