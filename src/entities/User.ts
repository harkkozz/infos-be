import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Like,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

import { Company } from './Company';
import slugify from 'slugify';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  slug: string;

  @OneToMany(() => Company, company => company.user)
  companies: Company[];

  @BeforeInsert()
  @BeforeUpdate()
  async setSlug() {
    const u = await User.find({
      where: { slug: Like(`${slugify(this.name, { lower: true })}%`) }
    });
    console.log(u);
    this.slug = `${slugify(this.name, { lower: true })}${u.length > 0 ? `-${u.length}` : ''}`;
  }
}
