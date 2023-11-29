import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, View, ScrollView } from "react-native";
import {
  Button,
  Text,
  Card,
  Searchbar,
  Portal,
  Dialog,
  List,
  Checkbox,
} from "react-native-paper";
import { app } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../config/firebaseDB";
import { Alert } from "react-native";
import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import AwesomeAlert from "react-native-awesome-alerts";

const Tienda = ({ navigation }) => {
  const { user } = useAuth();

  const [alert, setAlert] = useState({
    showAlert: false,
    alertTitle: "",
    alertMessage: "",
    alertType: "",
  });

  const showAlertSuccess = (title, message) => {
    setAlert({
      showAlert: true,
      alertTitle: title,
      alertMessage: message,
      alertType: "success",
    });
  };

  const showAlertError = (title, message) => {
    setAlert({
      showAlert: true,
      alertTitle: title,
      alertMessage: message,
      alertType: "error",
    });
  };

  //Añadir
  const registrarProducto = async (idProduct) => {
    console.log("Button clicked with product ID:", idProduct);

    // Verificar si user está definido y tiene la propiedad uid
    if (user && user.uid) {
      // Obtener la referencia del documento del carrito del usuario
      const referencia = doc(db, `carritoUsuario/${user.uid}`);

      // Obtener los datos del carrito del usuario
      const docSnap = await getDoc(referencia);
      const data = docSnap.exists() ? docSnap.data() : null;

      // Si el carrito no existe, crearlo con el producto y cantidad 1
      if (!data) {
        await setDoc(referencia, { [idProduct]: 1, total: 1 });
      } else {
        // Si el producto ya existe en el carrito, aumentar la cantidad
        if (data.hasOwnProperty(idProduct)) {
          if (data[idProduct] >= 5) {
            showAlertError(
              "A ocurrido un error",
              `No se puede agregar 5 veces el mismo producto`
            );
            return;
          }
          await updateDoc(referencia, {
            [idProduct]: data[idProduct] + 1,
            total: data.total ? data.total + 1 : 1,
          });
        } else {
          // Si el producto no existe en el carrito, agregarlo con cantidad 1
          await updateDoc(referencia, {
            [idProduct]: 1,
            total: data.total ? data.total + 1 : 1,
          });
        }
      }
      const referencia2 = doc(db, `producto/${idProduct}`);
      const docSnap2 = await getDoc(referencia2);
      const data2 = docSnap2.exists() ? docSnap2.data() : null;
      // Mostrar una alerta
      showAlertSuccess(
        "Producto añadido al carrito",
        `El producto ${data2.nombre} se ha añadido correctamente al carrito.`
      );
    } else {
      console.error("El usuario no está autenticado o no tiene un UID.");
    }
  };

  // Buscador
  const [productos, setProductos] = useState([]);
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
        elemento.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())
      ) {
        return true;
      }
      return false;
    });

    setProductos(resultadoBusqueda);
  };

  // Ventana emergente filtros
  const [visibleFiltros, setVisibleFiltros] = useState(false);
  const closefiltros = () => setVisibleFiltros(false);
  const openfiltros = () => setVisibleFiltros(true);
  // Categoria
  const [portavela, setPortavela] = useState(false);
  const [plato, setPlato] = useState(false);
  const [tequilero, setTequilero] = useState(false);
  const [tortillero, setTortillero] = useState(false);
  const [taza, setTaza] = useState(false);
  const [canasta, setCanasta] = useState(false);
  const [casuela, setCasuela] = useState(false);
  const [copalero, setCopalero] = useState(false);
  const [jarron, setJarron] = useState(false);
  const [florero, setFlorero] = useState(false);
  const [olla, setOlla] = useState(false);

  // Color
  const [rojo, setRojo] = useState(false);
  const [blanco, setBlanco] = useState(false);
  const [azul, setAzul] = useState(false);
  const [rosa, setRosa] = useState(false);
  const [morado, setMorado] = useState(false);
  const [beige, setBeige] = useState(false);
  const [cafe, setCafe] = useState(false);
  const [gris, setGris] = useState(false);
  const [verde, setVerde] = useState(false);
  const [negro, setNegro] = useState(false);

  const recuperarDatosLocalmente = async () => {
    try {
      const datos = await AsyncStorage.getItem("datosLocal");
      if (datos !== null) {
        const datosParseados = JSON.parse(datos);
        const datosTabla = datosParseados.producto;
        // console.log(datosTabla)
        setProductos(datosTabla);
        setTablaProyectos(datosTabla);
        console.log("Productos obtenidos del Storage.");
      } else {
        const productoSnapshot = await app
          .firestore()
          .collection("producto")
          .get();
        const productoData = productoSnapshot.docs.map((doc) => doc.data());
        setProductos(productoData);
        setTablaProyectos(productoData);
        console.log("Productos obtenidos de firebase.");
      }
    } catch (error) {
      console.error("Error al recuperar datos locales:", error);
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

  const handleSearch = () => {
    let resultadoBusqueda = tablaProyectos;
  
    // Filtrar por categoría
    if (portavela || plato || tequilero || tortillero || taza || canasta || casuela || copalero || jarron || florero || olla) {
      resultadoBusqueda = resultadoBusqueda.filter(producto => {
        if (portavela && producto.categoria === 'Portavela') return true;
        if (plato && producto.categoria === 'Plato') return true;
        if (tequilero && producto.categoria === 'Tequilero') return true;
        if (tortillero && producto.categoria === 'Tortillero') return true;
        if (taza && producto.categoria === 'Taza') return true;
        if (canasta && producto.categoria === 'Canasta') return true;
        if (casuela && producto.categoria === 'Casuela') return true;
        if (copalero && producto.categoria === 'Copalero') return true;
        if (jarron && producto.categoria === 'Jarron') return true;
        if (florero && producto.categoria === 'Florero') return true;
        if (olla && producto.categoria === 'Olla') return true;
        return false;
      });
    }
  
    // Filtrar por color
    if (rojo || blanco || azul || rosa || morado || beige || cafe || gris || verde || negro) {
      resultadoBusqueda = resultadoBusqueda.filter(producto => {
        if (rojo && producto.color === 'rojo') return true;
        if (blanco && producto.color === 'blanco') return true;
        if (azul && producto.color === 'azul') return true;
        if (rosa && producto.color === 'rosa') return true;
        if (morado && producto.color === 'morado') return true;
        if (beige && producto.color === 'beige') return true;
        if (cafe && producto.color === 'cafe') return true;
        if (gris && producto.color === 'gris') return true;
        if (verde && producto.color === 'verde') return true;
        if (negro && producto.color === 'negro') return true;
        return false;
      });
    }
  
    setProductos(resultadoBusqueda);
    closefiltros();
  };

  const clearFilters = () => {
    setPortavela(false);
    setPlato(false);
    setTequilero(false);
    setTortillero(false);
    setTaza(false);
    setCanasta(false);
    setCasuela(false);
    setCopalero(false);
    setJarron(false);
    setFlorero(false);
    setOlla(false);
  
    setRojo(false);
    setBlanco(false);
    setAzul(false);
    setRosa(false);
    setMorado(false);
    setBeige(false);
    setCafe(false);
    setGris(false);
    setVerde(false);
    setNegro(false);
    showAlertSuccess("Se han limpiado los filtros");
  }

  return (
    <ScrollView>
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
      <View style={styles.container}>
        {/* BUSCAR Y CARRITO */}
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
            onPress={openfiltros}
            style={styles.buttonFilter}
          >
            Filtros
          </Button>
        </Card>

        {/* DAR CLICK EN FILTROS */}
        <Portal>
          <Dialog visible={visibleFiltros} onDismiss={closefiltros}>
            <ScrollView>
              <Dialog.Title style={styles.title}>Filtros</Dialog.Title>
              <Dialog.Content>
                <List.Section>
                  {/* CATEGORIAS */}
                  <View style={styles.folder}>
                    <List.Accordion
                      title="Categoria"
                      left={(props) => (
                        <List.Icon {...props} icon="format-list-bulleted" />
                      )}
                    >
                      <List.Item
                        title="Portavela"
                        right={(props) => (
                          <Checkbox
                            status={portavela ? "checked" : "unchecked"}
                            onPress={() => {
                              setPortavela(!portavela);
                            }}
                            // value="Portavela"
                          />
                        )}
                      />
                      <List.Item
                        title="Plato"
                        right={(props) => (
                          <Checkbox
                            status={plato ? "checked" : "unchecked"}
                            onPress={() => {
                              setPlato(!plato);
                            }}
                            // value="Plato"
                          />
                        )}
                      />
                      <List.Item
                        title="Tequilero"
                        right={(props) => (
                          <Checkbox
                            status={tequilero ? "checked" : "unchecked"}
                            onPress={() => {
                              setTequilero(!tequilero);
                            }}
                            // value="Tequilero"
                          />
                        )}
                      />
                      <List.Item
                        title="Tortillero"
                        right={(props) => (
                          <Checkbox
                            status={tortillero ? "checked" : "unchecked"}
                            onPress={() => {
                              setTortillero(!tortillero);
                            }}
                            // value="Tortillero"
                          />
                        )}
                      />
                      <List.Item
                        title="Taza"
                        right={(props) => (
                          <Checkbox
                            status={taza ? "checked" : "unchecked"}
                            onPress={() => {
                              setTaza(!taza);
                            }}
                            // value="Taza"
                          />
                        )}
                      />
                      <List.Item
                        title="Canasta"
                        right={(props) => (
                          <Checkbox
                            status={canasta ? "checked" : "unchecked"}
                            onPress={() => {
                              setCanasta(!canasta);
                            }}
                            // value="Canasta"
                          />
                        )}
                      />
                      <List.Item
                        title="Casuela"
                        right={(props) => (
                          <Checkbox
                            status={casuela ? "checked" : "unchecked"}
                            onPress={() => {
                              setCasuela(!casuela);
                            }}
                            // value="Casuela"
                          />
                        )}
                      />
                      <List.Item
                        title="Copalero"
                        right={(props) => (
                          <Checkbox
                            status={copalero ? "checked" : "unchecked"}
                            onPress={() => {
                              setCopalero(!copalero);
                            }}
                            // value="Copalero"
                          />
                        )}
                      />
                      <List.Item
                        title="Jarrón"
                        right={(props) => (
                          <Checkbox
                            status={jarron ? "checked" : "unchecked"}
                            onPress={() => {
                              setJarron(!jarron);
                            }}
                            // value="Jarrón"
                          />
                        )}
                      />
                      <List.Item
                        title="Florero"
                        right={(props) => (
                          <Checkbox
                            status={florero ? "checked" : "unchecked"}
                            onPress={() => {
                              setFlorero(!florero);
                            }}
                            // value="Florero"
                          />
                        )}
                      />
                      <List.Item
                        title="Olla"
                        right={(props) => (
                          <Checkbox
                            status={olla ? "checked" : "unchecked"}
                            onPress={() => {
                              setOlla(!olla);
                            }}
                            // value="Olla"
                          />
                        )}
                      />
                    </List.Accordion>
                  </View>
                  {/* COLORES */}
                  <View style={styles.folder}>
                    <List.Accordion
                      title="Color"
                      left={(props) => (
                        <List.Icon {...props} icon="border-color" />
                      )}
                    >
                      <List.Item
                        title="Rojo"
                        right={(props) => (
                          <Checkbox
                            status={rojo ? "checked" : "unchecked"}
                            onPress={() => {
                              setRojo(!rojo);
                            }}
                            // value="rojo"
                          />
                        )}
                      />
                      <List.Item
                        title="Blanco"
                        right={(props) => (
                          <Checkbox
                            status={blanco ? "checked" : "unchecked"}
                            onPress={() => {
                              setBlanco(!blanco);
                            }}
                            // value="blanco"
                          />
                        )}
                      />
                      <List.Item
                        title="Azul"
                        right={(props) => (
                          <Checkbox
                            status={azul ? "checked" : "unchecked"}
                            onPress={() => {
                              setAzul(!azul);
                            }}
                            // value="azul"
                          />
                        )}
                      />
                      <List.Item
                        title="Rosa"
                        right={(props) => (
                          <Checkbox
                            status={rosa ? "checked" : "unchecked"}
                            onPress={() => {
                              setRosa(!rosa);
                            }}
                            // value="rosa"
                          />
                        )}
                      />
                      <List.Item
                        title="Morado"
                        right={(props) => (
                          <Checkbox
                            status={morado ? "checked" : "unchecked"}
                            onPress={() => {
                              setMorado(!morado);
                            }}
                            // value="morado"
                          />
                        )}
                      />
                      <List.Item
                        title="Beige"
                        right={(props) => (
                          <Checkbox
                            status={beige ? "checked" : "unchecked"}
                            onPress={() => {
                              setBeige(!beige);
                            }}
                            // value="beige"
                          />
                        )}
                      />
                      <List.Item
                        title="Cafe"
                        right={(props) => (
                          <Checkbox
                            status={cafe ? "checked" : "unchecked"}
                            onPress={() => {
                              setCafe(!cafe);
                            }}
                            // value="cafe"
                          />
                        )}
                      />
                      <List.Item
                        title="Gris"
                        right={(props) => (
                          <Checkbox
                            status={gris ? "checked" : "unchecked"}
                            onPress={() => {
                              setGris(!gris);
                            }}
                            // value="gris"
                          />
                        )}
                      />
                      <List.Item
                        title="Verde"
                        right={(props) => (
                          <Checkbox
                            status={verde ? "checked" : "unchecked"}
                            onPress={() => {
                              setVerde(!verde);
                            }}
                            // value="verde"
                          />
                        )}
                      />
                      <List.Item
                        title="Negro"
                        right={(props) => (
                          <Checkbox
                            status={negro ? "checked" : "unchecked"}
                            onPress={() => {
                              setNegro(!negro);
                            }}
                            // value="negro"
                          />
                        )}
                      />
                    </List.Accordion>
                  </View>
                </List.Section>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={closefiltros}>Cancelar</Button>
                <Button onPress={clearFilters}>Limpiar</Button>
                <Button onPress={handleSearch}>Filtrar</Button>
              </Dialog.Actions>
            </ScrollView>
          </Dialog>
        </Portal>

        {productos.map((producto, index) => (
          <View
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 10,
              borderStyle: "solid",
              borderWidth: 2,
              borderColor: "#E7E2E8",
              borderRadius: 15,
            }}
          >
            <Card.Cover
              source={{
                uri: producto.url,
              }}
              style={{ width: 100, height: "auto" }}
            />
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignContent: "flex-start",
                width: "70%",
                padding: 10,
              }}
            >
              <Text variant="bodyLarge" style={styles.title}>
                {producto.nombre}
              </Text>
              <Text variant="bodyMedium" style={{ paddingBottom: 3 }}>
                {producto.descripcion}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Button
                  icon="chevron-right"
                  contentStyle={{ flexDirection: "row-reverse" }}
                  style={styles.buttonProduct}
                  onPress={() =>
                    navigation.navigate("Producto", { item: producto })
                  }
                  // onPress={() => navigation.navigate("Producto")}
                >
                  Ver
                </Button>
                <Button
                  icon="cart"
                  contentStyle={{ flexDirection: "row-reverse" }}
                  style={styles.buttonProduct}
                  onPress={() => registrarProducto(producto.id)}
                >
                  Añadir
                </Button>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    padding: 20,
  },
  buttonProduct: {
    borderWidth: 0.5,
    borderColor: "#531949",
  },
  card: {
    marginTop: 10,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
  },
  searchbar: {
    flex: 1,
  },
  button: {
    borderWidth: 0.5,
    borderColor: "#531949",
    borderRadius: 5,
    padding: 5,
  },
  buttonFilter: {
    borderWidth: 0.5,
    borderColor: "#531949",
    borderRadius: 30,
    padding: 5,
    margin: 10,
  },
  title: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    flexGrow: 1,
  },
  folder: {
    marginTop: 20,
  },
  card: {
    marginTop: 10,
  },
});

export default Tienda;
