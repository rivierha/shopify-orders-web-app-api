import { Injectable, Logger, Options } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './interface/order.interface'
import { Model } from 'mongoose';
import { CreateOrderDTO } from './dto/create-order.dto'

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel('Order') private readonly orderModel: Model<Order>,
    ) { }

    async createOrder(createOrderDTO: CreateOrderDTO): Promise<Order> {
        const newOrder = await this.orderModel(createOrderDTO);
        return newOrder.save();
    }

    async getOrder(id): Promise<Order> {
        const order = await this.orderModel.findById(id).exec();
        return order;
    }

    async getAllOrders(queryParams): Promise<any> {
        let options: any = {
            sortObject: {},
        };

        options.limit = queryParams.limit ? Number(queryParams.limit) : 100;
        delete queryParams.limit;
        options.index = queryParams.index ? Number(queryParams.index) : 0;
        delete queryParams.index;
        options.order = queryParams.order ? queryParams.order : 'createdAt';
        delete queryParams.order;
        options.sort = queryParams.sort ? queryParams.sort : 'desc';
        delete queryParams.sort;

        options.sortObject[options.order] = options.sort;

        const orders = await this.orderModel
            .find(queryParams)
            .skip(options.index)
            .limit(options.limit)
            .sort(options.sortObject)
            .exec();

        let result: any = { items: orders };
        result.index = options.index + orders.length;
        result.limit = options.limit;
        result.size = orders.length;
        result.order = options.order;
        result.sort = options.sort;
        result.truncated = result.size < result.limit ? false : true;
        return result;
    }

    async updateOrderById(
        id,
        createOrderDTO: CreateOrderDTO
    ): Promise<Order> {
        const updatedOrder = await this.orderModel.findByIdAndUpdate(
            id,
            createOrderDTO,
            { new: true }
        );
        return updatedOrder;
    }

    async deleteOrder(id): Promise<any> {
        const deleteOrder = await this.orderModel.findByIdAndRemove(id);
        return deleteOrder;
    }

    appendDetails(operation, body) {
        if (operation === 'create') {
            body.createdAt = body.modifiedAt = Date.now();
            return body;
        }
        else if (operation === 'update') {
            body.modifiedAt = Date.now();
            return body;
        }
    }

}
