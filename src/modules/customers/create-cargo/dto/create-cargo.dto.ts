import {
    IsNotEmpty,
    IsNumber,
    IsString,
} from 'class-validator';

export class CreateCreateCargoDto {

    @IsString()
    @IsNotEmpty()
    transporterId: string;

    @IsString()
    @IsNotEmpty()
    desi: string;

    @IsNumber()
    @IsNotEmpty()
    km: number;

    @IsString()
    @IsNotEmpty()
    city1: string;
    
    @IsString()
    @IsNotEmpty()
    city2: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;    

}