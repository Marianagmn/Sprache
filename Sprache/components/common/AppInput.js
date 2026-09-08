import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function AppInput(props) {
	return <TextInput style={styles.input} {...props} />;
}

const styles = StyleSheet.create({
	input: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 16, fontSize: 16, marginBottom: 16 }
});
