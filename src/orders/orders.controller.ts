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
import { OrdersService } from './orders.service'

@Controller('api/v1/orders')
export class OrdersController {

    constructor(private ordersService: OrdersService) { }

    @Post('/')
    async createOrder(@Res() res, @Body() body, ) {
        try {
            body = this.ordersService.appendDetails('create', body)
            const order = await this.ordersService.createOrder(body)
            return res.status(HttpStatus.OK).json({
                message: "Order has been successfully created",
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
    async getAllOrders(@Res() res, @Param() queryParams, ) {
        try {
            const orders = await this.ordersService.getAllOrders(queryParams);
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
    async getOrderById(@Res() res, @Param('id') id, ) {
        try {
            const order = await this.ordersService.getOrder(id);
            if (!order) throw new NotFoundException('Order does not exist!');
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
    async updateOrderById(@Res() res, @Param('id') id, @Body() body) {
        try {
            body = this.ordersService.appendDetails('update', body)
            const order = await this.ordersService.updateOrderById(id, body);
            if (!order) throw new NotFoundException('Order does not exist!');
            return res.status(HttpStatus.OK).json({
                message: 'Order has been successfully updated',
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
    async deleteOrder(@Res() res, @Param('id') id, ) {
        try {
            const order = await this.ordersService.deleteOrder(id);
            if (!order) throw new NotFoundException('Order does not exist!');
            return res.status(HttpStatus.OK).json({
                message: 'Order has been deleted',
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
