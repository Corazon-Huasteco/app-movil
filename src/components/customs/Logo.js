import React from 'react'
import logo from '../../../assets/icon.png'
import { Card } from 'react-native-paper'
import { View, Image, StyleSheet } from 'react-native';

export const Logo = () => {
  return (
      
      <Image source={logo} style={styles.logo} />

  )
}

const styles = StyleSheet.create({
  logo: {
    width: 46,
    height: 46,
    resizeMode: 'cover'
  },
});
