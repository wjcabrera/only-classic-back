import { Article } from 'src/articles/entities/article.entity';
import { Question } from 'src/questions/entities/question.entity';
import { User } from 'src/users/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('boolean', { default: false })
    read: boolean;

    @Column('varchar', { length: 255 })
    message: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => User, (user) => user.notifications, { nullable: false })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    @Column('int', { nullable: false, name: 'user_id' })
    user: User;

    @ManyToOne(() => Article, (article) => article.notifications, {
        nullable: true,
    })
    @JoinColumn({ name: 'article_id', referencedColumnName: 'id' })
    @Column('int', { nullable: true, name: 'article_id' })
    article: Article;

    @ManyToOne(() => Question, (question) => question.notifications, {
        nullable: true,
    })
    @JoinColumn({ name: 'question_id', referencedColumnName: 'id' })
    @Column('int', { nullable: true, name: 'question_id' })
    question: Question;
}
