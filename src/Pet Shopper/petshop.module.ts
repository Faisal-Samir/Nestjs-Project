import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PetshopEntity } from "./petshop.entity";
import { PetshopService } from "./petshop.service";
import { PetShopperController } from "./petShopper.controller";



@Module({
imports: [TypeOrmModule.forFeature([PetshopEntity])],
controllers: [PetShopperController],
providers: [PetshopService],

})

export class PetshopModule {}