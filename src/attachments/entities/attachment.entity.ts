import { Article } from 'src/articles/entities/article.entity';
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
export class Attachment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 50 })
    ext: string;

    @ManyToOne(() => Article, (article) => article.attachments, {nullable: false,})
    @JoinColumn({ name: 'article_id', referencedColumnName: 'id' })
    @Column('int', { nullable: false, name: 'article_id' })
    article: Article;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
