import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, View } from "react-native";
import {
  Card,
  Avatar,
  Dialog,
  Portal,
  Text,
  Button,
  Checkbox,
  Searchbar,
} from "react-native-paper";
import { app } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";
import AwesomeAlert from "react-native-awesome-alerts";

const Todos = ({ navigation }) => {
  const { user } = useAuth();
  // Ventana emergente menu tematicas
  const [visible, setVisible] = useState(false);
  const close = () => setVisible(false);
  const open = () => setVisible(true);
  // Selección de Temáticas
  const [vestimenta, setVestimenta] = useState(false);
  const [danza, setDanza] = useState(false);
  const [gastronomia, setGastronomia] = useState(false);
  const [musica, setMusica] = useState(false);
  const [tradicciones, setTradicciones] = useState(false);
  const [temas, setTemas] = useState([]);
  // Buscador
  const [tematicas, setTematicas] = useState([]);
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

    setTematicas(resultadoBusqueda);
  };

  const selectTematicas = () => {
    let resultadoBusqueda = tablaProyectos;
    if (vestimenta || danza || gastronomia || musica || tradicciones ){
      resultadoBusqueda = resultadoBusqueda.filter(info => {
        if (vestimenta && info.tematica === 'Vestimenta') return true;
        if (danza && info.tematica === 'Danza') return true;
        if (gastronomia && info.tematica === 'Gastronomia') return true;
        if (musica && info.tematica === 'Musica') return true;
        if (tradicciones && info.tematica === 'Tradiciones') return true;
        return false;
      });
    }
    setTematicas(resultadoBusqueda);
    close();
  };

  const clearFilters = () => {
    setVestimenta(false);
    setDanza(false);
    setGastronomia(false);
    setMusica(false);
    setTradicciones(false);
    showAlertSuccess("Se han limpiado los filtros");
  }

  // RecuperarDatosLocalmente
  const recuperarDatosLocalmente = async () => {
    try {
      const datos = await AsyncStorage.getItem("datosLocal");
      if (datos !== null) {
        const datosParseados = JSON.parse(datos);
        const datosTabla = datosParseados.tematicas;
        setTematicas(datosTabla);
        setTablaProyectos(datosTabla);
        console.log("Temáticas sección todos obtenidas del Storage.");
      } else {
        const tematicasSnapshot = await app
          .firestore()
          .collection("producto")
          .get();
        const tematicasData = tematicasSnapshot.docs.map((doc) => doc.data());
        setTematicas(tematicasData);
        setTablaProyectos(tematicasData);
        console.log("Temáticas sección todos obtenidas de firebase.");
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
        if (item.fecha === undefined) {
          const coleccionRef = app.firestore().collection("guardados");
          await coleccionRef.doc(`${new Date().getTime()}`).set({
            email: user.email,
            fecha: "",
            imgPortada: item.imgPortada,
            informacion: item.informacion,
            tematica: item.tematica,
            titulo: item.titulo,
          });
        } else {
          const coleccionRef = app.firestore().collection("guardados");
          await coleccionRef.doc(`${new Date().getTime()}`).set({
            email: user.email,
            fecha: item.fecha,
            imgPortada: item.imgPortada,
            informacion: item.informacion,
            tematica: item.tematica,
            titulo: item.titulo,
          });
        }
        // alert(`La temática: ${item.titulo} se ha guardado con éxito.`);
        showAlertSuccess(
          `La temática: ${item.titulo} se ha guardado con éxito.`
        );
      } else {
        // alert(`La temática: ${item.titulo} ya ha sido guardada.`);
        showAlertError(`La temática: ${item.titulo} ya ha sido guardada.`);
      }
    } else {
      // alert("Para poder guardar un artículo debes iniciar sesión");
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
    <View>
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
      <Card>
        <View style={styles.searchBarContainer}>
          <Searchbar
            placeholder="Buscar..."
            onChangeText={onChangeSearch}
            value={busqueda}
            style={styles.searchbar}
          />
        </View>

        <Button
          icon="checkbox-marked-circle-outline"
          onPress={open}
          style={styles.buttonFilter}
        >
          Filtros
        </Button>
      </Card>

      {/* MENU  */}
      <Portal>
        <Dialog visible={visible} onDismiss={open}>
          <Dialog.Title style={styles.title}>
            Seleccione la temática
          </Dialog.Title>
          <Dialog.Content>
            <Card.Title
              title="Vestimenta"
              titleStyle={{ color: "#531949" }}
              left={(props) => (
                <Avatar.Icon {...props} size={44} icon="hanger" />
              )}
              right={(props) => (
                <Checkbox
                  status={vestimenta ? "checked" : "unchecked"}
                  onPress={() => {
                    setVestimenta(!vestimenta);
                  }}
                />
              )}
            />
            <Card.Title
              title="Danza"
              left={(props) => (
                <Avatar.Icon {...props} size={44} icon="human-female-dance" />
              )}
              right={(props) => (
                <Checkbox
                  status={danza ? "checked" : "unchecked"}
                  onPress={() => {
                    setDanza(!danza);
                  }}
                />
              )}
            />
            <Card.Title
              title="Gastronomía"
              left={(props) => (
                <Avatar.Icon
                  {...props}
                  size={44}
                  icon="silverware-fork-knife"
                />
              )}
              right={(props) => (
                <Checkbox
                  status={gastronomia ? "checked" : "unchecked"}
                  onPress={() => {
                    setGastronomia(!gastronomia);
                  }}
                />
              )}
            />
            <Card.Title
              title="Música"
              left={(props) => (
                <Avatar.Icon {...props} size={44} icon="music-note-eighth" />
              )}
              right={(props) => (
                <Checkbox
                  status={musica ? "checked" : "unchecked"}
                  onPress={() => {
                    setMusica(!musica);
                  }}
                />
              )}
            />
            <Card.Title
              title="Tradiciones"
              left={(props) => <Avatar.Icon {...props} size={44} icon="flag" />}
              right={(props) => (
                <Checkbox
                  status={tradicciones ? "checked" : "unchecked"}
                  onPress={() => {
                    setTradicciones(!tradicciones);
                  }}
                />
              )}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={close}>Cancelar</Button>
            <Button onPress={clearFilters}>Limpiar</Button>
            <Button onPress={selectTematicas}>Filtrar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">
            Temáticas seleccionadas: {temas.join(", ")}
          </Text>
        </Card.Content>
      </Card> */}

      {/* TEMÁTICAS */}
      {tematicas.map((producto, index) => (
        <Card key={index} style={styles.card}>
          <Card.Content>
            <Card.Cover
              source={{
                uri: producto.imgPortada,
              }}
            />
            <Text variant="titleLarge" style={styles.text}>
              {producto.titulo}
            </Text>
            <Text variant="titleSmall" style={styles.text}>
              {producto.tematica}
            </Text>
            <Button
              icon="text-box"
              mode="contained"
              style={styles.button}
              onPress={() =>
                navigation.navigate("Tematicas", { item: producto })
              }
            >
              Leer artículo
            </Button>
            <Button
              icon="arrow-down-circle-outline"
              mode="contained"
              style={styles.button}
              onPress={() => guardarArticulos(producto)}
            >
              Guardar artículo
            </Button>
          </Card.Content>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 10,
    textAlign: "center",
  },
  title: {
    textAlign: "center",
    marginTop: 10,
  },
  card: {
    marginTop: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#531949",
    borderRadius: 10,
  },
  buttonFilter: {
    borderWidth: 0.5,
    borderColor: "#531949",
    borderRadius: 30,
    padding: 5,
    margin: 10,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
  },
  searchbar: {
    flex: 1,
  },
});

export default Todos;
