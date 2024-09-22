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

  @Column({ length: 500, nullable: true })
  fullname: string;

  @Column({ length: 500, nullable: true })
  image: string;

  @Column({ length: 500, nullable: true })
  dob: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ length: 500, nullable: true })
  address: string;

  @Column({ nullable: true })
  cnic: number;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STAFF,
  })
  role: UserRole;
  @Column({
    type: 'enum',
    enum: DeptRole,
    nullable: true, // Only relevant if the role is DEPTS
  })
  deptRole: DeptRole;
  @Column({ length: 500, nullable: true })
  location: string; // Link to space health page

  @Column({ length: 500, nullable: true })
  roleLink: string; // Link to department page

  @Column({ length: 500, nullable: true })
  birthdayLink: string; // Link to calendar

  @Column({ length: 500, nullable: true })
  emailLink: string; // Link to email

  // @ManyToOne(() => Department, (department) => department.users)
  // @JoinColumn({ name: 'department_id' })
  // department: Department; // Link to department entity

  // @ManyToOne(() => User, (user) => user.lineManagers)
  // @JoinColumn({ name: 'line_manager_id' })
  // lineManager: User; // Link to line manager profile

  // @ManyToOne(() => User, (user) => user.delegates)
  // @JoinColumn({ name: 'delegate_id' })
  // delegate: User; // Link to delegate profile

  @Column({ nullable: true })
  salary: number; // Salary amount

  @Column({ length: 500, nullable: true })
  salarySlip: string; // Link to salary slip (visible only to self and line managers)

  @Column({ length: 500, nullable: true })
  recentExpenseClaim: string; // Link to recent expense claim

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
