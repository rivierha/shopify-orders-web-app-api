import { Document } from 'mongoose';

export interface Order extends Document {
    readonly email: string;
    readonly order_number: string;
    readonly order_createdAt: string;
    readonly total_price_set: {};
    readonly total_discount_set: {};
    readonly total_line_items_price_set: {};
    readonly fulfillment_status: string;
    readonly order_status_url: string;
    readonly currency_code: string;
    readonly total_shipping_price_set:  {};
    readonly total_tax_set:  {};
    readonly line_items: [];
    readonly shippingLines: [];
    readonly billing_Address: {};
    readonly shipping_address:  {};
    readonly customer_id: string;
    readonly createdAt: Date;
    readonly modifiedAt: Date;
}