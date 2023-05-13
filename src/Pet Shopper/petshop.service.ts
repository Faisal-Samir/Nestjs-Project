import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PetshopEntity } from "./petshop.entity";


@Injectable()
export class PetshopService {
    constructor(
        @InjectRepository(PetshopEntity)
        private petshopEntityRepo: Repository<PetshopEntity>,
      ) {}
    getRegistration(mydto):any {
        const petShopperAccount = new PetshopEntity;
        petShopperAccount.name = mydto.name;
        petShopperAccount.email = mydto.email;
        petShopperAccount.password = mydto.password;
        petShopperAccount.address = mydto.address;
        return this.petshopEntityRepo.save(mydto);
    }
      getCustomer(id):any {
        return this.petshopEntityRepo.find({ 
                where: {id:id},
            relations: {
                customer: true,
            },
         });
        }
    











}