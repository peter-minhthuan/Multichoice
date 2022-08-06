import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
import { OrmModule } from '../orm/orm.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    OrmModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
