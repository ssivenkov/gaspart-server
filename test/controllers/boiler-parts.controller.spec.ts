import {INestApplication} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";
import {SequelizeConfigService} from "src/config/sequelizeConfig.service";
import {databaseConfig} from "src/config/configuration";
import {User} from "src/users/users.model";
import * as bcrypt from 'bcrypt';
import * as request from 'supertest';
import * as session from "express-session";
import * as passport from "passport";
import {BoilerPartsModule} from "src/boiler-parts/boiler-parts.module";
import {AuthModule} from "src/auth/auth.module";

const mockedUser = {
  username: 'John',
  email: 'john@gmail.com',
  password: 'john123',
};

describe('Boiler Parts Controller', () => {
  let app: INestApplication;

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
        BoilerPartsModule,
      ]
    }).compile();

    app = testModule.createNestApplication();
    app.use(session({
      secret: 'keyword',
      resave: false,
      saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
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
    await User.destroy({ where: { username: mockedUser.username } });
  });

  it('should get one boiler part', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const response = await request(app.getHttpServer())
      .get('/boiler-parts/find/1')
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: 1,
        price: expect.any(Number),
        boiler_manufacturer: expect.any(String),
        parts_manufacturer: expect.any(String),
        vendor_code: expect.any(String),
        name: expect.any(String),
        description: expect.any(String),
        images: expect.any(String),
        in_stock: expect.any(Number),
        bestseller: expect.any(Boolean),
        new: expect.any(Boolean),
        popularity: expect.any(Number),
        compatibility: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    );
  });

  it('should get bestsellers', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const response = await request(app.getHttpServer())
      .get('/boiler-parts/bestsellers')
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body.rows).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(Number),
          price: expect.any(Number),
          boiler_manufacturer: expect.any(String),
          parts_manufacturer: expect.any(String),
          vendor_code: expect.any(String),
          name: expect.any(String),
          description: expect.any(String),
          images: expect.any(String),
          in_stock: expect.any(Number),
          bestseller: true,
          new: expect.any(Boolean),
          popularity: expect.any(Number),
          compatibility: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      ]),
    );
  });

  it('should get new parts', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const response = await request(app.getHttpServer())
      .get('/boiler-parts/new')
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body.rows).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(Number),
          price: expect.any(Number),
          boiler_manufacturer: expect.any(String),
          parts_manufacturer: expect.any(String),
          vendor_code: expect.any(String),
          name: expect.any(String),
          description: expect.any(String),
          images: expect.any(String),
          in_stock: expect.any(Number),
          bestseller: expect.any(Boolean),
          new: true,
          popularity: expect.any(Number),
          compatibility: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      ]),
    );
  });

  it('should search by string', async () => {
    const searchBody = { search: 'nos' };
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const response = await request(app.getHttpServer())
      .post('/boiler-parts/search')
      .send(searchBody)
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body.rows.length).toBeLessThanOrEqual(20);

    response.body.rows.forEach((element) => {
      expect(element.name.toLowerCase()).toContain(searchBody.search);
    });

    expect(response.body.rows).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(Number),
          price: expect.any(Number),
          boiler_manufacturer: expect.any(String),
          parts_manufacturer: expect.any(String),
          vendor_code: expect.any(String),
          name: expect.any(String),
          description: expect.any(String),
          images: expect.any(String),
          in_stock: expect.any(Number),
          bestseller: expect.any(Boolean),
          new: expect.any(Boolean),
          popularity: expect.any(Number),
          compatibility: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      ]),
    );
  });

  it('should search by name', async () => {
    const name = 'Rerum vel.';
    const searchBody = { name };
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const response = await request(app.getHttpServer())
      .post('/boiler-parts/name')
      .send(searchBody)
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body).toEqual(
      expect.objectContaining(
        {
          id: expect.any(Number),
          price: expect.any(Number),
          boiler_manufacturer: expect.any(String),
          parts_manufacturer: expect.any(String),
          vendor_code: expect.any(String),
          name,
          description: expect.any(String),
          images: expect.any(String),
          in_stock: expect.any(Number),
          bestseller: expect.any(Boolean),
          new: expect.any(Boolean),
          popularity: expect.any(Number),
          compatibility: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      ),
    );
  });
});
