import { Injectable } from '@nestjs/common';
import { CreateCargo } from './entities/create-cargo.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { GetDto } from './dto/get.dto';
import { CreateCreateCargoDto } from './dto/create-cargo.dto';

@Injectable()
export class CreateCargoService {
    constructor(
        @InjectModel(CreateCargo.name) private followedTransporterModel: Model<CreateCargo>,
    ) { }

    async getCargos(userId: Types.ObjectId, getDto: GetDto) {
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

            query = { ...query, userId };

            const total = await this.followedTransporterModel.countDocuments(query);
            const data = await this.followedTransporterModel.find(query).skip(Number(skip)).limit(Number(limit));

            const meta = {
                page: Number(page),
                perPage: Number(limit),
                total,
            };
    
            return { data, meta };
        }
        catch (error) {
            throw new Error(error);
        }

    }

    async createCargo(userId: Types.ObjectId, createFollowedTransporterDto: CreateCreateCargoDto) {
        try {
            const createdFollowedTransporter = new this.followedTransporterModel({ ...createFollowedTransporterDto, userId });
            return await createdFollowedTransporter.save();
        }
        catch (error) {
            throw new Error(error);
        }
    }

 
    async deleteCargo(userId: Types.ObjectId, id: string) {
        try {
            return await this.followedTransporterModel.findOneAndDelete({ _id: id, userId });
        }
        catch (error) {
            throw new Error(error);
        }
    }

    
}
