import { CardTableType } from "./CardsTableType";
import { DeckAttributesTableType } from "./DeckAttributesTableType";

// type for decks

export interface DecksTableType {
  id: number;
  name: string;
  user_uid: string;
  uuid: string;
  deck_attributes: DeckAttributesTableType[];
  cards: CardTableType[];
  created_at: string;
  edited_at: string;
}
