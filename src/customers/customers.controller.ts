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
            const customer = await this.customersService.createCustomer(body)
            return res.status(HttpStatus.OK).json({
                message: "Customer has been successfully created",
                customer
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
            const customers = await this.customersService.getAllCustomers(queryParams);
            return res.status(HttpStatus.OK).json(customers);
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
            const customer = await this.customersService.getCustomer(id);
            if (!customer) throw new NotFoundException('Customer does not exist!');
            return res.status(HttpStatus.OK).json(customer);
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
            const customer = await this.customersService.updateCustomerById(id, body);
            if (!customer) throw new NotFoundException('Customer does not exist!');
            return res.status(HttpStatus.OK).json({
                message: 'Customer has been successfully updated',
                customer
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
            const customer = await this.customersService.deleteCustomer(id);
            if (!customer) throw new NotFoundException('Customer does not exist!');
            return res.status(HttpStatus.OK).json({
                message: 'Customer has been deleted',
                customer
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
