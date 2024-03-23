import { Attachment } from 'src/attachments/entities/attachment.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Question } from 'src/questions/entities/question.entity';
import { Sale } from 'src/sales/entities/sale.entity';
import { CurrencyEnum } from 'src/shared/enums/currency.enum';
import { StateArticleEnum } from 'src/shared/enums/stateArticle.enum';
import { User } from 'src/users/entities/user.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    OneToOne,
    ManyToMany,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 50 })
    title: string;

    @Column('varchar', { length: 50 })
    brand: string;

    @Column('varchar', { length: 50 })
    model: string;

    @Column('int')
    year: number;

    @Column('text')
    description: string;

    @Column('float', { default: 0 })
    price: number;

    @Column('enum', { enum: CurrencyEnum, default: CurrencyEnum.USD })
    currency: string;

    @Column('varchar', { length: 50 })
    location: string;

    @Column('enum', {
        enum: StateArticleEnum,
        default: StateArticleEnum.ENABLED,
    })
    state: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Category, (category) => category.articles)
    @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
    category: Category;

    @OneToOne(() => Sale, (sale) => sale.article)
    sale: Sale[];

    @ManyToMany(() => Question, (question) => question.article)
    questions: Question[];

    @ManyToMany(() => User, (user) => user.articles)
    user: User[];

    @OneToMany(() => Attachment, (attachment) => attachment.article)
    attachments: Attachment[];
}
