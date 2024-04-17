import { Injectable } from '@nestjs/common';
import { FollowedTransporter } from './entities/followedt-transporter.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Role } from 'src/auth/role.enum';

@Injectable()
export class FollowedTransporterService {
    constructor(
        @InjectModel(FollowedTransporter.name) private followedTransporterModel: Model<FollowedTransporter>,
    ) { }

    async getFollowedTransporters(userId: Types.ObjectId) {
        try {
            const data = await this.followedTransporterModel.aggregate([
                {
                    $match: { role: Role.TRANSPORTER }
                },
                {
                    $addFields: {
                        followed: {
                            $cond: { if: { $in: [userId, "$followers"] }, then: true, else: false }
                        }
                    }
                }
            ]);

            return data;
        }
        catch (error) {
            console.log(error.message)
            throw new Error(error);
        }

    }

    async createFollowedTransporter(userId: Types.ObjectId, transporterId: string) {

        const findTransporter = await this.followedTransporterModel.findOne({ _id: transporterId, role: Role.TRANSPORTER });

        if (findTransporter) {
            return await this.followedTransporterModel.findOneAndUpdate({ _id: transporterId }, { $push: { followers: userId } });
        }
    }

    async deleteFollowedTransporter(userId: Types.ObjectId, transporterId: string) {

        const findTransporter = await this.followedTransporterModel.findOne({ _id: transporterId, role: Role.TRANSPORTER });

        if (findTransporter) {
            return await this.followedTransporterModel.findOneAndUpdate({ _id: transporterId }, { $pull: { followers: userId } });
        }

    }

}
