import { Injectable, Logger, Options } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './interface/customer.interface'
import { Model } from 'mongoose';
import { CreateCustomerDTO } from './dto/create-customer.dto'

@Injectable()
export class CustomersService {
    constructor(
        @InjectModel('Customer') private readonly customerModel: Model<Customer>,
    ) { }

    async createCustomer(createCustomerDTO: CreateCustomerDTO): Promise<Customer> {
        const newCustomer = await this.customerModel(createCustomerDTO);
        return newCustomer.save();
    }

    async getCustomer(id): Promise<Customer> {
        const customer = await this.customerModel.findById(id).exec();
        return customer;
    }

    async getAllCustomers(queryParams): Promise<any> {
        let options: any = {
            sortObject: {},
        };

        options.limit = queryParams.limit ? Number(queryParams.limit) : 20;
        delete queryParams.limit;
        options.index = queryParams.index ? Number(queryParams.index) : 0;
        delete queryParams.index;
        options.order = queryParams.order ? queryParams.order : 'createdAt';
        delete queryParams.order;
        options.sort = queryParams.sort ? queryParams.sort : 'desc';
        delete queryParams.sort;

        options.sortObject[options.order] = options.sort;

        const customers = await this.customerModel
            .find(queryParams)
            .skip(options.index)
            .limit(options.limit)
            .sort(options.sortObject)
            .exec();

        let result: any = { items: customers };
        result.index = options.index + customers.length;
        result.limit = options.limit;
        result.size = customers.length;
        result.order = options.order;
        result.sort = options.sort;
        result.truncated = result.size < result.limit ? false : true;
        return result;
    }

    async updateCustomerById(
        id,
        createCustomerDTO: CreateCustomerDTO
    ): Promise<Customer> {
        const updatedCustomer = await this.customerModel.findByIdAndUpdate(
            id,
            createCustomerDTO,
            { new: true }
        );
        return updatedCustomer;
    }

    async deleteCustomer(id): Promise<any> {
        const deleteCustomer = await this.customerModel.findByIdAndRemove(id);
        return deleteCustomer;
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
