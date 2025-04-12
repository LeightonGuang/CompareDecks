export interface AttributeTableType {
  id?: number; // Unique ID for the attribute row
  deck_uuid?: string; // Foreign key to Decks(uuid)
  name: string; // Name of the attribute
  sort_order: number; // Order of the attribute in the deck
}
