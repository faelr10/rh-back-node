import { Injectable } from '@nestjs/common';
import { CompareParams, IHash } from './structure';
import * as bcrypt from 'bcrypt';

@Injectable()
export class Hash implements IHash {
  async newPasswordHash(password: string): Promise<string> {
    const passwordHash = bcrypt.hash(password, 10);
    return passwordHash;
  }

  async comparePassword(data: CompareParams): Promise<boolean> {
    return bcrypt.compare(data.verifyPassword, data.currentPassword);
  }
}
