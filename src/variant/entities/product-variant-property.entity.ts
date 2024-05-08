import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Variant } from "./variant.entity";

@Entity()
export class ProductVariantProperty{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    variantId : number

    @Column()
    propertyType: string

    @Column()
    value: string
    
    @ManyToOne(()=>Variant , (variant)=> variant.properties)
    variant: Variant
}
