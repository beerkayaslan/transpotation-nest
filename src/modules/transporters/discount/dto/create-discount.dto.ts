import {
    IsNotEmpty,
    IsString,
    MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDiscountDto {
    @ApiProperty({
        description: 'Name of the Discount',
        type: 'string',
        example: 'Discount Name',
    })
    @IsString()
    @MinLength(2, { message: 'Name must have atleast 2 characters.' })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Discount Percentage',
        type: 'number',
        example: 10,
    })
    @IsNotEmpty()
    percentage: number;

    @ApiProperty({
        description: 'Discount Code',
        type: 'string',
        example: 'DISCOUNTCODE',
    })
    @IsString()
    @MinLength(2, { message: 'Code must have atleast 2 characters.' })
    @IsNotEmpty()
    code: string;

    @ApiProperty({
        description: 'Discount Start Date',
        type: 'string',
        example: '2021-08-01',
    })
    @IsString()
    @IsNotEmpty()
    startDate: string;

    @ApiProperty({
        description: 'Discount End Date',
        type: 'string',
        example: '2021-08-31',
    })
    @IsString()
    @IsNotEmpty()
    endDate: string;
}