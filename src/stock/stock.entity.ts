import { Variant } from "src/variant/entities/variant.entity";
import { PrimaryGeneratedColumn,Column, OneToOne, JoinColumn, Entity } from "typeorm";

@Entity()
export class Stock{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    variantId: number;

    @Column()
    quantity: number;
    
    @OneToOne(() => Variant)
    @JoinColumn({name:'variantId'})
    variant:Variant

}