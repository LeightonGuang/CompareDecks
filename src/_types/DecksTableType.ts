export interface DecksTableType {
  id?: number; // Unique ID for the deck row
  uuid?: string; // Public identifier for the deck
  name?: string; // Name of the deck
  user_uid?: string; // Foreign key to Users(uid)
  created_at?: Date; // Creation date
  edited_at?: Date; // Last edit date
}
