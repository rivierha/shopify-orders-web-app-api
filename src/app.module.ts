import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [CustomersModule, OrdersModule, MongooseModule.forRoot('mongodb://172.31.32.161:27017/shopify', { useNewUrlParser: true, useUnifiedTopology: true }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
