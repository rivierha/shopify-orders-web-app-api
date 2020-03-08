import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [CustomersModule, OrdersModule, MongooseModule.forRoot('mongodb://shopify:shopify@shopify-shard-00-00-50kxh.gcp.mongodb.net:27017,shopify-shard-00-01-50kxh.gcp.mongodb.net:27017,shopify-shard-00-02-50kxh.gcp.mongodb.net:27017/test?ssl=true&replicaSet=shopify-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
