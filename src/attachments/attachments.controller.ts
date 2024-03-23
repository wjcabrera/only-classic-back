import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseInterceptors,
    UploadedFiles,
    Res,
    StreamableFile,
} from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { CreateAttachmentDto } from './dto/createAttachment.dto';
import { UpdateAttachmentDto } from './dto/updateAttachment.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { join } from 'path';
import type { Response } from 'express';

@Controller('attachments')
export class AttachmentsController {
    constructor(private readonly attachmentsService: AttachmentsService) {}

    @Post()
    @UseInterceptors(FilesInterceptor('files', 10))
    async upload(
        @UploadedFiles() files: Array<Express.Multer.File>,
        @Body() createAttachmentDto: CreateAttachmentDto,
    ) {
        return await this.attachmentsService.upload(files, createAttachmentDto);
    }

    @Get()
    getFile(@Res({ passthrough: true }) res: Response): StreamableFile {
        const file = createReadStream(
            join(process.cwd(), './uploads/2/1.webp'),
        );
        res.set({
            'Content-Type': 'image/webp',
            'Content-Disposition': 'attachment; filename=1.webp',
        });
        return new StreamableFile(file);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.attachmentsService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateAttachmentDto: UpdateAttachmentDto,
    ) {
        return this.attachmentsService.update(+id, updateAttachmentDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.attachmentsService.remove(+id);
    }
}
