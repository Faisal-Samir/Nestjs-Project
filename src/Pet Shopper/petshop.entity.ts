import { CustomerEntity } from 'src/Customer/customer.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity("Petshop")
export class PetshopEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @ManyToOne(() => CustomerEntity, (customer) => customer.petshop)
  @JoinColumn({ name: "customerId" })
  customer: CustomerEntity

  @Column()
  customerId: number;

}