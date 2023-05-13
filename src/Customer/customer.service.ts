/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdaptionEntity } from './adaption.entity';
import { AppointmentEntity } from './appointment.entity';
import { BlogEntity } from './blog.entity';
import { CustomerEntity } from './customer.entity';
import {
  CustomerImageUpload,
  CustomerRegistration,
  CustomerUpdate,
  CustomerUploadedAnimalImage,

} from './customerform.dto';
import { EmergencyHelpEntity } from './emergencyHelp.entity';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer/dist';
import { retry } from 'rxjs';
@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private customerRepo: Repository<CustomerEntity>,
    private mailerService: MailerService,
    @InjectRepository(AdaptionEntity)
    private adaptionRepo: Repository<AdaptionEntity>,
    @InjectRepository(AppointmentEntity)
    private appointmentRepo: Repository<AppointmentEntity>,
    @InjectRepository(BlogEntity)
    private blogRepo: Repository<BlogEntity>,
    @InjectRepository(EmergencyHelpEntity)
    private emergencyHelpRepo: Repository<EmergencyHelpEntity>,
  ) { }
  async getRegistration(register) {
    const customerAccount = new CustomerEntity();
    customerAccount.name = register.name;
    customerAccount.email = register.email;
    customerAccount.phone = register.phone;
    const salt = await bcrypt.genSalt();
    const hashedPassed = await bcrypt.hash(register.password, salt);
    register.password = hashedPassed;
    customerAccount.password = register.password;
    customerAccount.gender = register.gender;
    customerAccount.address = register.address;
    customerAccount.city = register.city;
    customerAccount.division = register.division;
    const isValidName = await this.customerRepo.findOneBy({ name: register.name });
    const isValidEmail = await this.customerRepo.findOneBy({ email: register.email });

    if (!isValidName && !isValidEmail) {
      return this.customerRepo.save(customerAccount);
    }
    else
      return "Username or Email already been registered!";
  }

  getCustomer(): any {
    return this.customerRepo.find();
  }

  // login
  async login(mydto) {
    if (mydto.email != null && mydto.password != null) {
      const mydata = await this.customerRepo.findOneBy({ email: mydto.email });
      const isMatch = await bcrypt.compare(mydto.password, mydata.password);
      if (isMatch) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  findCustomerByEmail(email) {
    return this.customerRepo.findOneBy({ email });
  }

  updateCustomer(mydto, email): any {
    return this.customerRepo.update({ email: email }, mydto);
  }

  updateCustomerById(myDto: CustomerRegistration, id: number): any {
    return this.customerRepo.update(id, myDto);
  }

  insertImage(adaption): any {
    const customerAdaptionImage = new AdaptionEntity();
    customerAdaptionImage.fileName = adaption.fileName;
    customerAdaptionImage.caption = adaption.caption;
    customerAdaptionImage.type = adaption.type;
    customerAdaptionImage.color = adaption.color;
    customerAdaptionImage.gender = adaption.gender;
    return this.adaptionRepo.save(customerAdaptionImage);
  }

  getAllUploadImage(): any {
    return this.adaptionRepo.find();
  }

  getAppointment(appointment): any {
    const appoint = new AppointmentEntity();
    appoint.animalTypeName = appointment.animalTypeName;
    appoint.age = appointment.age;
    appoint.phone = appointment.phone;
    appoint.branch = appointment.branch;
    appoint.problemType = appointment.problemType;
    appoint.nameOfDoctor = appointment.nameOfDoctor;
    return this.appointmentRepo.save(appoint);
  }

  appointment(queries) {
    return this.appointmentRepo.findOneBy({
      id: queries.id,
      phone: queries.phone,
    });
  }

  getAllAppointment() {
    return this.appointmentRepo.find();
  }
  findAppointmentById(id) {
    return this.appointmentRepo.findOneBy({ id });
  }

  updateAppointment(id, appointmentDto): any {
    return this.appointmentRepo.update(id, appointmentDto);
  }

  blogWriting(blog): any {
    const blogWriting = new BlogEntity();
    blogWriting.title = blog.title;
    blogWriting.description = blog.description;
    return this.blogRepo.save(blogWriting);
  }
  getBlogs() {
    return this.blogRepo.find();
  }

  findBlogById(id) {
    return this.blogRepo.findOneBy({ id });
  }

  

  updateBlog(id, blogDto): any {
    return this.blogRepo.update(id, blogDto);
  }

  deleteBlogById(id) {
    return this.blogRepo.delete(id);
  }

  emergencyHelp(ImageUpload: CustomerImageUpload) {
    return this.emergencyHelpRepo.save(ImageUpload);
  }

  getEmergency(){
    return this.emergencyHelpRepo.find();
  }

  findEmergencyById(id){
    return this.emergencyHelpRepo.findOneBy({id});
  }

  async sendEmail(mydata) {
    return await this.mailerService.sendMail({
      to: mydata.email,
      subject: mydata.subject,
      text: mydata.text,
    });
  }
  getPetShopByCustomer(id): any {
    return this.customerRepo.find({
      where: { id: id },
      relations: {
        petshop: true,
      },
    });
  }
}
