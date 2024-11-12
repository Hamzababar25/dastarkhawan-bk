import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum UserRole {
  CEO  = 'ceo_coo',
  Coo='coo',
  REGIONAL_MANAGER = 'regional_manager',
  COMMUNITY_EXECUTIVE = 'community_executive',
  COMMUNITY_ASSOCIATE = 'community_associate',
  FRONT_DESK_OFFICER = 'front_desk_officer',
  FACILITY_MANAGER = 'facility_manager',
  ADMIN_MANAGER = 'admin_manager',
  IT_TEAM = 'it_team',
  IT_HEAD = 'it_head',
  BUILDOUT = 'buildout',
  FINANCE_TEAM = 'finance_team',
  SALES_TEAM = 'sales_team',
  HEAD_OF_SALES = 'head_of_sales',
  HEAD_OF_MARKETING = 'head_of_marketing',
  MARKETING_TEAM = 'marketing_team',
  PEOPLE_CULTURE_HEAD = 'people_culture_head',
  YELLOW_BAR = 'yellow_bar',
  SUPERVISOR = 'supervisor'
}


export enum DeptRole {
FINANCE='finance',
  ADMIN = 'admin',
  FACILITY = 'facility',
  BUILDOUT='buildout',
  PROCUREMENT='procurement',
  PARTNERSHIPS='partnerships',
  PC='pc',
  EXPERIENCE='experience',
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
  @Column({ length: 5000, nullable: true })
  image: string;
  @Column({ length: 500, nullable: true })
  location: string; // Link to space health page

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CEO, })
  role: UserRole;
  

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

  @Column({ length: 5000, nullable: true })
  contract: string; // Attached PDF (contract)

  @Column({ length: 5000, nullable: true })
  bankLetter: string; // Attached PDF (bank letter)

  @Column({ length: 5000, nullable: true })
  letterhead: string; // Attached PDF (letterhead)
  // @Column('text', { nullable: true })
  // contract: string;

  // @Column('text', { nullable: true })
  // bankLetter: string;

  // @Column('text', { nullable: true })
  // letterhead: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
