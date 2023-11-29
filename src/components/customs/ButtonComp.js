import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';

const ButtonComp = ({
  text = 'Comprar',
  onPress = () => {},
  disabled = false,
  btnStyle = {},
  isLoading = false,
  requiredFields = [],
}) => {
  // Verificar si hay campos requeridos no proporcionados
  const isFieldsIncomplete = requiredFields.some(field => !field);

  // Definir el color del texto con opacidad reducida cuando está deshabilitado
  const textColor = disabled || isFieldsIncomplete ? '#53194980' : '#531949';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.container,
        ...btnStyle,
      }}
      disabled={disabled || isFieldsIncomplete}
    >
      {isLoading ? (
        <ActivityIndicator size={'small'} />
      ) : (
        <Text style={{ ...styles.textStyle, color: textColor }}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 42,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default ButtonComp;
