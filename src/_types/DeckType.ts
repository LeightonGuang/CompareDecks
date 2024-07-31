import { UUID } from "crypto";
import { CardType } from "./CardType";

export interface DeckType {
  id: number;
  user_uid: any;
  uuid: string;
  name: string;
  created_at: string;
  edited_at: string;
  cards: CardType[];
}
