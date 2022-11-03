import { CreateTopicDto, PageOptionsDto } from '@monorepo/multichoice/dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from '../auth/guards/auth.guard';
import { SucessResponse } from '../model/SucessResponse';
import { TopicService } from './topic.service';

@ApiTags('topic')
@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}
  @UseGuards(AuthenticationGuard)
  @Post('create')
  @ApiBearerAuth()
  async create(
    @Body() topic: CreateTopicDto,
    @Req() req,
    @Res() res
  ): Promise<SucessResponse> {
    const result = await this.topicService.create(topic, req.user);
    return res.status(201).json(new SucessResponse(201, result));
  }

  @UseGuards(AuthenticationGuard)
  @Get('/all')
  @ApiBearerAuth()
  async getTopicAll(
    @Query() pageDto: PageOptionsDto,
    @Req() req,
    @Res() res
  ): Promise<SucessResponse> {
    const result = await this.topicService.findAllTopics(pageDto, req.user);
    return res.status(200).json(new SucessResponse(200, result));
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Get(':id')
  async getTopicById(
    @Param('id') id: number,
    @Res() res,
    @Req() req
  ): Promise<SucessResponse> {
    const result = await this.topicService.getTopicByID(id, req.user);

    return res.status(200).json(new SucessResponse(200, result));
  }

  @UseGuards(AuthenticationGuard)
  @Delete(':id')
  @ApiBearerAuth()
  async deleteTopicById(@Param('id') id: number, @Res() res, @Req() req) {
    await this.topicService.deleteById(id, req.user);
    return res.status(200).json(new SucessResponse(200, {}));
  }

  @UseGuards(AuthenticationGuard)
  @Patch(':id')
  @ApiBearerAuth()
  async update(
    @Param('id') id: number,
    @Body() topic: CreateTopicDto,
    @Req() req,
    @Res() res
  ): Promise<SucessResponse> {
    const result = await this.topicService.update(id, topic, req.user);
    return res.status(200).json(new SucessResponse(200, result));
  }
}
