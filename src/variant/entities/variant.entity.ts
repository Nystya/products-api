import { Product } from "src/product/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductVariantProperty } from "./product-variant-property.entity";
import { Stock } from "src/stock/stock.entity";

@Entity()
export class Variant{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    productId: number;

    @ManyToOne(() => Product, (product)=> product.variants)
    product:Product

    @OneToMany(()=> ProductVariantProperty , 
    (productVariantProperty)=>productVariantProperty.variant)
    properties:ProductVariantProperty[];

    @OneToOne(() => Stock, stock => stock.variant, { cascade: true })
    @JoinColumn()
    stock: Stock;
}