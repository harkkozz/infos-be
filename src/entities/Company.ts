import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Like,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import slugify from 'slugify';

import { User } from './User';

@Entity('companies')
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  companyName: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phoneNumber: string;

  @ManyToOne(() => User, user => user.companies)
  user: User;

  @Column()
  userId: string;

  @Column({ nullable: true })
  slug: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async setSlug() {
    const c = await Company.find({
      where: { slug: Like(`${slugify(this.companyName, { lower: true })}%`) }
    });

    this.slug = `${slugify(this.companyName, { lower: true })}${
      c.length > 0 ? `-${c.length}` : ''
    }`;
  }
}
