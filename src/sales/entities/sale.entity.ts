import { Article } from 'src/articles/entities/article.entity';
import { DeliveryMethodEnum } from 'src/shared/enums/deliveryMethod.enum';
import { PaymentMethodEnum } from 'src/shared/enums/paymentMethod.enum';
import { User } from 'src/users/entities/user.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToOne,
    JoinColumn,
} from 'typeorm';

@Entity()
export class Sale {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('enum', {
        enum: PaymentMethodEnum,
        default: PaymentMethodEnum.CASH,
    })
    payment_method: string;

    @Column('enum', {
        enum: DeliveryMethodEnum,
        default: DeliveryMethodEnum.MEETUP,
    })
    delivery_method: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(() => Article, (article) => article.sale, { nullable: false })
    @JoinColumn({ name: 'article_id', referencedColumnName: 'id' })
    @Column('int', { nullable: false, name: 'article_id' })
    article: Article;

    @ManyToOne(() => User, (user) => user.sales_bought, { nullable: false })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    @Column('int', { nullable: false, name: 'user_id' })
    user: User;
}
