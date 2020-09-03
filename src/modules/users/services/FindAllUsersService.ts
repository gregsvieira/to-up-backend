import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import User from '@modules/users/infra/typeorm/entities/User';

@injectable()
class FindAllUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<User[] | undefined> {
    const user = await this.usersRepository.findAll();

    return user;
  }
}

export default FindAllUsersService;