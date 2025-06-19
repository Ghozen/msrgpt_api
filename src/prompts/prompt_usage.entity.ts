
import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Prompt_Usage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
     date: string;


  @Column({default: 0})
  comptage_prompt: number;
  
  @Column({type: 'datetime',default: () => 'CURRENT_TIMESTAMP'})
  creation_date: string;


   @ManyToOne(() => User, (user) => user.prompt_Usage, {onDelete:"CASCADE"})
   user: User;

  
}
  
