import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";

import { ScrollView,View, StyleSheet,Image,FlatList,Dimensions } from "react-native";
import {  Button, Divider, Text } from "react-native-paper";
import baseImage from '../../../assets/img/app/image-preview.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { app } from '../../config/firebase'
import imgFauna from '../../../assets/img/inicio/fauna-02.jpg';
import imgFlora from '../../../assets/img/inicio/flora-02.jpg';
import imgCat from '../../../assets/img/inicio/catedral-01.jpg';
import imgCentro from '../../../assets/img/inicio/Foto-centro-02.jpg';
import imgLateral from '../../../assets/img/inicio/imagenLateral.jpg';
import imgMural from '../../../assets/img/inicio/imgMural-01.jpg';
import imgSierra from '../../../assets/img/inicio/imgSierra.jpg';
import MapView, { Marker } from 'react-native-maps';



{/*Carrusel Config*/}
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const AnchoCont = width;
const ESPACIO_CONTENEDOR = (width - AnchoCont) / 2;
const ALTURA_BACKDROP = height * 0.4;
const imagesCarr = [imgCat, imgCentro, imgMural];

const Inicio = ({ navigation }) => {
  
  const obtenerDatosDeFirebase = async () => {
    try {
      const productoSnapshot = await app.firestore().collection("producto").get();
      const productoData = productoSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const tematicasSnapshot = await app.firestore().collection("tematicas").get();
      const tematicasData = tematicasSnapshot.docs.map((doc) => doc.data());
      
      const usuariosSnapshot = await app.firestore().collection("usuarios").get();
      const usuariosData = usuariosSnapshot.docs.map((doc) => doc.data());

      const usuarioCorreoSnapshot = await app.firestore().collection("usuarios").get();
      const usuariosCorreoData = usuarioCorreoSnapshot.docs.map((doc) => doc.data());

      const datosCombinados = {
        producto: productoData,
        tematicas: tematicasData,
        usuarios: usuariosData,
        usuarios_correo: usuariosCorreoData
      };
      // console.log(datosCombinados)
      guardarDatosLocalmente(datosCombinados);
    }catch (error) {
      console.error("Error al obtener datos de Firebase:", error);
    }
  }

  const guardarDatosLocalmente = async (data) => {
    try {
      const existingData = await AsyncStorage.getItem("datosLocal");
      if (existingData) {
        console.log("Los datos ya existen en el almacenamiento local.");
        return;
      }
      const dataString = JSON.stringify(data);
      await AsyncStorage.setItem("datosLocal", dataString);
      console.log("Datos guardados localmente.");
    } catch (error) {
      console.error("Error al guardar datos localmente:", error);
    }
  }
  
  const eliminarDatosLocalmente = async () => {
    try {
      await AsyncStorage.removeItem("datosLocal");
      console.log("Datos eliminados del almacenamiento local.");
    } catch (error) {
      console.error("Error al eliminar datos localmente:", error);
    }
  }
  
  useEffect(() => {
    obtenerDatosDeFirebase();
  }, []);

  return (
    <ScrollView>
      {/*Carrusel*/}
      <FlatList
          data={imagesCarr}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          snapToAlignment="start"
          contentContainerStyle={{
          paddingHorizontal: ESPACIO_CONTENEDOR,
        }}
        snapToInterval={AnchoCont}
        decelerationRate={0}
        scrollEventThrottle={16}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={{ width: AnchoCont }}>
              <View style={{
                alignItems: 'center'
              }}>
                <Image source={item} style={styles.posterImage} />
              </View>
            </View>
          )}
        />
        {/*Vista Principal*/}
      <View style={styles.container}>
        <Text variant="headlineSmall" style={styles.title}>
          Huejutla: Descubriendo Nuestra Historia.
        </Text>
        <Text variant="" style={styles.Text}>
          Hace milenios, los tenec o huaxtecos fundaron "Tantocoy," un lugar de sauces. Más tarde, los toltecas lo rebautizaron como "Huexotlan," que significa lo mismo. En 1522, la expedición de Francisco de Garay trajo cambios a la región, sometida por Hernán Cortés, quien en diciembre conquistó Huexotlan, llamándolo desde entonces Huejutla. Este es solo un vistazo a la historia. Haz clic para descubrir más sobre la fascinante herencia cultural de esta tierra ancestral.
        </Text>
        <Text style={styles.subtitle}>
          Nuestros Colaboradores: Voces Auténticas de la Huasteca Hidalguense
        </Text>
        <Text style={{textAlign: 'center', fontSize: 20}}>
          Conoce a los Apasionados Guardianes de la Cultura y la Región
        </Text>
        <View style={styles.imageContainer}>
          <Image
            source={imgLateral}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.Text}>
          Nuestra plataforma es un faro de conocimiento y autenticidad gracias a nuestros dedicados colaboradores. Ellos son los narradores de historias, los guardianes de tradiciones y los informantes de la Huasteca Hidalguense. Con una profunda pasión por su cultura y región, nuestros colaboradores aportan información verídica y perspectivas únicas a través de sus artículos. Desde relatos históricos hasta exploraciones de festivales locales, sus contribuciones enriquecen nuestra comunidad y te sumergen en la riqueza de la Huasteca.
        </Text>
        <Divider style={styles.dividerStyle}/>
        <View style={styles.imageContainer}>
          <Image
            source={imgFlora}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.titleText}>
          Riqueza Botánica de la Huasteca Hidalguense
        </Text>
        <Text style={styles.normalText}>
          Explora la abundante biodiversidad de Huejutla: árboles frutales, madera fina, plantas medicinales y una profusión de flora.
        </Text>
        <Button style={styles.button} mode="contained"onPress={() => navigation.navigate('TodosArticulos')}>
          VER MÁS
        </Button>
        <Divider style={styles.dividerStyle}/>
        <View style={styles.imageContainer}>
          <Image
            source={imgFauna}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.titleText}>
          Diversidad Faunística de Huejutla
        </Text>
        <Text style={styles.normalText}>
          Descubre la fascinante variedad de vida silvestre en Huejutla, desde mamíferos y aves hasta reptiles y más.
        </Text>
        <Button style={styles.button} mode="contained" onPress={() => navigation.navigate('TodosArticulos')}>
          VER MÁS
        </Button>
        <Divider style={styles.dividerStyle}/>
        <Text style={styles.titleText}>
          Colindancias
        </Text>
        <Text style={styles.normalText}>
          Huejutla colinda al norte con el municipio de Orizatlán, el estado de Veracruz; al este con Veracruz, Huautla y Atlapexco; al sur con Atlapexco, Huazalingo y Tlanchinol; y al oeste con Tlanchinol, Jaltocan y Orizatlán.
        </Text>
        {/*MAPA*/}
        <View style={styles.imageContainer}>

        <MapView
  style={{ width: '100%', height: '100%' }}
  initialRegion={{
    latitude: 21.140622298595282,
    longitude:-98.41992130366502,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  }}
>
<Marker
    coordinate={{
      latitude: 21.141316, 
      longitude: -98.419818,
    }}
    title="Reloj Monumental de Huejutla."
    description="Emblema del pueblo Huejutlense"
  />
  <Marker
    coordinate={{
      latitude: 21.147628, 
      longitude: -98.408421,
    }}
    title="Parque Ecológico Municipal."
    description="Icónico parque dentro de la ciudad Huejutlense"
  />
  <Marker
    coordinate={{
      latitude: 21.146651658898385, 
      longitude: -98.41056065913764,
    }}
    title="Casa de la Cultura."
    description="Casa de la cultura municipal"
  />
  <Marker
    coordinate={{
      latitude:21.13948202935648,
      longitude: -98.42048014821559
    }}
    title="Palacio Municipal." 
    description="Presidencia Municipal"
  />
  <Marker
    coordinate={{
      latitude:21.14090235735598,  
      longitude:  -98.4198894423339 
    }}
    title="Centro Historico." 
    description="Centro Historico de Huejutla" 
  />

<Marker
    coordinate={{
      latitude:21.14097899812254,  
      longitude:-98.419759762751 //
    }}
    title="Letras Monumentales." 
    description="Emblema turistico" 
  />
</MapView>

        </View>
            


      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    padding: 6,
    margin: 10
  },
  title:{
    fontWeight: 'bold',
    fontSize: 35,
    margin: 10
  },
  titleText:{
    fontWeight: 'bold',
    fontSize: 35,
    margin: 10,
    textAlign: 'center'
  },
  subtitle:{
    fontSize: 35,
    margin: 10,
    textAlign: 'center'
  },
  normalText: {
    fontSize: 16, 
    fontWeight: 'normal',
    lineHeight: 25,
    margin: 10,
    color: '#666666',
    textAlign: 'center'
  },
  Text: {
    fontSize: 16, 
    fontWeight: 'normal',
    lineHeight: 25,
    margin: 10,
    color: '#666666',
    
  },
  button: {
    margin: 10,
    backgroundColor: 'transparent', 
    borderRadius: 15,     
    color: '#000'  ,     
    borderColor: '#000',
    borderWidth: 1,
  },
  dividerStyle: {
    backgroundColor: '#b5b5b5',
    margin: 50
  },
  imageContainer: {
    marginTop:5,
    width: '100%',
    aspectRatio: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  posterImage: {
    width: '100%',
    height: ALTURA_BACKDROP,
    resizeMode: 'cover',
    margin:0
    
  },
  map: {
    flex: 1,
  },
});

export default Inicio;
