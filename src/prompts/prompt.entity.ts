
import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Prompt {
  @PrimaryGeneratedColumn('uuid')
  id: string;


  @Column()
  message: string;

  @Column({nullable: true})
  reponse: string;

  @Column({type: 'datetime',default: () => 'CURRENT_TIMESTAMP'})
  creation_date: string;
  
  @ManyToOne(() => User, (user) => user.prompt)
  user: User;


}
