import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet, View } from 'react-native';

export default function ActivityFilter() {
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filters = ['Todos', 'Gramática', 'Vocabulario', 'Lectura', 'Escucha'];

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filters.map((filter) => {
          const isActive = activeFilter === filter;
          
          return (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterChip,
                isActive ? styles.activeChip : styles.inactiveChip
              ]}
              onPress={() => setActiveFilter(filter)}
              activeOpacity={0.7}
            >
              <Text 
                style={[
                  styles.filterText,
                  isActive ? styles.activeText : styles.inactiveText
                ]}
              >
                {filter}
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
  },
  activeChip: {
    backgroundColor: '#1E3A8A', 
    borderColor: '#1E3A8A',
  },
  activeText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  inactiveChip: {
    backgroundColor: 'transparent',
    borderColor: '#D1D5DB', 
  },
  inactiveText: {
    color: '#6B7280', 
    fontWeight: '500',
  },
});