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
        return await this.followedTransporterModel.find({ userId });
    }

    async createFollowedTransporter(userId: Types.ObjectId, transporterId: string) {
        return await this.followedTransporterModel.create({ userId, transporterId });
    }

    async deleteFollowedTransporter(userId: Types.ObjectId, transporterId: string) {
        return await this.followedTransporterModel.findOneAndDelete({ userId, transporterId });
    }

}
