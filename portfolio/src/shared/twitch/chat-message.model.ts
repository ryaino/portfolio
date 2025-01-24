export interface ChatMessage {
  chatterName: string;
  message: {
    text: string;
    fragments: {
      type: string;
      text: string;
      emote: null | {
        id: string;
        emote_set_id: string;
        owner_id: string;
        format: string[];
      };
    }[];
  };
  color: string;
}
