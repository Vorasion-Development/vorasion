import { UserStomachSchema } from './user-stomach.entity-schema'

export class UserStomach extends UserStomachSchema.class {
  public addOpponent(name: string, size: number) {
    this.currentSize += size
    this.opponentsInside.push(name)
  }

  public addUser(id: string) {
    this.currentSize += 1
    this.usersInside.push(id)
  }

  public emptyOut() {
    this.currentSize = 0
    this.opponentsInside = []
    this.usersInside = []
  }
}

UserStomachSchema.setClass(UserStomach)
