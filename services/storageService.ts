
import { UserProfile, Conversation, Message } from '../types';

const STORAGE_KEYS = {
  PROFILE: 'ai_no_tane_profile',
  CONVERSATIONS: 'ai_no_tane_chats',
};

export const storageService = {
  getProfile: (): UserProfile => {
    const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (data) return JSON.parse(data);
    return { nickname: '旅人', preferredCharacterId: null, totalSeeds: 0, level: 1 };
  },

  saveProfile: (profile: UserProfile) => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  },

  getConversations: (): Conversation[] => {
    const data = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
    return data ? JSON.parse(data) : [];
  },

  saveConversation: (conv: Conversation) => {
    const convs = storageService.getConversations();
    const index = convs.findIndex(c => c.id === conv.id);
    if (index >= 0) {
      convs[index] = conv;
    } else {
      convs.push(conv);
    }
    localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(convs));
  },

  addSeed: () => {
    const profile = storageService.getProfile();
    profile.totalSeeds += 1;
    // Every 5 seeds is a new level (metaphorical growth)
    profile.level = Math.floor(profile.totalSeeds / 5) + 1;
    storageService.saveProfile(profile);
    return profile;
  }
};
