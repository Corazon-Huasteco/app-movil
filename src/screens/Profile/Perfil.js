import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useAuth } from "../../context/AuthContext";
import Sesion from "./Sesion";
import Usuario from "./Usuario";

const Perfil = ({ navigation }) => {
  const { user } = useAuth();

  return (
    <ScrollView>
      <View style={styles.container}>
        {user ? (
          <Usuario navigation={navigation} user={user} />
        ) : (
          <Sesion navigation={navigation} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    // padding: 20,
  },
});

export default Perfil;
