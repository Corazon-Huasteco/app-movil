import React, { useRef, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { StyleSheet, View, ScrollView, Image, Dimensions } from "react-native";
import { Button, Text, Card, Divider, Avatar } from "react-native-paper";

const windowWidth = Dimensions.get("window").width;
import { app } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../config/firebaseDB";
import { Alert } from "react-native";
import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import AwesomeAlert from "react-native-awesome-alerts";

const Producto = () => {
  const { user } = useAuth();
  const route = useRoute();
  const { item } = route.params;
  const scrollViewRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / windowWidth);
    setCurrentIndex(newIndex);
  };

  const imageUrls = [item.url, item.url, item.url];

  const renderImages = () => {
    return imageUrls.map((imageUrl, index) => (
      <View key={index} style={styles.slide}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </View>
    ));
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
        if (data[idProduct] >= 7) {
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
        {/* CARRUSEL */}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          contentContainerStyle={styles.scrollViewContent}
        >
          {renderImages()}
        </ScrollView>
        <View style={styles.dotsContainer}>
          {imageUrls.map((_, index) => (
            <Text
              key={index}
              style={[
                styles.dot,
                { color: index === currentIndex ? "#531949" : "lightgray" },
              ]}
            >
              ⬤
            </Text>
          ))}
        </View>

        {/* DATOS DEL PRODUCTO */}
        <View style={styles.viewContent}>
          <Card>
            <Card.Title
              title={item.nombre}
              subtitle={"$" + item.costo}
              titleStyle={styles.title}
              subtitleStyle={{ textAlign: "center" }}
            />
            <Card.Content style={styles.cardContent}>
              <Text variant="bodyMedium" style={{ textAlign: "center" }}>
                {item.descripcion}
              </Text>
              <Text style={{ marginTop: 10 }}>Categoría(s):</Text>
              <Button style={styles.button}>{item.categoria}</Button>
            </Card.Content>
            <Divider style={{ margin: 5 }} />
            <Card.Content style={styles.cardContent}>
              <View style={{ flexDirection: "row" }}>
               
                <Button
                  icon="cart"
                  contentStyle={{ flexDirection: "row-reverse" }}
                  style={styles.button}
                  onPress={() => registrarProducto(item.id)}
                >
                  Añadir
                </Button>
              </View>
            </Card.Content>
          </Card>
        </View>

        {/* Testimonios */}
        <Card style={{ margin: 20 }}>
          <Card.Title title="Testimonios" titleStyle={styles.title} />
          {/* Persona */}
          <Card style={{ marginBottom: 10, marginLeft: 10, marginRight: 10 }}>
            <Card.Content>
              <Card.Title
                title={<Text>Great product</Text>}
                left={(props) => (
                  <Avatar.Image
                    size={44}
                    source={require("../../../assets/img/chatbot/perfil.png")}
                  />
                  // <Avatar.Text size={44} label="R" />
                )}
              />
              <Text style={{ textAlign: "justify" }}>
                Remy Sharp — Despite seeing no many bad reviews on them coming
                in broken , I took the risk and happy I did. I got the 8 piece
                and they were all in perfect condition. Thanks!
              </Text>
            </Card.Content>
          </Card>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  slide: {
    width: windowWidth - 20,
    height: 220,
    marginLeft: 20,
  },
  button: {
    borderWidth: 0.5,
    borderColor: "#531949",
    margin: 10,
  },
  image: {
    flex: 1,
    width: windowWidth - 40,
    height: 220,
    borderRadius: 10,
    marginTop: 20,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  dot: {
    fontSize: 20,
    margin: 5,
  },
  viewContent: {
    marginTop: 8,
    marginLeft: 20,
    marginRight: 20,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default Producto;
