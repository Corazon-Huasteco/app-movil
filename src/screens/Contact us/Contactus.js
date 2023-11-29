import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Text } from 'react-native-paper';

const ContactScreen = () => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Contacto</Title>
          <Paragraph>
            <Text style={styles.label}>Nombre del Titular:</Text> Eduardo Azuara Redondo.
          </Paragraph>
          <Paragraph>
            <Text style={styles.label}>Domicilio:</Text> Anahuac s/n, Colonia Palma, Huejutla de Reyes, Huejutla de Reyes, CP. 43000, Hidalgo, México
          </Paragraph>
          <Paragraph>
            <Text style={styles.label}>Correo Electrónico:</Text> 20200725@uthh.edu.mx
          </Paragraph>
          <Paragraph>
            <Text style={styles.label}>Teléfono:</Text> 7717292053
          </Paragraph>
          <Paragraph>
            <Text style={styles.label}>Otro Contacto:</Text> 7711189815
          </Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    elevation: 4,
    marginVertical: 8,
  },
  label: {
    fontWeight: 'bold',
  },
});

export default ContactScreen;
