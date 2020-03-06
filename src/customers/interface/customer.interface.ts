import { Document } from 'mongoose';

export interface Customer extends Document {
    readonly email: string;
    readonly first_name: string;
    readonly last_name: string;
    readonly phone: number;
    readonly default_address: {};
    readonly createdAt: Date;
    readonly modifiedAt: Date;
}