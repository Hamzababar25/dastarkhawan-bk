import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum UserRole {
  STAFF = 'staff',
  SUPERADMIN = 'superadmin',
  DEPTS = 'depts',
  CA = 'ca',
  CEO = 'ceo',
}
export enum DeptRole {
  IT_GUY = 'it_guy',
  ADMIN = 'admin',
  FACILITY_GUY = 'facility_guy',
}
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column({ length: 500, nullable: false })
  username: string;

  @Column({ length: 500, nullable: false })
  mail: string;

  @Column({ length: 500, nullable: false })
  password: string;

  

  @Column({ length: 500, nullable: false })
  fullname: string;
  @Column({ length: 500, nullable: true })
  image: string;
  @Column({ length: 500, nullable: true })
  location: string; // Link to space health page

  @Column({ nullable: true })
  role: string;

  @Column({ nullable: true })
  cnic: number;

  @Column({ length: 500, nullable: true })
  address: string;



  

 

  
  @Column({ length: 500, nullable: true })
  dob: string;

  @Column({ length: 20, nullable: true })
  phone: string;

 

  

  @Column({ nullable: true })
  deptRole: string;
 
  

  

  @Column({ nullable: true })
  salary: number; // Salary amount

  @Column({ length: 500, nullable: true })
  Delegate: string; // Link to salary slip (visible only to self and line managers)

  @Column({ length: 500, nullable: true })
  LineManager: string; 

  @Column({ length: 500, nullable: true })
  contract: string; // Attached PDF (contract)

  @Column({ length: 500, nullable: true })
  bankLetter: string; // Attached PDF (bank letter)

  @Column({ length: 500, nullable: true })
  letterhead: string; // Attached PDF (letterhead)

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
