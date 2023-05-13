import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetshopEntity } from 'src/Pet Shopper/petshop.entity';
import { PetshopService } from 'src/Pet Shopper/petshop.service';
import { AdaptionEntity } from './adaption.entity';
import { AppointmentEntity } from './appointment.entity';
import { BlogEntity } from './blog.entity';
import { CustomerController } from './customer.controller';
import { CustomerEntity } from './customer.entity';
import { CustomerService } from './customer.service';
import { EmergencyHelpEntity } from './emergencyHelp.entity';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: 'samir.faisalaiubcse@gmail.com',
          pass: 'eklujsqstzwbpzpw',
        },
      },
    }),
    TypeOrmModule.forFeature([
      AdaptionEntity,
      CustomerEntity,
      AppointmentEntity,
      BlogEntity,
      EmergencyHelpEntity,
      PetshopEntity,
    ]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService, PetshopService],
})
export class CustomerModule {}
