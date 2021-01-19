import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAmqpProvider from '@shared/container/providers/AmqpProvider/models/IAmqpProvider';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  name: string;
  surname: string;
  sexo: number;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('AmqpProvider')
    private amqpProvider: IAmqpProvider,
  ) { }

  public async execute({
    name,
    surname,
    sexo,
    email,
    password,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);
    console.log(hashedPassword)
    const user = await this.usersRepository.create({
      name,
      surname,
      sexo,
      email,
      password: hashedPassword,
    });

    // await this.amqpProvider.publishInQueue(
    //   'payly.conciliation-settlement.transaction.create',
    //   JSON.stringify(user),
    // );

    await this.cacheProvider.invalidatePrefix('providers-list');

    return user;
  }
}

export default CreateUserService;
