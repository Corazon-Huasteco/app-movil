import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card } from "react-native-paper";

const Sesion = ({ navigation }) => {
  return (
    <View style={styles.view}>
      <Card.Cover
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Home%2Fsierra.png?alt=media&token=e5b5a095-b302-453c-9a2d-aa3f66001c9d&_gl=1*1l3aine*_ga*NjQ4NjA4NzUxLjE2OTU0NjExOTc.*_ga_CW55HF8NVT*MTY5Nzg3NjM2OS4yMi4xLjE6MTY5Nzg3Njg0NjEuNDcuMC4w",
        }}
        style={styles.img}
      />
      <Card.Content>
        <Button
          icon="login"
          onPress={() => navigation.navigate("Acceso")}
          style={styles.button}
        >
          Inicia Sesión
        </Button>
        <Button
          mode="contained"
          icon=""
          onPress={() => navigation.navigate("Registro")}
          style={styles.button}
        >
          Regístrate
        </Button>
      </Card.Content>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    margin: 20,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#E7E2E8",
    borderRadius: 15,
  },
  button: {
    borderWidth: 0.5,
    borderColor: "#531949",
    borderRadius: 30,
    padding: 5,
    margin: 10,
  },
});

export default Sesion;
