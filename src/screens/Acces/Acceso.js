import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useAuth } from "../../context/AuthContext";
const Acceso = ({ navigation }) => {
  const [gmail, setGmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { loginWithGoogle, login } = useAuth();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async () => {
    try {
      const result = await login(gmail, pass);
      if (result) {
        navigation.navigate("Perfil");
      }
    } catch (error) {
      console.log("Error al iniciar sesión", error);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      const result = await loginWithGoogle();
      if (result) {
        navigation.navigate("Perfil");
      }
    } catch (error) {
      console.log("Error al iniciar sesión con Google:", error);
    }
  };
  return (
    <View style={styles.container}>
      <Text variant="displayMedium">Entra a tu cuenta</Text>
      <View style={styles.registrationContainer}>
        <Text variant="titleMedium">¿No estás registrado? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Registro")}>
          <Text variant="titleMedium" style={styles.registerLink}>
            Regístrate aquí
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lineaCompleta}></View>

      <TextInput
        label="Correo"
        value={gmail}
        mode="outlined"
        onChangeText={(text) => setGmail(text)}
        style={styles.textInput}
      />
      <TextInput
        label="Contraseña"
        value={pass}
        mode="outlined"
        onChangeText={(text) => setPass(text)}
        secureTextEntry={!showPassword}
        style={styles.textInput}
        right={
          <TextInput.Icon
            icon={showPassword ? "eye-off" : "eye"}
            onPress={toggleShowPassword}
          />
        }
      />
      <TouchableOpacity onPress={() => navigation.navigate("Registro")}>
        <Text variant="titleMedium" style={styles.restaurar}>
          ¿Olvidaste tu contraseña?
        </Text>
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        <Button
          mode="contained"
          style={styles.sendbutton}
          onPress={handleSubmit}
        >
          Enviar
        </Button>

        <View style={styles.separador}>
          <Text style={styles.linea}></Text>
          <Text variant="">O</Text>
          <Text style={styles.linea}></Text>
        </View>
        <Button
          icon="google"
          mode="outlined"
          style={styles.googlebutton}
          onPress={handleGoogleLogin} // Llama a la función handleGoogleLogin cuando se presiona el botón
        >
          Continuar con Google
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
  },
  contentContainer: {
    alignItems: "center",
  },
  textInput: {
    marginTop: 15,
  },
  terminos: {
    alignItems: "center", // Cambia alignContent a alignItems
    paddingLeft: 5,
    flexDirection: "colum",
    marginTop: 10,
  },
  registrationContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 5,
  },
  separador: {
    flexDirection: "row",
    alignItems: "center", // Centra verticalmente los elementos
    justifyContent: "center", // Centra horizontalmente los elementos
    marginTop: 10,
  },
  linea: {
    flex: 1, // Para que las líneas ocupen todo el espacio disponible
    height: 1, // Altura de la línea
    backgroundColor: "black", // Color de la línea (puedes personalizarlo)
    marginHorizontal: 5, // Espacio horizontal entre las líneas y el texto
  },
  registerLink: {
    textDecorationLine: "underline",
    paddingLeft: 5,
    color: "#0000FF",
  },
  googlebutton: {
    marginTop: 20,
  },
  texto: {
    fontSize: 15,
  },
  restaurar: {
    textDecorationLine: "underline",
    color: "#0000FF",
    marginTop: 10,
  },
  sendbutton: {
    marginTop: 20,
    marginBottom: 10,
  },
  lineaCompleta: {
    borderBottomWidth: 0.6, // Grosor de la línea
    borderBottomColor: "black", // Color de la línea (puedes personalizarlo)
    marginVertical: 10, // Espacio vertical entre la línea y otros elementos
  },
});

export default Acceso;
