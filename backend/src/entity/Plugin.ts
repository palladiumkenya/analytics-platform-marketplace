import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Plugin {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({name: "plugin_name"})
    pluginName!: string;

    @Column({ name: "category_id" })
    categoryId!: number;

    @Column()
    description?: string;

    @Column()
    version!: number;

    @Column({ name: "plugin_url" })
    pluginUrl!: string;

    @Column({ name: "plugin_key" })
    pluginKey!: string;    

    @Column({ name: "created_at", type: "timestamp" })
    createdAt?: Date;
}