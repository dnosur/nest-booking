import * as bcrypt from 'bcrypt';
import * as config from 'config';

export function hash(
  str: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _salt_rounds: number = config.default.bcrypt.saltRounds,
) {
  const salt = bcrypt.genSaltSync(_salt_rounds);
  const hash = bcrypt.hashSync(str, salt);

  return hash;
}
