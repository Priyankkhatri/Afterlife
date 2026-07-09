import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TextInput, 
  Pressable, 
  KeyboardAvoidingView, 
  Platform,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import Header from '../components/ui/Header';
import Card from '../components/ui/Card';

type Message = {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
};

const SUGGESTIONS = [
  "What claims do I file first?",
  "Explain how probate works",
  "Help draft notification email",
];

export default function AIAssistantScreen() {
  const { colors } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      sender: 'ai', 
      text: "Hello, I am your Afterlife AI Copilot. I'm here to support you in organizing documents, claim identification, and drafting emails. How can I help you today?", 
      time: '12:00 PM' 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [typing, setTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setTyping(true);

    // Simulate AI response timing
    setTimeout(() => {
      let aiText = "I've processed your query. Let's look at the outstanding claims in your roadmap to guide the next steps.";
      const lowerText = textToSend.toLowerCase();
      
      if (lowerText.includes('claim') || lowerText.includes('first')) {
        aiText = "Based on Ramesh's death certificate, you should file the MetLife Term Life Insurance claim first. There is an immediate deadline of 2 days remaining. I can help draft the notification letter right now.";
      } else if (lowerText.includes('probate')) {
        aiText = "Probate is the legal process of proving a will is valid. For Ramesh's estate, you'll need to submit the original will and certified death certificate to the San Francisco Probate Court. Let me know if you want the checklist.";
      } else if (lowerText.includes('draft') || lowerText.includes('email') || lowerText.includes('letter')) {
        aiText = "I can definitely help. Go to the 'AI Writer' tab or tell me the name of the agency and details, and I will draft a legal notice matching their format.";
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setTyping(false);
    }, 1200);
  };

  useEffect(() => {
    // Auto scroll list to bottom
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages, typing]);

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <View style={styles.headerContainer}>
        <Header 
          title="AI Assistant" 
          subtitle="Empathetic copilot supporting your transition chores" 
        />
      </View>

      {/* Suggested pill items row */}
      {messages.length === 1 && (
        <View style={styles.suggestionsContainer}>
          <Text style={[styles.suggestionsLabel, { color: colors.secondaryText }]}>Frequently Asked:</Text>
          <View style={styles.suggestionsList}>
            {SUGGESTIONS.map((s, idx) => (
              <Pressable 
                key={idx} 
                onPress={() => handleSend(s)}
                style={[styles.suggestionPill, { backgroundColor: colors.card, borderColor: colors.border }]}
              >
                <Text style={[styles.suggestionText, { color: colors.primary }]}>{s}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      {/* Conversations Stream */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={[
            styles.bubbleContainer, 
            item.sender === 'user' ? styles.userBubbleContainer : styles.aiBubbleContainer
          ]}>
            {item.sender === 'ai' && (
              <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
                <Ionicons name="sparkles" size={12} color="#FFFFFF" />
              </View>
            )}
            <View style={[
              styles.bubble, 
              item.sender === 'user' 
                ? { backgroundColor: colors.primary } 
                : { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }
            ]}>
              <Text style={[
                styles.messageText, 
                { color: item.sender === 'user' ? '#FFFFFF' : colors.text }
              ]}>
                {item.text}
              </Text>
              <Text style={[
                styles.timeText, 
                { color: item.sender === 'user' ? '#E8F5E9' : colors.secondaryText }
              ]}>
                {item.time}
              </Text>
            </View>
          </View>
        )}
        ListFooterComponent={
          typing ? (
            <View style={styles.typingContainer}>
              <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
                <Ionicons name="sparkles" size={12} color="#FFFFFF" />
              </View>
              <View style={[styles.bubble, { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }]}>
                <ActivityIndicator size="small" color={colors.primary} />
              </View>
            </View>
          ) : null
        }
      />

      {/* Bottom Input row */}
      <View style={[styles.inputRow, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder="Ask anything..."
          placeholderTextColor={colors.secondaryText}
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={() => handleSend(inputText)}
        />
        <Pressable 
          onPress={() => handleSend(inputText)}
          style={[styles.sendBtn, { backgroundColor: colors.primary }]}
          hitSlop={8}
        >
          <Ionicons name="send" size={16} color="#FFFFFF" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 8,
  },
  suggestionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  suggestionsLabel: {
    fontFamily: 'Inter',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 8,
  },
  suggestionsList: {
    gap: 8,
  },
  suggestionPill: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
  },
  suggestionText: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '600',
  },
  list: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  bubbleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 16,
    maxWidth: '85%',
  },
  userBubbleContainer: {
    alignSelf: 'flex-end',
  },
  aiBubbleContainer: {
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginBottom: 4,
  },
  bubble: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  messageText: {
    fontFamily: 'Inter',
    fontSize: 13,
    lineHeight: 18,
  },
  timeText: {
    fontFamily: 'Inter',
    fontSize: 9,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6', // fallback background light
    paddingHorizontal: 16,
    fontFamily: 'Inter',
    fontSize: 13,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
});
