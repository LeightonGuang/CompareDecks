import { CardType } from "./CardType";

export interface DeckType {
  id: number;
  user_uid: string;
  uuid: string;
  name: string;
  created_at: string;
  edited_at: string;
  cards: CardType[];
}
