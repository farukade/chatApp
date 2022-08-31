import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesGateway } from './message/messages.gateway';
import { UsersGateway } from './user/users.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, MessagesGateway, UsersGateway],
})
export class AppModule {}
