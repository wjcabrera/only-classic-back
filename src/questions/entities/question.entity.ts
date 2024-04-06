import { Article } from 'src/articles/entities/article.entity';
import { User } from 'src/users/entities/user.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    JoinColumn,
    ManyToOne,
} from 'typeorm';

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    question: string;

    @Column('text', { nullable: true })
    answer: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => User, (user) => user.questions, { nullable: false })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    @Column('int', { nullable: false, name: 'user_id' })
    user: User;

    @ManyToOne(() => Article, (article) => article.questions, { nullable: false })
    @JoinColumn({ name: 'article_id', referencedColumnName: 'id' })
    @Column('int', { nullable: false, name: 'article_id' })
    article: Article;
}
