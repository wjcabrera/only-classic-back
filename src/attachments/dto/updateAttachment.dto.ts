import { PartialType } from '@nestjs/mapped-types';
import { CreateAttachmentDto } from './createAttachment.dto';

export class UpdateAttachmentDto extends PartialType(CreateAttachmentDto) {}
