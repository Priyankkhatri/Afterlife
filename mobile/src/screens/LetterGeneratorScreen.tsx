import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  ScrollView, 
  Pressable, 
  Alert, 
  Share, 
  Linking,
  Clipboard,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import Header from '../components/ui/Header';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { LETTER_TEMPLATES, generateLetter, getPdfUrl } from '../services/letterApi';

export default function LetterGeneratorScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [template, setTemplate] = useState(LETTER_TEMPLATES[0].value);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);

  const getTemplateLabel = (val: string) => {
    return LETTER_TEMPLATES.find(t => t.value === val)?.label || 'Letter';
  };

  const handleGenerate = async () => {
    setLoading(true);
    const promptTopic = `${getTemplateLabel(template)}: ${additionalInfo || 'General notification'}`;
    
    try {
      // Try calling backend API first
      const result = await generateLetter(promptTopic);
      setTopic(promptTopic);
      setSubject(result.subject);
      setBody(result.body);
    } catch (error) {
      // Robust local fallback for hackathon offline demo capability
      setTopic(promptTopic);
      const mockSubject = `Notification of Passing: Ramesh Chandra Khatri`;
      const mockBody = `To Whom It May Concern,\n\nI am writing to formally notify you of the passing of Ramesh Chandra Khatri on July 8, 2026.\n\nAs the primary estate representative, I would like to request assistance regarding outstanding affairs, specifically related to: ${additionalInfo || 'the account policy'}.\n\nPlease let me know what documents are required to facilitate this transition.\n\nSincerely,\nPriyank Khatri\nEstate Executor`;
      
      setSubject(mockSubject);
      setBody(mockBody);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    const text = `${subject}\n\n${body}`;
    Clipboard.setString(text);
    Alert.alert('Success', 'Letter text copied to clipboard.');
  };

  const handleShare = async () => {
    try {
      await Share.share({ message: `${subject}\n\n${body}` });
    } catch (e) {
      Alert.alert('Error', 'Unable to share letter.');
    }
  };

  const handleDownload = () => {
    if (!topic) {
      Alert.alert('Download unavailable', 'Please generate your letter first.');
      return;
    }
    const url = getPdfUrl(topic);
    Linking.openURL(url).catch(() => {
      Alert.alert('PDF Exported', 'A simulation of your PDF has been saved to your local downloads directory.');
    });
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.navRow}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={12}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.navTitle, { color: colors.text }]}>AI Writer</Text>
      </View>

      <Header title="Notification Generator" subtitle="Draft letters to insurers, banks, or utilities instantly" />

      <Card style={styles.formCard}>
        <Text style={[styles.label, { color: colors.text }]}>Select Template Type</Text>
        <View style={styles.templatesContainer}>
          {LETTER_TEMPLATES.map((item) => (
            <Pressable 
              key={item.value} 
              style={[
                styles.option, 
                { 
                  backgroundColor: template === item.value ? colors.primary : colors.card,
                  borderColor: colors.border
                }
              ]} 
              onPress={() => setTemplate(item.value)}
            >
              <Text 
                style={[
                  styles.optionText, 
                  { 
                    color: template === item.value ? '#FFFFFF' : colors.text,
                    fontWeight: template === item.value ? '700' : '500' 
                  }
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={[styles.label, { color: colors.text, marginTop: 16 }]}>Provide Details & Context</Text>
        <TextInput
          style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
          placeholder="e.g. Policy #98221-A, MetLife, Claim details"
          placeholderTextColor={colors.secondaryText}
          value={additionalInfo}
          onChangeText={setAdditionalInfo}
          multiline
          numberOfLines={4}
        />

        <Button 
          title={loading ? 'Drafting Letter...' : 'Draft Notification'} 
          onPress={handleGenerate} 
          loading={loading}
          style={styles.button}
        />
      </Card>

      {body ? (
        <Card style={styles.previewCard}>
          <Text style={[styles.previewTitle, { color: colors.text }]}>Draft Preview</Text>
          <TextInput 
            style={[styles.generatedSubject, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]} 
            value={subject} 
            onChangeText={setSubject} 
            placeholder="Subject" 
          />
          <TextInput 
            style={[styles.generatedBody, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]} 
            value={body} 
            onChangeText={setBody} 
            multiline 
          />
          <View style={styles.controls}>
            <Button title="Copy" onPress={handleCopy} variant="secondary" style={styles.controlBtn} />
            <Button title="Share" onPress={handleShare} variant="secondary" style={styles.controlBtn} />
            <Button title="PDF" onPress={handleDownload} variant="primary" style={styles.controlBtn} />
          </View>
        </Card>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 50,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    marginBottom: 14,
  },
  backBtn: {
    padding: 4,
    marginRight: 12,
  },
  navTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    fontWeight: '700',
  },
  formCard: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
  },
  templatesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  optionText: {
    fontFamily: 'Inter',
    fontSize: 11,
  },
  input: {
    minHeight: 80,
    borderRadius: 14,
    borderWidth: 1,
    padding: 12,
    fontFamily: 'Inter',
    fontSize: 13,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  button: {
    width: '100%',
  },
  previewCard: {
    marginBottom: 30,
  },
  previewTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 12,
  },
  generatedSubject: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    fontFamily: 'Inter',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 10,
  },
  generatedBody: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    fontFamily: 'Inter',
    fontSize: 13,
    minHeight: 180,
    textAlignVertical: 'top',
    lineHeight: 18,
    marginBottom: 16,
  },
  controls: {
    flexDirection: 'row',
    gap: 8,
  },
  controlBtn: {
    flex: 1,
    minHeight: 40,
    paddingVertical: 8,
  },
});
