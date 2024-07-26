import { CardType } from "./CardType";

export interface DeckType {
  id: number;
  user_id: number;
  uuid: string;
  name: string;
  created_at: string;
  edited_at: string;
  cards: CardType[];
}
