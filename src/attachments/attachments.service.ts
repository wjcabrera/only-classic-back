import { Injectable } from '@nestjs/common';
import { CreateAttachmentDto } from './dto/createAttachment.dto';
import { UpdateAttachmentDto } from './dto/updateAttachment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Attachment } from './entities/attachment.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { ArticlesService } from 'src/articles/articles.service';

@Injectable()
export class AttachmentsService {
    constructor(
        @InjectRepository(Attachment)
        private readonly attachmentsRepository: Repository<Attachment>,
        private readonly articlesService: ArticlesService,
    ) {}

    async upload(
        files: Array<Express.Multer.File>,
        createAttachmentDto: CreateAttachmentDto,
    ) {
        const uploadDir = `./uploads/${createAttachmentDto.article_id}`;

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const article = await this.articlesService.findOne(
            createAttachmentDto.article_id,
        );

        files.forEach(async (file) => {
            const attachment = await this.attachmentsRepository.save({
                article,
                ext: files[0].originalname.split('.').pop(),
            });

            const filePath = path.join(
                uploadDir,
                `${attachment.id}.${attachment.ext}`,
            );
            fs.writeFileSync(filePath, file.buffer);
        });

        return 'File uploaded successfully';
    }

    findAll(createAttachmentDto: CreateAttachmentDto) {}

    findOne(id: number) {
        return `This action returns a #${id} attachment`;
    }

    update(id: number, updateAttachmentDto: UpdateAttachmentDto) {
        return `This action updates a #${id} attachment`;
    }

    remove(id: number) {
        return `This action removes a #${id} attachment`;
    }
}
