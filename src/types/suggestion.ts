export type SuggestionChannel = 'idea' | 'feedback';

export type SuggestionRow = {
  id: string;
  created_at: string;
  channel: SuggestionChannel;
  message: string;
  status: 'new' | 'seen';
  edited_at: string | null;
  ip_hash?: string | null;
};