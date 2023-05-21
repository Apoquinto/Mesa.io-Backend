import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { SectionsService } from './sections.service';
import { CreateSectionDTO } from './dto/create-section.dto';
import { UpdateSectionDTO } from './dto/update-section.dto';
import { Section } from './section.entity';

@Controller('sections')
export class SectionsController {
  constructor(private sectionsService: SectionsService) {}

  @Get('')
  getSections(): Promise<Section[]> {
    return this.sectionsService.getSections();
  }

  @Post('')
  createSection(@Body() newSection: CreateSectionDTO): Promise<Section> {
    return this.sectionsService.createSection(newSection);
  }

  @Put(':id')
  updateSection(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedSection: UpdateSectionDTO,
  ): Promise<Section | HttpException> {
    return this.sectionsService.updateSection(id, updatedSection);
  }

  @Delete(':id')
  deleteSection(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Section | HttpException> {
    return this.sectionsService.deleteSection(id);
  }
}
