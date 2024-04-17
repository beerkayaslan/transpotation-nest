import { Injectable } from '@nestjs/common';
import { FollowedTransporter } from './entities/followedt-transporter.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class FollowedTransporterService {
    constructor(
        @InjectModel(FollowedTransporter.name) private followedTransporterModel: Model<FollowedTransporter>,
    ) { }

    async getFollowedTransporters(userId: Types.ObjectId) {
        return await this.followedTransporterModel.find({ customerId: userId });
    }

    async createFollowedTransporter(userId: Types.ObjectId, transporterId: string) {

        const data = await this.followedTransporterModel.find({ customerId: userId });

        if (data.length > 0) {
            return await this.followedTransporterModel.findOneAndUpdate({ customerId: userId }, { $push: { transporterId } });
        }

        return await this.followedTransporterModel.create({ customerId: userId, transporterId });
    }

    async deleteFollowedTransporter(userId: Types.ObjectId, transporterId: string) {

        const data = await this.followedTransporterModel.find({ customerId: userId });

        if (data.length > 0) {
            return await this.followedTransporterModel.findOneAndUpdate({ customerId: userId }, { $pull: { transporterId } });
        }

        return null;

    }

}
