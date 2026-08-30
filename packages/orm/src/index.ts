import { MikroORM } from '@mikro-orm/core'

import mikroOrmConfig from './mikro-orm.config'

export class VorasionORM {
  private orm: MikroORM

  private constructor(orm: MikroORM) {
    this.orm = orm
  }

  public static async init(clientUrl: string): Promise<VorasionORM> {
    const instance = await MikroORM.init({
      ...mikroOrmConfig,
      clientUrl,
    })
    return new VorasionORM(instance)
  }
}
