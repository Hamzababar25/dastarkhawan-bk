import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column({ length: 500, nullable: false })
  fullname: string;

  @Column({ nullable: true })
  role: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ length: 500, nullable: true })
  site: string;

  @Column({ length: 500, nullable: true })
  floor: string;

  @Column({ length: 500, nullable: true })
  office: string;

  @Column({ nullable: true })
  dob: string;

  @Column({ length: 20, nullable: true })
  phoneNumber: string;

  @Column({ length: 500, nullable: true })
  facebook: string;

  @Column({ length: 500, nullable: true })
  linkedin: string;

  @Column({ length: 500, nullable: true })
  twitter: string;

  @Column({ length: 500, nullable: true })
  insta: string;

  @Column({ length: 500, nullable: false })
  mail: string;

  @Column({ length: 500, nullable: true })
  devices: string;

  @Column({ length: 500, nullable: true })
  speed: string;

  @Column({ length: 500, nullable: false })
  username: string;

  @Column({ length: 500, nullable: false })
  password: string;

  // Storing multiple personal info fields in JSON format
  @Column('json', { nullable: true })
  personalInfo: {
    info1: string;
    info2: string;
    info3: string;
    info4?: string;
  };

  @Column({ nullable: true })
  tenure: string;

  @Column({ nullable: true })
  monthlyInvoice: number;

  @Column({ nullable: true })
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
