import api from './authApi';

type LetterType =
  | 'Insurance Letter'
  | 'Bank Letter'
  | 'Property Transfer Letter'
  | 'Pension Letter'
  | 'Subscription Cancellation'
  | 'Death Notification'
  | 'Professional Email';

type LetterResponse = {
  subject: string;
  body: string;
};

const BASE_URL = api.defaults.baseURL || 'http://127.0.0.1:8000';

export async function generateLetter(topic: string): Promise<LetterResponse> {
  const response = await api.post('/generate-letter', { topic });
  return response.data;
}

export function getPdfUrl(topic: string) {
  return `${BASE_URL}/generate-letter/pdf?topic=${encodeURIComponent(topic)}`;
}

export const LETTER_TEMPLATES: { label: LetterType; value: string }[] = [
  { label: 'Insurance Letter', value: 'insurance letter' },
  { label: 'Bank Letter', value: 'bank letter' },
  { label: 'Property Transfer Letter', value: 'property transfer letter' },
  { label: 'Pension Letter', value: 'pension letter' },
  { label: 'Subscription Cancellation', value: 'subscription cancellation letter' },
  { label: 'Death Notification', value: 'death notification letter' },
  { label: 'Professional Email', value: 'professional email' },
];
