import { Product } from "src/product/product.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    category: string;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];
}