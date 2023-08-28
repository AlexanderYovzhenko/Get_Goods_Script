import { Table, Model, Column, DataType } from 'sequelize-typescript';

export interface ProxyCreationAttr {
  ip: string;
  port: string;
  login: string;
  password: string;
}

@Table({
  tableName: 'proxy',
  timestamps: false,
})
export class Proxy extends Model<Proxy, ProxyCreationAttr> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  ip!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  port!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  login!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;
}
