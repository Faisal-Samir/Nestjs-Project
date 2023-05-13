import { Module } from '@nestjs/common';
import { DoctorModule } from './Doctor/doctor.module';
import { CustomerModule } from './Customer/customer.module';
import { AdminModule } from './Admin/adminmodule.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './Customer/customer.entity';
import { AdaptionEntity } from './Customer/adaption.entity';
import { AppointmentEntity } from './Customer/appointment.entity';
import { BlogEntity } from './Customer/blog.entity';
import { EmergencyHelpEntity } from './Customer/emergencyHelp.entity';
import { DoctorEntity } from './Doctor/doctor.entity';
import { PrescriptionEntity } from './Doctor/prescription.entity';
import { PetshopModule } from './Pet Shopper/petshop.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'samir2022',
      database: 'Animal_Care',
      // entities: [CustomerEntity,AdaptionEntity,AppointmentEntity,BlogEntity,EmergencyHelpEntity,DoctorEntity,PrescriptionEntity],
      autoLoadEntities: true,
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../public'), // added ../ to get one folder back
      serveRoot: '/public/', //last slash was important
    }),
    DoctorModule,
    CustomerModule,
    AdminModule,
    PetshopModule,
  ],
})
export class AppModule {}
