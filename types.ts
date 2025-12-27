
export type CharacterId = 'hikari' | 'aoi' | 'minori' | 'sora';

export interface Character {
  id: CharacterId;
  name: string;
  title: string;
  description: string;
  persona: string;
  color: string;
  icon: string;
  pattern: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface UserProfile {
  nickname: string;
  preferredCharacterId: CharacterId | null;
  totalSeeds: number;
  level: number;
}

export interface Conversation {
  id: string;
  characterId: CharacterId;
  messages: Message[];
  startTime: number;
}
