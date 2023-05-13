import { PetshopEntity } from 'src/Pet Shopper/petshop.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Customer')
export class CustomerEntity {
  @Column()
  name: string;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column()
  gender: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  division: string;

  @OneToMany(() => PetshopEntity, (petshop) => petshop.customer)
  petshop: PetshopEntity[];
}
