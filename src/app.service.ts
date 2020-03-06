import { Injectable,Logger } from '@nestjs/common';
import { OrdersService} from './orders/orders.service'
import { CustomersService } from './customers/customers.service'

@Injectable()
export class AppService {

  constructor(
    private readonly ordersService: OrdersService,
    private readonly customersService: CustomersService
  ){}

  async createOrderAndCustomer(data){
    try {
      let customer = {
        email: data.customer.email,
        first_name: data.customer.first_name,
        last_name: data.customer.last_name,
        phone: data.customer.phone,
        default_address: data.customer.default_address
      } 
      let customerBody: any = this.appendDetails('create', customer)
      const newCustomer:any = await this.customersService.createCustomer(customerBody)
      Logger.log(newCustomer, "CUSTOMER")

      let order = {
        email:  data.email ,
        order_number:  data.order_number ,
        order_createdAt:  data.created_at ,
        total_price_set: data.total_price_set ,
        total_discount_set: data.total_discount_set ,
        total_line_items_price_set: data.total_line_items_price_set ,
        fulfillment_status:  data.fulfillment_status ,
        order_status_url:  data.order_status_url ,
        currency_code:  data.currency_code ,
        total_shipping_price_set:  data.total_shipping_price_set ,
        total_tax_set:  data.total_tax_set ,
        line_items: data.line_items ,
        shippingLines: data.shippingLines ,
        billing_Address: data.billing_Address ,
        shipping_address:  data.shipping_address ,
        customer_id: newCustomer._id
      }
      let orderBody: any = this.appendDetails('create', order)
      const newOrder = await this.ordersService.createOrder(orderBody)
      Logger.log(newOrder, "ORDER")

    } catch (error) {
      Logger.error(error,"Error")
    }
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
        else {
            return null;
        }
    }
}
