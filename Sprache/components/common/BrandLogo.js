import React from 'react';
import { Image, StyleSheet } from 'react-native';

const logoSizes = {
  tab: 40,
  header: 48,
  screen: 136,
  splash: 208,
};

export default function BrandLogo({ variant = 'header', size, style, accessibilityLabel = 'Logo de Sprache' }) {
  const dimension = size ?? logoSizes[variant] ?? logoSizes.header;

  return (
    <Image
      source={require('../../assets/sprache-logo.png')}
      style={[styles.logo, { width: dimension, height: dimension }, style]}
      resizeMode="contain"
      accessible
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel}
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    borderRadius: 8,
  },
});
