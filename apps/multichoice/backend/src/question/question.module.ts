import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { TopicService } from '../topic/topic.service';

import { Topic } from './entities/topic.entity';
import { Answer } from '../answer/entities/answer.entity';
import { JsonWebTokenStrategy } from '../auth/strategies/jwt-strategy';
import { UserService } from '../user/user.service';
import { UserExam } from '../user/entities/userExam.entity';
import { UserAnswer } from '../user/entities/userAnswer.entity';
import { RedisModule } from '../redis/redis.module';
import { User } from '../user/entities/user.entity';
import { firebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Question,
      Topic,
      Answer,
      UserExam,
      UserAnswer,
      User,
    ]),
    RedisModule,
    firebaseModule,
  ],
  controllers: [QuestionController],
  providers: [QuestionService, TopicService, JsonWebTokenStrategy, UserService],
})
export class QuestionModule {}
