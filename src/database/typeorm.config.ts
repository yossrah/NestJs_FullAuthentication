import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm"
import { User } from "src/entities/user.entity";

export default class TypeOrmConfig {
    static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
        const typeOrmConfig: TypeOrmModuleOptions = {
            type: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.POSTGRES_PORT),
            password: configService.get('PASSWORD') ,
            username: configService.get('DB_USERNAME') ,
            database: configService.get('DATABASE'),
            entities: [User],
            synchronize: Boolean(configService.get('TYPEORM_SYNC'))
        }
        return typeOrmConfig;
    }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: async (configservice: ConfigService): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configservice),
    inject: [ConfigService]
}