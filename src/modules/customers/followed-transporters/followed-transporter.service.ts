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
        // use aggragate to get followed transporters with transporter details in users collection transpr
        // this code right but all transporters get data but we need followed transporter followed: true or false add field

        const followedTransporters = await this.followedTransporterModel.aggregate([
            {
                $match: { customerId: userId }
            },
            {
                $lookup: {
                    from: 'users',
                    // transporterId is a array of string so we need to convert it to ObjectId
                    let: { transporterId: { $map: { input: '$transporterId', as: 'id', in: { $toObjectId: '$$id' } } } },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $in: ['$_id', '$$transporterId'] }
                            }
                        },
                        {
                            $project: {
                                _id: 1,
                                name: 1,
                                email: 1,
                            }
                        }
                    ],
                    as: 'transporter'
                }
            },
            {
                $unwind: "$transporter"
            }
        ]);

        return followedTransporters;

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
