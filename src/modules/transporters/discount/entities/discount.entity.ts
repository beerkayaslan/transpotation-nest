import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: true, })
export class Discount {
    @Prop({ required: true })
    transporterId: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    percentage: string;

    @Prop({ required: true })
    code: string;

    @Prop({ required: true })
    startDate: string;

    @Prop({ required: true })
    endDate: string;
}

export const DiscountSchema = SchemaFactory.createForClass(Discount);