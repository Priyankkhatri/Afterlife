import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as DocumentPicker from 'expo-document-picker';
import { useTheme } from '../hooks/useTheme';
import Header from '../components/ui/Header';
import Card from '../components/ui/Card';
import UploadCard from '../components/ui/UploadCard';
import DocumentCard from '../components/ui/DocumentCard';
import SearchBar from '../components/ui/SearchBar';
import Button from '../components/ui/Button';
import { Ionicons } from '@expo/vector-icons';
import { Document } from '../types';
import { RootStackParamList } from '../types/navigation';

const CATEGORIES = [
  { id: 'all', label: 'All', icon: 'apps-outline' },
  { id: 'certificate', label: 'Death Certificate', icon: 'ribbon-outline' },
  { id: 'insurance', label: 'Insurance', icon: 'heart-outline' },
  { id: 'bank', label: 'Bank & Pension', icon: 'cash-outline' },
  { id: 'property', label: 'Property & Investments', icon: 'business-outline' },
  { id: 'bills', label: 'Bills & Utilities', icon: 'receipt-outline' },
];

export default function UploadScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList | any>>();
  const { colors } = useTheme();
  
  const [activeTab, setActiveTab] = useState<'upload' | 'vault'>('upload');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadingFile, setUploadingFile] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [documents, setDocuments] = useState<Document[]>([
    { id: '1', name: 'Certified Death Certificate.pdf', size: '1.2 MB', date: 'Yesterday', status: 'Verified' },
    { id: '2', name: 'MetLife Insurance Policy.pdf', size: '3.4 MB', date: '2 days ago', status: 'Processing' },
    { id: '3', name: 'Final Will & Testament.pdf', size: '4.8 MB', date: '3 days ago', status: 'Verified' },
    { id: '4', name: 'Chase Savings Statement.pdf', size: '1.8 MB', date: '4 days ago', status: 'Verified' },
  ]);

  const handlePickDocument = async (category: string) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      const file = result.assets[0];
      setUploadingFile(file.name);
      setUploadProgress(0);

      // Simulate Upload and scan progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setUploadingFile(null);
              const newDoc: Document = {
                id: Date.now().toString(),
                name: file.name,
                size: file.size ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : '1.5 MB',
                date: 'Just now',
                status: 'Processing'
              };
              setDocuments(prevDocs => [newDoc, ...prevDocs]);
              
              // Automatically navigate to AI Analysis screen
              navigation.navigate('AIAnalysis', { fileUri: file.uri, fileName: file.name });
            }, 500);
            return 100;
          }
          return prev + 10;
        });
      }, 150);

    } catch (err) {
      Alert.alert('Error', 'Unable to pick document.');
    }
  };

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
      if (selectedCategory === 'all') return matchesSearch;
      
      const docNameLower = doc.name.toLowerCase();
      if (selectedCategory === 'certificate') return matchesSearch && docNameLower.includes('death');
      if (selectedCategory === 'insurance') return matchesSearch && docNameLower.includes('insurance');
      if (selectedCategory === 'bank') return matchesSearch && (docNameLower.includes('chase') || docNameLower.includes('statement') || docNameLower.includes('saving'));
      return matchesSearch;
    });
  }, [documents, searchQuery, selectedCategory]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Top sticky title */}
      <View style={styles.headerContainer}>
        <Header title="Documents" subtitle="Secure and encrypted vault" />
        
        {/* Tab switch bar */}
        <View style={[styles.tabBar, { backgroundColor: colors.border + '50' }]}>
          <Pressable 
            onPress={() => setActiveTab('upload')} 
            style={[styles.tabButton, activeTab === 'upload' && { backgroundColor: colors.card }]}
          >
            <Text style={[styles.tabText, { color: activeTab === 'upload' ? colors.primary : colors.secondaryText }]}>
              Upload File
            </Text>
          </Pressable>
          <Pressable 
            onPress={() => setActiveTab('vault')} 
            style={[styles.tabButton, activeTab === 'vault' && { backgroundColor: colors.card }]}
          >
            <Text style={[styles.tabText, { color: activeTab === 'vault' ? colors.primary : colors.secondaryText }]}>
              Vault Explorer
            </Text>
          </Pressable>
        </View>
      </View>

      {activeTab === 'upload' ? (
        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Main Upload Dropcard */}
          <UploadCard 
            onPress={() => handlePickDocument('general')}
            title="Secure Upload Hub"
            subtitle="Upload paperwork to trigger automatic AI scanning and claim benefits extraction."
          />

          {uploadingFile && (
            <Card style={styles.uploadProgressCard}>
              <View style={styles.progressHeader}>
                <Ionicons name="sparkles" size={16} color={colors.primary} className="animate-spin" />
                <Text style={[styles.progressTitle, { color: colors.text }]} numberOfLines={1}>
                  Securing: {uploadingFile}
                </Text>
              </View>
              <View style={[styles.progressBarBg, { backgroundColor: colors.border }]}>
                <View style={[styles.progressBarFill, { width: `${uploadProgress}%`, backgroundColor: colors.primary }]} />
              </View>
              <Text style={[styles.progressPct, { color: colors.secondaryText }]}>{uploadProgress}% completed</Text>
            </Card>
          )}

          {/* Quick Upload Categories Grid */}
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Categories</Text>
          <View style={styles.categoriesGrid}>
            {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
              <Pressable 
                key={cat.id} 
                onPress={() => handlePickDocument(cat.label)}
                style={[styles.categoryCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              >
                <View style={[styles.catIconContainer, { backgroundColor: colors.primary + '10' }]}>
                  <Ionicons name={cat.icon as any} size={20} color={colors.primary} />
                </View>
                <Text style={[styles.catText, { color: colors.text }]} numberOfLines={2}>
                  {cat.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      ) : (
        /* Vault Explorer Section */
        <View style={styles.vaultContainer}>
          <SearchBar 
            value={searchQuery} 
            onChangeText={setSearchQuery} 
            placeholder="Search documents in vault..." 
          />

          {/* Horizontal Categories Scroll */}
          <FlatList
            horizontal
            data={CATEGORIES}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizList}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => setSelectedCategory(item.id)}
                style={[
                  styles.filterPill,
                  { 
                    backgroundColor: selectedCategory === item.id ? colors.primary : colors.card,
                    borderColor: colors.border 
                  }
                ]}
              >
                <Text style={{ 
                  color: selectedCategory === item.id ? '#FFFFFF' : colors.text,
                  fontWeight: '600',
                  fontSize: 12
                }}>
                  {item.label}
                </Text>
              </Pressable>
            )}
          />

          {/* Documents Vault List */}
          <FlatList
            data={filteredDocuments}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.vaultList}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <DocumentCard 
                name={item.name}
                size={item.size}
                date={item.date}
                status={item.status}
                onPress={() => navigation.navigate('AIAnalysis', { fileName: item.name })}
              />
            )}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="search-outline" size={48} color={colors.secondaryText} />
                <Text style={[styles.emptyText, { color: colors.secondaryText }]}>
                  No documents match your query
                </Text>
              </View>
            }
          />
        </View>
      )}
    </View>
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
  tabBar: {
    flexDirection: 'row',
    borderRadius: 14,
    padding: 3,
    marginTop: 8,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 12,
  },
  tabText: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 13,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 110,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: '48%',
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  catIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  catText: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  uploadProgressCard: {
    marginBottom: 20,
    padding: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressTitle: {
    fontFamily: 'Inter',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 8,
    flex: 1,
  },
  progressBarBg: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressBarFill: {
    height: '100%',
  },
  progressPct: {
    fontFamily: 'Inter',
    fontSize: 11,
    textAlign: 'right',
  },
  vaultContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  horizList: {
    paddingBottom: 14,
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 14,
    borderWidth: 1,
  },
  vaultList: {
    paddingBottom: 110,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontFamily: 'Inter',
    fontSize: 14,
    marginTop: 12,
  },
});
