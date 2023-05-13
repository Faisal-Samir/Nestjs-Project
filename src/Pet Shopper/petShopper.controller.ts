import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { PetshopForm } from "./petshop.dto";
import { PetshopService } from "./petshop.service";

@Controller("/Shopper")
export class PetShopperController{
    constructor (private petShopperService : PetshopService)
    {}

    @Post("/registration")
    @UsePipes(new ValidationPipe())
    getRegistration(@Body() register : PetshopForm){
        return this.petShopperService.getRegistration(register);
    }

    @Get('/findCustomer/:id')
    getCustomer(@Param('id', ParseIntPipe) id: number): any {
      return this.petShopperService.getCustomer(id);
    }
}