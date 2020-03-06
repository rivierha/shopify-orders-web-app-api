import { Controller, Get, Post, Body, Req, Logger,HttpStatus, HttpException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api/v1/')
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Post('/webhook/subscriptions')
  async createOrderAndCustomer(@Body() body, @Req() req){
    try {
      this.appService.createOrderAndCustomer(body)
    } catch (err) {
      Logger.error(err);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: err,
        },
        400,
      ); 
    }
  }

}
