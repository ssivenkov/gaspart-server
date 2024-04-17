import {INestApplication} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";
import {SequelizeConfigService} from "src/config/sequelizeConfig.service";
import {databaseConfig} from "src/config/configuration";
import {User} from "src/users/users.model";
import * as bcrypt from 'bcrypt';
import {AuthModule} from "src/auth/auth.module";
import {AuthService} from "src/auth/auth.service";

const mockedUser = {
  username: 'John',
  email: 'john@gmail.com',
  password: 'john123',
};

describe('Auth Service', () => {
  let app: INestApplication;
  let authService: AuthService;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRootAsync({
          imports: [ConfigModule],
          useClass: SequelizeConfigService,
        }),
        ConfigModule.forRoot({
          load: [databaseConfig],
        }),
        AuthModule,
      ]
    }).compile();

    authService = testModule.get<AuthService>(AuthService);
    app = testModule.createNestApplication();
    await app.init();
  });

  // create test user in database
  beforeEach(async () => {
    const user = new User();

    const hashedPassword = await bcrypt.hash(mockedUser.password, 10);

    user.username = mockedUser.username;
    user.password = hashedPassword;
    user.email = mockedUser.email;

    return user.save();
  });

  // remove test user from database
  afterEach(async () => {
    await User.destroy({ where: { username: mockedUser.username } })
  });

  it('should login user', async () => {
    const user = await authService.validateUser(
      mockedUser.username,
      mockedUser.password
    );

    expect(user.username).toBe(mockedUser.username);
    expect(user.email).toBe(mockedUser.email);
  });
});
