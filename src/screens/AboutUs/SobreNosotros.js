// SobreNosotrosScreen.js
import * as React from "react";
import { Text, Card } from "react-native-paper";
import { View, StyleSheet, ScrollView } from "react-native";


const SobreNosotros = () => {
  return (
    <ScrollView >
      <View style={styles.container}>
        <Text variant="displaySmall" style={{ marginBottom: 30 }}>
          Sobre nosotros
        </Text>
        {/* <Example /> */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Misión:</Text>
            <Text style={{ marginBottom: 25 }}>
              Somos una empresa que promueve la cultura a traves de la difusión
              y fomento de la enseña que impulsen la libre expresión cultural,
              estimulando los trabajos de creación, investigación, cientificos,
              literarios y artisticos
            </Text>
            <Card.Cover
              source={{
                uri: "https://corazon-huasteco.com/assets/imgSobreNosotros-704d5a3c.jpg",
              }}
            />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Visión:</Text>
            <Text style={{ marginBottom: 25 }}>
              Ser una empresa importante en el ambito cultural del municipio de
              Huejutla de Reyes Hidalgo para proyectar a nivel nacional e
              internacional la cultura de esta región.
            </Text>
            <Card.Cover
              source={{
                uri: "https://corazon-huasteco.com/assets/imgMural-01-34200bdf.jpg",
              }}
            />
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  card: {
    marginBottom: 30,
  },
});

export default SobreNosotros;
