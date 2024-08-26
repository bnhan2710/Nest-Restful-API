import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import request from 'supertest'; 
const PORT = 5002;

describe('App E2E test', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const appModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = appModule.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    app.listen(PORT);
    prismaService = app.get(PrismaService);
    await prismaService.cleanDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  it.todo('should be defined, hihi');
});

describe('Test authentication', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Test register', () => {
    it('should return user', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'test@gmail.com',
          password: 'password123',
        });
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('email', 'test@gmail.com');
    });
  });

  describe('Test login', () => {
    it('should return access token', async () => {
      // First, register the user
      await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'test@gmail.com',
          password: 'password123',
        });

      // Then, login with the registered user
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'test@gmail.com',
          password: 'password123',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('accessToken');
    });
  });
});