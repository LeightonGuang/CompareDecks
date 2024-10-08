import { CardType } from "./CardType";

export interface ListViewProps {
  pinnedList: CardType[];
  unpinnedList: CardType[];
  handlePinButton: (objIndex: number) => void;
  handleUnpinButton: (objIndex: number) => void;
  handleEditCardButton: (cardIndex: number, isPinned: boolean) => void;
  handleAddCardButton: () => void;
  handleDeleteCardButton: (cardIndex: number, isPinned: boolean) => void;
  isAuth: boolean;
}
