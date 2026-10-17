import React from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { colors, radii } from '../../theme';

export default function ActivityFilter({ activeFilter = 'Todos', onChange }) {
  const filters = [
    { value: 'Todos', label: 'Todos los niveles' },
    { value: 'A1', label: 'A1 · Inicial' },
    { value: 'A2', label: 'A2 · Elemental' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filters.map((filter) => {
          const isActive = activeFilter === filter.value;
          
          return (
            <TouchableOpacity
              key={filter.value}
              style={[
                styles.filterChip,
                isActive ? styles.activeChip : styles.inactiveChip
              ]}
              onPress={() => onChange?.(filter.value)}
              activeOpacity={0.7}
              accessibilityRole="radio"
              accessibilityLabel={`Filtrar por nivel: ${filter.label}`}
              accessibilityState={{ selected: isActive }}
            >
              <Text 
                style={[
                  styles.filterText,
                  isActive ? styles.activeText : styles.inactiveText
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20, 
  },
  scrollContent: {
    paddingRight: 20, 
  },
  filterChip: {
    minHeight: 44,
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: 'center',
    borderRadius: radii.pill,
    marginRight: 12,
    borderWidth: 1,
  },
  activeChip: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  activeText: {
    color: colors.black,
    fontWeight: '600',
  },
  inactiveChip: {
    backgroundColor: 'transparent',
    borderColor: colors.border,
  },
  inactiveText: {
    color: colors.muted,
    fontWeight: '500',
  },
});