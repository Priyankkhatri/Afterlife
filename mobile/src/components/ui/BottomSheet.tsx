import React, { useEffect, useRef } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  StyleSheet, 
  Animated, 
  Pressable, 
  Dimensions, 
  PanResponder 
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function BottomSheet({ isOpen, onClose, title, children }: Props) {
  const { colors } = useTheme();
  const animatedHeight = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    if (isOpen) {
      Animated.spring(animatedHeight, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedHeight, {
        toValue: SCREEN_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpen]);

  const handleClose = () => {
    Animated.timing(animatedHeight, {
      toValue: SCREEN_HEIGHT,
      duration: 220,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  // Drag down gesture to close
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          animatedHeight.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 120 || gestureState.vy > 0.5) {
          handleClose();
        } else {
          Animated.spring(animatedHeight, {
            toValue: 0,
            tension: 50,
            friction: 8,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <Modal
      transparent
      visible={isOpen}
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        {/* Backdrop clickable trigger */}
        <Pressable style={styles.backdrop} onPress={handleClose} />

        {/* Sheet Content Panel */}
        <Animated.View
          style={[
            styles.sheet,
            { 
              backgroundColor: colors.card,
              borderColor: colors.border,
              transform: [{ translateY: animatedHeight }] 
            }
          ]}
        >
          {/* Drag Handle Bar */}
          <View {...panResponder.panHandlers} style={styles.dragBarContainer}>
            <View style={[styles.dragHandle, { backgroundColor: colors.border }]} />
          </View>

          {/* Header row */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
            <Pressable onPress={handleClose} hitSlop={8} style={styles.closeButton}>
              <Ionicons name="close" size={20} color={colors.secondaryText} />
            </Pressable>
          </View>

          {/* Inner Content Area */}
          <View style={styles.content}>
            {children}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  sheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    maxHeight: '85%',
    paddingBottom: 34, // Safe Area padding
  },
  dragBarContainer: {
    width: '100%',
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dragHandle: {
    width: 36,
    height: 5,
    borderRadius: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    fontWeight: '700',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    paddingHorizontal: 20,
  },
});
