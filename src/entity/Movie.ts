import { Entity, Column, PrimaryColumn} from 'typeorm';

@Entity()
export class Movies {

  @PrimaryColumn()
  imdbID: string;

  @Column()
  Year:	string;

  @Column()
  Title:	string;
  
  @Column()
  Type:	string;
  
  @Column()
  Poster: string;
}