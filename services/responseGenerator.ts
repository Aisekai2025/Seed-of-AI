
import { Character, CharacterId } from '../types';
import { CHARACTER_TEMPLATES } from '../constants';

export type EmotionType = 'sad' | 'anxiety' | 'anger' | 'happy' | 'advice' | 'neutral';

export const classifyEmotion = (input: string): EmotionType => {
  const text = input.toLowerCase();
  if (text.includes("疲") || text.includes("つら") || text.includes("悲") || text.includes("寂")) return "sad";
  if (text.includes("不安") || text.includes("こわ") || text.includes("心配") || text.includes("ドキドキ")) return "anxiety";
  if (text.includes("ムカ") || text.includes("怒") || text.includes("イライラ") || text.includes("許せ")) return "anger";
  if (text.includes("嬉") || text.includes("楽") || text.includes("よかっ") || text.includes("わくわく")) return "happy";
  if (text.includes("どう") || text.includes("？」") || text.includes("教え") || text.includes("助け")) return "advice";
  return "neutral";
};

const pick = (list: string[]) => list[Math.floor(Math.random() * list.length)];

export const applyCharacterTone = (characterId: CharacterId, text: string): string => {
  switch (characterId) {
    case "hikari":
      // Softens punctuation to "ね"
      return text.replace(/。/g, "ね。").replace(/！/g, "ね！");
    case "aoi":
      // Clear and logical
      return text;
    case "minori":
      // Adds pauses for reflection
      return text.replace(/。/g, "。…").replace(/ね/g, "ね…");
    case "sora":
      // Bright and energized
      if (!text.endsWith("！")) return text.replace(/[。]$/, "！");
      return text.replace(/。/g, "！");
    default:
      return text;
  }
};

export const getLocalFallback = (character: Character, input: string): string => {
  const templates = CHARACTER_TEMPLATES[character.id];
  
  const a = pick(templates.accept);
  const b = pick(templates.content);
  const c = pick(templates.ask);
  
  const combined = `${a} ${b} ${c}`;
  return applyCharacterTone(character.id, combined);
};
