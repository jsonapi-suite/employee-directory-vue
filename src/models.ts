import {
  JSORMBase,
  Model,
  Attr,
  HasMany,
  BelongsTo
} from "jsorm"

@Model()
export class ApplicationRecord extends JSORMBase {
  static baseUrl = "/"
  static apiNamespace = "api/v1"
}

@Model()
export class Employee extends ApplicationRecord {
  static jsonapiType = "employees"

  @Attr() firstName: string
  @Attr() lastName: string
  @Attr() age: number

  @HasMany() positions: Position[]
}

@Model()
export class Position extends ApplicationRecord {
  static jsonapiType = "positions"

  @Attr() title: string
  @Attr() historicalIndex: number

  @BelongsTo() department: Department
}

@Model()
export class Department extends ApplicationRecord {
  static jsonapiType = "departments"

  @Attr() name: string
}