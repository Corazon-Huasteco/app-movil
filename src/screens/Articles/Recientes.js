import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, View } from "react-native";
import { Card, Text, Button, Dialog, Portal } from "react-native-paper";
import { app } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";
import AwesomeAlert from "react-native-awesome-alerts";

const Recientes = ({ navigation }) => {
  const { user } = useAuth();
  // recuperarDatosLocalmente
  const [tematicasfecha, setTematicasfecha] = useState([]);

  const recuperarDatosLocalmente = async () => {
    try {
      const datos = await AsyncStorage.getItem("datosLocal");

      if (datos !== null) {
        const datosParseados = JSON.parse(datos);
        const datosTabla = datosParseados.tematicas;
        const tradiciones = datosTabla.filter(
          (item) => item.tematica === "Tradiciones"
        );
        const fechaActual = new Date();
        // console.log(fechaActual);
        const tradicionesConFechas = tradiciones.map((item) => {
          const fechaTematica = item.fecha;
          const palabrasFecha = fechaTematica.split(" ");
          const dia = parseInt(palabrasFecha[0]);
          const mes = palabrasFecha[2];
          let numMes;
          if (mes === "enero") {
            numMes = 0;
          } else if (mes === "febrero") {
            numMes = 1;
          } else if (mes === "marzo") {
            numMes = 2;
          } else if (mes === "abril") {
            numMes = 3;
          } else if (mes === "mayo") {
            numMes;
          } else if (mes === "junio") {
            numMes = 5;
          } else if (mes === "julio") {
            numMes = 6;
          } else if (mes === "agosto") {
            numMes = 7;
          } else if (mes === "septiembre") {
            numMes = 8;
          } else if (mes === "octubre") {
            numMes = 9;
          } else if (mes === "noviembre") {
            numMes = 10;
          } else if (mes === "diciembre") {
            numMes = 11;
          }
          const fechaTematicaObj = new Date(
            fechaActual.getFullYear(),
            numMes,
            dia
          );
          const diferenciaDias = Math.floor(
            (fechaTematicaObj - fechaActual) / (1000 * 60 * 60 * 24)
          );
          if (diferenciaDias > 0) {
            return { item, diferenciaDias };
          }
        });
        tradicionesConFechas.sort(
          (a, b) => a.diferenciaDias - b.diferenciaDias
        );
        // console.log(tradicionesConFechas)
        setTematicasfecha(tradicionesConFechas);
        console.log("Temáticas sección recientes obtenidas del Storage.");
      } else {
        console.log("Temáticas sección recientes obtenidos de firebase.");
      }
    } catch (error) {
      console.error("Error al recuperar datos locales:", error);
    }
  };

  const [alert, setAlert] = useState({
    showAlert: false,
    alertTitle: "",
    alertMessage: "",
    alertType: "",
  });

  const showAlertSuccess = (message) => {
    setAlert({
      showAlert: true,
      alertTitle: "Éxito",
      alertMessage: message,
      alertType: "success",
    });
  };

  const showAlertError = (message) => {
    setAlert({
      showAlert: true,
      alertTitle: "Error",
      alertMessage: message,
      alertType: "error",
    });
  };

  const [selectedItem, setSelectedItem] = useState(null);
  const guardarArticulos = async (item) => {
    if (user) {
      setSelectedItem(item);
      const docList = await app.firestore().collection("guardados").get();
      const datos = docList.docs
        .filter(
          (doc) =>
            doc.data().email === user.email && doc.data().titulo === item.titulo
        )
        .map((doc) => doc.data());
      if (datos.length === 0) {
        const coleccionRef = app.firestore().collection("guardados");
        await coleccionRef.doc(`${new Date().getTime()}`).set({
          email: user.email,
          fecha: item.fecha,
          imgPortada: item.imgPortada,
          informacion: item.informacion,
          tematica: item.tematica,
          titulo: item.titulo,
        });
        showAlertSuccess(
          `La temática: ${item.titulo} se ha guardado con éxito.`
        );
      } else {
        showAlertError(`La temática: ${item.titulo} ya ha sido guardada.`);
      }
    } else {
      showAlertError("Para poder guardar un artículo debes iniciar sesión");
    }
  };

  useEffect(() => {
    recuperarDatosLocalmente();
  }, []);

  const alertStyles = {
    container: {
      backgroundColor: "#fff",
    },
    titleText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#531949",
    },
    messageText: {
      fontSize: 16,
      color: "#333",
    },
    buttonContainer: {
      marginTop: 10,
    },
    button: {
      backgroundColor: "#531949",
      borderRadius: 5,
      paddingVertical: 10,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
    },
  };

  return (
    <>
      <AwesomeAlert
        show={alert.showAlert}
        showProgress={false}
        title={alert.alertTitle}
        message={alert.alertMessage}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="Aceptar"
        confirmButtonColor="#531949"
        onConfirmPressed={() => {
          setAlert({ showAlert: false });
        }}
        contentContainerStyle={alertStyles.container}
        titleStyle={alertStyles.titleText}
        messageStyle={alertStyles.messageText}
        buttonContainerStyle={alertStyles.buttonContainer}
        confirmButtonStyle={alertStyles.button}
        confirmButtonTextStyle={alertStyles.buttonText}
      />
      {/* ARTÍCULOS */}
      {tematicasfecha.map((producto, index) => (
        <View key={index}>
          {producto && (
            <Card style={{ marginTop: 20 }}>
              <Card.Content>
                <Card.Cover
                  source={{
                    uri: producto.item.imgPortada,
                  }}
                />
                <Text variant="titleLarge" style={styles.text}>
                  {producto.item.titulo}
                </Text>
                <Text variant="bodySmall" style={styles.text}>
                  {producto.item.fecha}
                </Text>
                <Button
                  icon="text-box"
                  mode="contained"
                  style={styles.button}
                  onPress={() =>
                    navigation.navigate("Tematicas", { item: producto.item })
                  }
                >
                  Leer artículo
                </Button>
                <Button
                  icon="arrow-down-circle-outline"
                  mode="contained"
                  style={styles.button}
                  onPress={() => guardarArticulos(producto.item)}
                >
                  Guardar artículo
                </Button>
              </Card.Content>
            </Card>
          )}
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 10,
    textAlign: "center",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#531949",
    borderRadius: 10,
  },
  title: {
    textAlign: "center",
  },
  button2: {
    borderWidth: 0.5,
    borderColor: "#531949",
    borderRadius: 30,
    padding: 5,
    margin: 10,
  },
});

export default Recientes;
