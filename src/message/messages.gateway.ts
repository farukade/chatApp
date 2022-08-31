import { Logger } from '@nestjs/common';
import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { appendSender, getChatRoom } from '../common/utils';
import { ErrorInterface } from '../interfaces/error.interface';
import { ClientMessageDto } from './dto/client-message.dto';
import { ServerMessageDto } from './dto/server-message.dto';
import { userMessageDto } from './dto/user-messages.dto';

const { log } = console;
let chats: any = {};
@WebSocketGateway({ namespace: '/message' })
export class MessagesGateway implements OnGatewayInit {

  private logger: Logger = new Logger('MessageGateway');
  @WebSocketServer() wss: Server

  afterInit(server: any) {
    this.logger.log('Socket Initialized')
  };

  @SubscribeMessage('sendMessage')
  messageUser(client: Socket, data: ServerMessageDto): ClientMessageDto | ErrorInterface {
    try {
      const chatRoom = getChatRoom(data.recipient, data.sender);
      const message = appendSender(data.sender, data.body);
      if (chats[chatRoom]) {
        chats[chatRoom] = [message, ...chats[chatRoom]];
      } else {
        chats[chatRoom] = [message];
      };
      this.wss.emit(data.recipient, { data: [message] });
      this.wss.emit(data.sender, { data: [message] });
      log(chats);
    } catch (error) {
      log(error);
      return { success: false, message: error.message || "not sent" };
    }
  };

  @SubscribeMessage('getMessages')
  getUserMessages(client: Socket, data: userMessageDto) {
    try {
      let userRoom = getChatRoom(data.sender, data.recipient);
      if (chats[userRoom]) {
        client.emit(data.sender, { data: chats[userRoom] });
      };
      log(chats[userRoom]);
    } catch (error) {
      log(error);
      client.emit('userMessages', { data: [] })
    }
  }

}
