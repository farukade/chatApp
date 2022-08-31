import { CustomBaseEntity } from "src/common/custom-base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Message extends CustomBaseEntity {
  @Column()
  body: string;

  @Column()
  senderId: number;
  
  @Column()
  recipientId: number;
}