import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
    email:  String ,
    order_number:  String ,
    order_createdAt:  String ,
    total_price_set: {} ,
    total_discount_set: {} ,
    total_line_items_price_set: {} ,
    fulfillment_status:  String ,
    order_status_url:  String ,
    currency_code:  String ,
    total_shipping_price_set:   {} ,
    total_tax_set:   {} ,
    line_items: [] ,
    shippingLines: [] ,
    billing_Address: {} ,
    shipping_address:   {} ,
    customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CustomerCollection'
  } ,
    createdAt: Date ,
    modifiedAt: Date ,
});