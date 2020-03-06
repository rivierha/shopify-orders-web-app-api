import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Res,
    Body,
    HttpStatus,
    Query,
    Param,
    Logger,
    ForbiddenException,
    NotFoundException,
    HttpException,
} from '@nestjs/common';
import { CustomersService } from './customers.service'

@Controller('api/v1/customers')
export class CustomersController {

    constructor(private customersService: CustomersService) { }

    @Post('/')
    async createCustomer(@Res() res, @Body() body, ) {
        try {
            body = this.customersService.appendDetails('create', body)
            const order = await this.customersService.createCustomer(body)
            return res.status(HttpStatus.OK).json({
                message: "Customer has been successfully created",
                order
            })
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

    @Get('/')
    async getAllCustomers(@Res() res, @Param() queryParams, ) {
        try {
            const orders = await this.customersService.getAllCustomers(queryParams);
            return res.status(HttpStatus.OK).json(orders);
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

    @Get('/:id')
    async getCustomerById(@Res() res, @Param('id') id, ) {
        try {
            const order = await this.customersService.getCustomer(id);
            if (!order) throw new NotFoundException('Customer does not exist!');
            return res.status(HttpStatus.OK).json(order);
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

    @Put('/:id')
    async updateCustomerById(@Res() res, @Param('id') id, @Body() body) {
        try {
            body = this.customersService.appendDetails('update', body)
            const order = await this.customersService.updateCustomerById(id, body);
            if (!order) throw new NotFoundException('Customer does not exist!');
            return res.status(HttpStatus.OK).json({
                message: 'Customer has been successfully updated',
                order
            })
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

    @Delete('/:id')
    async deleteCustomer(@Res() res, @Param('id') id, ) {
        try {
            const order = await this.customersService.deleteCustomer(id);
            if (!order) throw new NotFoundException('Customer does not exist!');
            return res.status(HttpStatus.OK).json({
                message: 'Customer has been deleted',
                order
            })
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
