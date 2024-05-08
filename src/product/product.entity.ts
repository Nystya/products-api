import { Category } from "src/category/category.entity";
import { Variant } from "src/variant/entities/variant.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    isActive: boolean;
    
    @Column()
    categoryId: number

    @ManyToOne(() => Category ,(category) => category.products)
    category:Category;

    @OneToMany(()=>Variant,(variant)=> variant.product)
    variants :Variant[]
}