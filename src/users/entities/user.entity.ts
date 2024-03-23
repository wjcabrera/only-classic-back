import { Article } from 'src/articles/entities/article.entity';
import { Question } from 'src/questions/entities/question.entity';
import { Sale } from 'src/sales/entities/sale.entity';
import { RoleEnum } from 'src/shared/enums/role.enum';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToMany,
} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 50 })
    first_name: string;

    @Column('varchar', { length: 50 })
    last_name: string;

    @Column('boolean', { default: true })
    is_active: boolean;

    @Column('varchar', { unique: true, length: 50 })
    email: string;

    @Column('varchar', { length: 50 })
    password: string;

    @Column('varchar', { length: 50, nullable: true })
    address: string;

    @Column('varchar', { length: 50, nullable: true })
    phone: string;

    @Column('varchar', { length: 50, nullable: true })
    country: string;

    @Column('varchar', { length: 50, nullable: true })
    identification: string;

    @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.CUSTOMER })
    role: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Sale, (sale) => sale.buyer)
    sales_bought: Sale[];

    @OneToMany(() => Sale, (sale) => sale.seller)
    sales_sold: Sale[];

    @ManyToMany(() => Article, (article) => article.user)
    articles: Article[];

    @OneToMany(() => Question, (question) => question.user)
    questions: Question[];
}
