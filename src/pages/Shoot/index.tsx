import React from 'react';
import {View, Text, StyleSheet, Image, TextStyle} from 'react-native';
import {publicStyle} from '../../utils/publicStyle';

const Shoot = () => {
  return (
    <View style={publicStyle.container}>
      <Image source={require('./assets/dy.png')} />
      <Text style={styles.introText}>记录美好生活</Text>
    </View>
  );
};

interface Style {
  introText: TextStyle;
}

const styles = StyleSheet.create<Style>({
  introText: {
    marginTop: 10,
    fontSize: 14,
    color: '#1A1B20',
  },
});

export default Shoot;
