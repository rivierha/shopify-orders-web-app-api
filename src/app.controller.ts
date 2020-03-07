import { Controller, Res, Post, Body, Req, Logger,HttpStatus, HttpException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api/v1/')
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Post('/webhook/subscriptions')
  async createOrderAndCustomer(@Body() body, @Req() req, @Res() res){
    try {
      let a = this.appService.createOrderAndCustomer(body)
      return res.status(HttpStatus.OK).json(a);

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
