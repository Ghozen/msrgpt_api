
import { Prompt } from 'src/prompts/prompt.entity';
import { Prompt_Usage } from 'src/prompts/prompt_usage.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;


  @Column()
  fullName: string;

  @Column({type: 'varchar',length: 10,unique: true})
  pseudo: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @Column({nullable: true})
  telNumber: string;

  @Column({default: 0})
  countPrompt: number;

  @Column({nullable: true})
  lastPromptDate: Date;

  @Column({type: 'datetime',default: () => 'CURRENT_TIMESTAMP'})
  creation_date: string;

  @Column({default: false})
  emailverify: boolean;


 @Column({nullable: true})
  codeOtp: string

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Prompt, (prompt) => prompt.user)
  prompt: Prompt[]

  @OneToMany(() => Prompt_Usage, (prompt_Usage) => prompt_Usage.user)
  prompt_Usage: Prompt_Usage[];

}
