import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import {
  Text,
  Button,
  Card,
  Divider,
  Portal,
  Avatar,
  Dialog,
  IconButton,
  TouchableRipple,
  TextInput,
} from "react-native-paper";
import { useAuth } from "../../context/AuthContext";
import { app } from "../../config/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebaseDB";
import AwesomeAlert from "react-native-awesome-alerts";

const Usuario = ({ navigation, user }) => {
  const { logout } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate("InicioHome");
    } catch (error) {
      console.log(error.message);
    }
  };

  const [datos, setDatos] = useState([]);

  const obtenerName = async () => {
    const coleccionRef = app.firestore().collection("usuarios");
    coleccionRef.where("email", "==", user.email).onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      setDatos(data);
    });
  };

  const [datosPedidos, setDatosPedidos] = useState([]);

  const obtenerPedidos = async () => {
    const coleccionRef = app.firestore().collection("ventas");
    coleccionRef.where("usuario", "==", user.uid).onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      setDatosPedidos(data);
    });
  };

  useEffect(() => {
    obtenerName();
    obtenerPedidos();
  }, []);

  const [visiblePedidos, setVisiblePedidos] = useState(false);
  const cerrarPedidos = () => setVisiblePedidos(false);
  const abrirPedidos = () => setVisiblePedidos(true);

  const [visibleEditar, setVisibleEditar] = useState(false);
  const cerrarEditar = () => setVisibleEditar(false);
  const abrirEditar = () => {
    if (datos.length > 0) {
      setNombre(datos[0].name);
      setApellido(datos[0].lastName);
    }
    setVisibleEditar(true);
  };

  const [nombre, setNombre] = useState(datos.length > 0 ? datos[0].name : "");
  const [apellido, setApellido] = useState(
    datos.length > 0 ? datos[0].lastName : ""
  );

  const handleSubmit = async () => {
    const referencia = doc(db, `usuarios/${user.uid}`);
    const referencia2 = doc(db, `usuarios_correo/${user.email}`);
    try {
      await updateDoc(referencia, {
        name: nombre,
        lastName: apellido,
      });
      await updateDoc(referencia2, {
        name: nombre,
        lastName: apellido,
      });
      showAlertSuccess("Datos actualizados");
      cerrarEditar();
    } catch (error) {
      console.log("Error al actualizar los datos", error);
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

  const alertStyles = {
    container: {
      backgroundColor: "#fff",
    },
    titleText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#531949",
      textAlign: "center",
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
      {user && (
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
          {/* DAR CLICK EN EDITAR */}
          <Portal>
            <Dialog visible={visibleEditar} onDismiss={cerrarEditar}>
              <ScrollView>
                <Dialog.Title style={{ textAlign: "center" }}>
                  Editar perfil
                </Dialog.Title>
                <Dialog.Content>
                  <TextInput
                    label="Nombre"
                    value={nombre}
                    mode="outlined"
                    onChangeText={(text) => {
                      setNombre(text);
                    }}
                    style={styles.textInput}
                  />
                  <TextInput
                    label="Apellido"
                    value={apellido}
                    mode="outlined"
                    onChangeText={(text) => {
                      setApellido(text);
                    }}
                    style={styles.textInput}
                  />
                </Dialog.Content>
                {/* <Button icon="account" mode="contained" style={styles.button} contentStyle={{ flexDirection: "row-reverse" }}>
                  Guardar
                </Button> */}
                <Dialog.Actions>
                  <Button onPress={cerrarEditar}>Cerrar</Button>
                  <Button
                    onPress={() => {
                      handleSubmit();
                    }}
                  >
                    Guardar
                  </Button>
                </Dialog.Actions>
              </ScrollView>
            </Dialog>
          </Portal>
          {/* DAR CLICK EN HISTORIAL DE PEDIDOS */}
          <Portal>
            <Dialog visible={visiblePedidos} onDismiss={cerrarPedidos}>
              <ScrollView>
                <Dialog.Title style={{ textAlign: "center" }}>
                  Historial de pedidos
                </Dialog.Title>
                <Dialog.Content>
                  {datosPedidos.length > 0 ? (
                    datosPedidos.map((pedido, index) => (
                      <Card.Content
                        key={index}
                        style={{
                          borderWidth: 0.5,
                          borderColor: "#531949",
                          borderRadius: 10,
                          marginTop: 10,
                          // backgroundColor: "white"
                        }}
                      >
                        <Card.Title
                          title={
                            <Text style={{ fontWeight: "bold" }}>
                              {pedido.nombreProducto}
                            </Text>
                          }
                          subtitle={
                            <Text>Cantidad: {pedido.cantidadProducto}</Text>
                          }
                          left={(props) => (
                            <Avatar.Image
                              size={44}
                              source={{
                                uri: pedido.url,
                              }}
                            />
                          )}
                        />
                      </Card.Content>
                    ))
                  ) : (
                    <Text style={{ textAlign: "center" }}>
                      No hay pedidos en tu historial.
                    </Text>
                  )}
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={cerrarPedidos}>Cerrar</Button>
                </Dialog.Actions>
              </ScrollView>
            </Dialog>
          </Portal>

          <Card.Cover
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/PROFILE%2Ffinally.jpg?alt=media&token=70888ed0-ffda-441c-8ba6-b0f46263e60e&_gl=1*3106xz*_ga*NjQ4NjA4NzUxLjE6OTU0NjExOTc.*_ga_CW55HF8NVT*MTY5Nzg4MTkwMS4yMy4xLjE2OTc4ODMwOTQuNDYuMC4w",
            }}
            style={styles.img}
          />

          <View style={styles.container}>
            <Card.Content style={styles.cardContent}>
              <Button icon="account" style={styles.button}>
                Consultador
              </Button>
              <Text variant="titleLarge">Hola, Bienvenido</Text>
              <Text variant="titleMedium">
                {datos.length > 0
                  ? datos[0].name + " " + datos[0].lastName
                  : "Nombre no disponible"}
              </Text>
            </Card.Content>
            <Button
              icon="pencil"
              contentStyle={{ flexDirection: "row-reverse" }}
              mode="contained"
              style={styles.buttonEdit}
              onPress={abrirEditar}
            >
              Editar perfil
            </Button>

            <Divider style={styles.divider} />

            <View style={styles.rowContainer}>
              <TouchableRipple
                style={styles.column}
                onPress={() => navigation.navigate("GuardadosHome")}
              >
                <View style={styles.centerContent}>
                  <IconButton icon="book-multiple-outline" size={25} />
                  <Text variant="titleMedium">Guardados</Text>
                  <Text variant="bodySmall">
                    Consulta y elimina tus artículos favoritos
                  </Text>
                </View>
              </TouchableRipple>

              <TouchableRipple style={styles.column} onPress={abrirPedidos}>
                <View style={styles.centerContent}>
                  <IconButton icon="cart-check" size={25} />
                  <Text variant="titleMedium">Historial de pedidos</Text>
                  <Text variant="bodySmall" style={{ marginBottom: 15 }}>
                    Encuentra tus pedidos anteriores y en curso
                  </Text>
                </View>
              </TouchableRipple>
            </View>

            <Button
              icon="login"
              style={styles.buttonClose}
              contentStyle={{ flexDirection: "row-reverse" }}
              onPress={handleLogout}
            >
              Cerrar Sesión
            </Button>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    marginTop: 10,
  },
  container: {
    margin: 20,
    // marginTop: 20,
    // marginLeft: 20,
    // marginRight: 20,
  },
  img: {
    borderRadius: 0,
    height: 135,
  },
  cardContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    height: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
    paddingHorizontal: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#E7E2E8",
    // margin: 5,
    // borderRadius: 15
  },
  centerContent: {
    alignItems: "left",
  },
  buttonClose: {
    borderWidth: 0.5,
    borderColor: "#531949",
    marginTop: 30,
    borderRadius: 0,
  },
  button: {
    borderWidth: 0.5,
    borderColor: "#531949",
    margin: 10,
  },
  buttonEdit: {
    borderWidth: 0.5,
    borderColor: "#531949",
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 0,
  },
});

export default Usuario;
