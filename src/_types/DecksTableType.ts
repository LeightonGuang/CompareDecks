import { CardTableType } from "./CardsTableType";

export interface DecksTableType {
  id: number;
  user_uid: string;
  uuid: string;
  name: string;
  created_at: string;
  edited_at: string;
  cards: CardTableType[];
}
