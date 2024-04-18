import { Injectable } from '@nestjs/common';
import { Discount } from './entities/discount.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DiscountsService {
    constructor(
        @InjectModel(Discount.name) private discountModel: Model<Discount>,
    ) { }

    async getDiscounts(user, getDto) {

        const { page = 1, limit = 10, search, searchKeys } = getDto;
        const skip = (Number(page) - 1) * Number(limit);
        let query = {};

        if (search && searchKeys) {
            const searchFields = searchKeys.split(',');
            const searchConditions = searchFields.map((field) => ({
                [field]: { $regex: new RegExp(search, 'i') }, // Case insensitive search
            }));
            query = { $or: searchConditions };
        }

        query = { ...query, transporterId: user._id };

        const total = await this.discountModel.countDocuments(query);
        const data = await this.discountModel.find(query)
            .skip(skip)
            .limit(limit)
            .exec();

        const meta = {
            page: Number(page),
            perPage: Number(limit),
            total,
        };

        return { data, meta };
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

    async getDiscount(code: string, transporter: string) {
        const data = await this.discountModel.findOne({ code, transporterId: transporter });

        if(!data) {
            return null;
        }
        
        const startDate = new Date(data.startDate.split("-").reverse().join("-"));
        const endDate = new Date(data.endDate.split("-").reverse().join("-"));
    
        if (startDate <= new Date() && endDate >= new Date()) {
            console.log('Discount is valid')
            return data;
        }

        return null;
    }
}
