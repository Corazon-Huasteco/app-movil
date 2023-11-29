// PreguntasFrecuentesScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';


const PreguntasFrecuentesS = ({extraData, navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Preguntas frecuentes: Responde aquí las preguntas más comunes de tus usuarios. {extraData}</Text>
      <Button
        title="volver al inicio"
        onPress={()=> navigation.navigate("Inicio")}  
      />
      <Button
        title="Ir a Preguntas Frecuentes... otra vez"
        onPress={()=> navigation.push("Preguntas Frecuentes")}  
      />
      <Button
        title="Ir al inicio"
        onPress={()=> navigation.navigate("Inicio")}  
      />
      <Button
        title="volver atras"
        onPress={()=> navigation.goBack()}  
      />
      <Button
        title="ir a la primera pantalla en el stack"
        onPress={()=> navigation.popToTop()}  
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PreguntasFrecuentesS;
