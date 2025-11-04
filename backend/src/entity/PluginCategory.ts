import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity( {name:"plugin_category"} )
export class PluginCategory {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "category_name" })
    categoryName!: string;
}