import { Exclude } from "class-transformer";
import { Role } from "src/common/enums/role.enum";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"users"})
export class User extends BaseEntity{

  @PrimaryGeneratedColumn({type:"bigint"})
  id:number

  @Column({ type: 'varchar', length: 30})
  username: string;

  @Exclude()
  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'int' })
  phone: number;

  @Column({default:false})
  isActive: Boolean;

  @Column({type:'varchar'})
  activationToken:string

  @Column()
  CreatedAt:Date

  @Column()
  role:Role

  
}