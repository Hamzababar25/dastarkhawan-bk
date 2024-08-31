
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, PrimaryColumn, OneToMany, ManyToOne, JoinColumn, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id: string;
    
  @Column({ length: 500,nullable:false })
  mail: string;
  @Column({ length: 500,nullable:false })
  username: string;

  @Column({ length: 500,nullable:false })
  password: string;

  @Column({ length: 500,nullable:true })
  fullname: string;

  @Column({ length: 500,nullable:true })
  image: string;
  @Column({ length: 500,nullable:true })
  dob: string;
}