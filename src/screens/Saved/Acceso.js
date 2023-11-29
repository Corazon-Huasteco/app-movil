import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, Card } from "react-native-paper";

const Acceso = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ textAlign: "center" }}>
        Para poder visualizar tus articulos guardardos, es necesario que inicies
        sesión.
      </Text>
      <Card.Content>
        <Button
          icon="login"
          onPress={() => navigation.navigate("Acceso")}
          style={styles.button2}
        >
          Iniciar sesión
        </Button>
      </Card.Content>
    </View>
  );
};

const styles = StyleSheet.create({
  button2: {
    borderWidth: 0.5,
    borderColor: "#531949",
    borderRadius: 30,
    padding: 5,
    margin: 10,
  },
});

export default Acceso;
