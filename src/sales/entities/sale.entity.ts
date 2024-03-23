import { Article } from 'src/articles/entities/article.entity';
import { CurrencyEnum } from 'src/shared/enums/currency.enum';
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

    @Column('float', { default: 0 })
    amount: number;

    @Column('enum', { enum: CurrencyEnum, default: CurrencyEnum.USD })
    currency: string;

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

    @OneToOne(() => Article, (article) => article.sale)
    article: Article;

    @ManyToOne(() => User, (user) => user.sales_bought)
    @JoinColumn({ name: 'buyer_id', referencedColumnName: 'id' })
    buyer: User;

    @ManyToOne(() => User, (user) => user.sales_sold)
    @JoinColumn({ name: 'seller_id', referencedColumnName: 'id' })
    seller: User;
}
