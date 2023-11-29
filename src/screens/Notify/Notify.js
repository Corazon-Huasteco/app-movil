import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import { Text, Divider, Button } from 'react-native-paper';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

class Notify extends Component {
  handleActivarClick = () => {
    const objeto = {
      nombre: 'John Doe',
      edad: 30,
      ciudad: 'Ejemploville',
    };
    console.log(objeto);
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text variant="displaySmall" style={{ marginBottom: 0, fontWeight: 700 }}>
            Notificaciones
          </Text>
          <Divider />
          <View style={styles.imageContainer}>
            <Image
              source={require('../../../assets/img/notify/bell.png')}
              style={styles.image}
            />
          </View>
          <Divider />
          <Text variant="displaySmall" style={{ marginBottom: 0, fontWeight: 700 }}>
            Mantente al día
          </Text>
          <Text variant="displaySmall" style={{ marginBottom: 0, fontSize: 20, lineHeight: 24 }}>
            Activa las notificaciones para recibir actualizaciones sobre Corazon Huasteco
          </Text>
          <Divider />
          <View style={styles.buttonContainer}>
            <Button
              mode="outlined"
              onPress={() => console.log('Más tarde')}
              style={styles.button}
            >
              Más tarde
            </Button>
            <Button
              mode="contained"
              onPress={this.handleActivarClick}
              style={styles.button}
            >
              Activar
            </Button>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 20,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    margin: 5,
    borderRadius: 5,
  },
});

export default Notify;
