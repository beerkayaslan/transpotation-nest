import { Injectable } from '@nestjs/common';
import { FollowedTransporter } from './entities/create-cargo.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Role } from 'src/auth/role.enum';
import { GetDto } from './dto/get.dto';

@Injectable()
export class FollowedTransporterService {
    constructor(
        @InjectModel(FollowedTransporter.name) private followedTransporterModel: Model<FollowedTransporter>,
    ) { }

    async getFollowedTransporters(userId: Types.ObjectId, getDto: GetDto) {
        try {

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

            query = { ...query, role: Role.TRANSPORTER };

            const total = await this.followedTransporterModel.countDocuments(query);
            const data = await this.followedTransporterModel.aggregate([
                {
                    $match: query
                },
                {
                    $addFields: {
                        followed: {
                            $cond: { if: { $in: [userId, "$followers"] }, then: true, else: false }
                        }
                    }
                },
                {
                    $skip: Number(skip)
                },
                {
                    $limit: Number(limit)
                }
            ]);

            const meta = {
                page: Number(page),
                perPage: Number(limit),
                total,
            };
    
            return { data, meta };
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
