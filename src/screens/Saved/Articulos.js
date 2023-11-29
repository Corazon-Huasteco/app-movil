import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Button, Text, Card, Searchbar } from "react-native-paper";
import { app } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";
import AwesomeAlert from "react-native-awesome-alerts";

const Articulos = ({ navigation }) => {
  const { user } = useAuth();
  // Buscador
  const [articulos, setArticulos] = useState([]);
  const [tablaProyectos, setTablaProyectos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const onChangeSearch = (query) => {
    setBusqueda(query);
    filtrar(query);
  };

  const filtrar = (terminoBusqueda) => {
    var resultadoBusqueda = tablaProyectos.filter((elemento) => {
      // Verificar si el término de búsqueda está presente en la propiedad "titulo"
      if (
        elemento.titulo.toLowerCase().includes(terminoBusqueda.toLowerCase())
      ) {
        return true;
      }
      return false;
    });
    setArticulos(resultadoBusqueda);
  };

  // const obtenerInfo = async () => {
  //   const docList = await app.firestore().collection("guardados").get();
  //   const datos = docList.docs
  //     .filter((doc) => doc.data().email === user.email)
  //     .map((doc) => doc.data());

  //   setArticulos(datos);
  //   setTablaProyectos(datos);
  // };

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

  const eliminarArticulos = async (item) => {
    try {
      const docList = await app.firestore().collection("guardados").get();
      const documentos = docList.docs.filter(
        (doc) =>
          doc.data().email === user.email && doc.data().titulo === item.titulo
      );

      if (documentos.length > 0) {
        const docRef = app
          .firestore()
          .collection("guardados")
          .doc(documentos[0].id);
        await docRef.delete();
        showAlertSuccess(
          `El artículo "${item.titulo}" se eliminó exitosamente.`
        );
      } else {
        showAlertError(
          `No se encontró el artículo "${item.titulo}" para eliminar.`
        );
      }
    } catch (error) {
      console.error("Error al eliminar el artículo:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = app
      .firestore()
      .collection("guardados")
      .where("email", "==", user.email)
      .onSnapshot((querySnapshot) => {
        const nuevosArticulos = querySnapshot.docs.map((doc) => doc.data());
        setArticulos(nuevosArticulos);
        setTablaProyectos(nuevosArticulos);
      });
    return () => {
      unsubscribe();
    };
  }, [user.email]);

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
      <ScrollView>
        <View style={styles.container}>
          <Card>
            <Card.Content>
              <Searchbar
                placeholder="Buscar..."
                onChangeText={onChangeSearch}
                value={busqueda}
              />
            </Card.Content>
          </Card>
          {articulos.length === 0 && (
            <Card style={{marginTop: 20}}>
            <View
              style={{
              //   flex: 1,
                padding: 10,
              //   justifyContent: "center",
              //   alignItems: "center",
              }}
            >
              <Text style={{ textAlign: "center", margin: 10, }}>
                No tienes ningún artículo guardado.
              </Text>
              <Card.Content>
                <Button
                  icon="book-open-outline"
                  onPress={() => navigation.navigate("RecientesHome")}
                  style={styles.button2}
                >
                  Ver artículos
                </Button>
              </Card.Content>
            </View>
              </Card>
          )}

          {articulos.map((articulo, index) => (
            <Card style={styles.card} key={index}>
              <Card.Content>
                <Card.Cover
                  source={{
                    uri: articulo.imgPortada,
                  }}
                />
                <Text variant="titleLarge" style={styles.text}>
                  {articulo.titulo}
                </Text>
                <Text variant="bodySmall" style={styles.text}>
                  {articulo.tematica}
                </Text>
                <Button
                  icon="text-box"
                  mode="contained"
                  style={styles.button}
                  onPress={() =>
                    navigation.navigate("ArtGuardados", { item: articulo })
                  }
                >
                  Leer artículo
                </Button>
                <Button
                  icon="delete-forever-outline"
                  onPress={() => eliminarArticulos(articulo)}
                  style={styles.button3}
                >
                  Eliminar de Guardados
                </Button>
              </Card.Content>
            </Card>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#531949",
    borderRadius: 10,
  },
  button2: {
    borderWidth: 0.5,
    borderColor: "#531949",
    borderRadius: 30,
    padding: 5,
    margin: 10,
  },
  button3: {
    borderWidth: 0.5,
    borderColor: "#531949",
    borderRadius: 10,
    marginTop: 10,
  },
  card: {
    marginTop: 15,
  },
  text: {
    textAlign: "center",
  },
});

export default Articulos;
