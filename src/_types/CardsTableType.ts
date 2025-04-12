export interface CardTableType {
  id?: number; // Unique ID for the card row
  deck_uuid?: string; // Foreign key to Decks(uuid)
  name: string; // Name of the product
  card_order: number; // Order of the card in the deck
  imgUrl?: string; // URL of the image
}
