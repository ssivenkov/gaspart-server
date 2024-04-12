import {ApiProperty} from "@nestjs/swagger";

// for Swagger

export class LoginUserRequest {
  @ApiProperty({example: 'Ivan'})
  username: string;

  @ApiProperty({example: 'ivan123'})
  password: string;
}

export class LoginUserResponse {
  @ApiProperty({
    example:
      {
        user: {
          "userId": 1,
          "username": "Ivan",
          "email": "ivan@gmail.com"
        }
      }
  })
  user: {
    userId: number,
    username: string,
    password: string,
  };

  @ApiProperty({example: 'Logged in'})
  msg: string;
}

export class LogoutUserResponse {
  @ApiProperty({example: 'Session has ended'})
  msg: string;
}

export class LoginCheckResponse {
  @ApiProperty({example: 1})
  userId: number;

  @ApiProperty({example: 'Ivan'})
  username: string;

  @ApiProperty({example: 'ivan123@gmai.com'})
  email: string;
}

export class SignUpResponse {
  @ApiProperty({example: 1})
  id: number;

  @ApiProperty({example: 'Ivan'})
  username: string;

  @ApiProperty({example: 'ivan123@gmai.com'})
  email: string;

  @ApiProperty({example: '$2b$10$NIaqlHfICVEd5wSBWzg9D.ImtZEIigi7vbRkDRfzZouftoBK28P1i'})
  password: string;

  @ApiProperty({example: '2024-04-12T07:20:29.781Z'})
  updatedAt: string;

  @ApiProperty({example: '2024-04-12T07:20:29.781Z'})
  createdAt: string;
}
