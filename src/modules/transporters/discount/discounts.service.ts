import { Injectable } from '@nestjs/common';
import { Discount } from './entities/discount.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DiscountsService {
    constructor(
        @InjectModel(Discount.name) private discountModel: Model<Discount>,
    ) { }

    async getDiscounts(user) {
        return await this.discountModel.find({ transporterId: user._id });
    }

    async createDiscount(user, createDiscount) {
        const discount = new this.discountModel({
            ...createDiscount,
            transporterId: user._id
        });
        return await discount.save();
    }

    async deleteDiscount(user, id) {
        return await this.discountModel.findOneAndDelete({ _id: id, transporterId: user._id });
    }
}
