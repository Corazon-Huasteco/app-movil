import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, Switch as PaperSwitch, List, Divider } from 'react-native-paper';

export const Configuracion = ({navigation}) => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <ScrollView >
      <View style={styles.container}>
        <List.Section>
          <View style={styles.rowContainer}>
          <List.Item
              title="Pantalla"
              titleStyle={{ color: 'black', fontWeight: 'bold' }}
              left={() => <List.Icon icon="folder" />}
            />
            <Text style={{ flex: 1, textAlign: 'right', color: 'black'}}> Sincronizar dispositivo</Text>
          </View>
          <Divider style={styles.dividerStyle}/>
          <TouchableOpacity onPress={() => navigation.navigate('Preguntas')}>
          <List.Item 
              title="Preguntas frecuentes" 
              titleStyle={{ color: 'black', fontWeight: 'bold' }}
              left={() => <List.Icon icon="folder" />}
            />
            </TouchableOpacity>
          <Divider style={styles.dividerStyle}/>
          <View style={styles.rowContainer}>
            <List.Item title="Descargar nuevas actualizaciones" 
              titleStyle={{ color: 'black', fontWeight: 'bold' }} 
              left={() => <List.Icon icon="folder" />}
            />
            <PaperSwitch value={isSwitchOn} onValueChange={onToggleSwitch} />
          </View>
          <Divider style={styles.dividerStyle}/>
          <View style={styles.rowContainer}>
            <List.Item title="Descargas en segundo plano" 
              titleStyle={{ color: 'black', fontWeight: 'bold' }} 
              left={() => <List.Icon icon="folder" />}
            />  
            <Text style={{ flex: 1, textAlign: 'right', color: 'black'}}> WiFi</Text>
          </View>
          <Divider style={styles.dividerStyle}/>
          <Divider style={styles.dividerStyle}/>
          <TouchableOpacity onPress={() => navigation.navigate('Notificaciones')}>
          <List.Item 
              title="Notificaciones" 
              titleStyle={{ color: 'black', fontWeight: 'bold' }}
              left={() => <List.Icon icon="folder" />}
            />
          </TouchableOpacity>
          <Divider style={styles.dividerStyle}/>
          <TouchableOpacity onPress={() => navigation.navigate('AcercaDe')}>
          <List.Item 
              title="Acerca de" 
              titleStyle={{ color: 'black', fontWeight: 'bold' }}
              left={() => <List.Icon icon="folder" />}
            />
            </TouchableOpacity>

            
          <Divider style={styles.dividerStyle}/>
          <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
          <List.Item 
              title="Terminos de uso" 
              titleStyle={{ color: 'black', fontWeight: 'bold' }}
              left={() => <List.Icon icon="folder" />}
            />
            </TouchableOpacity>

          


          <Divider style={styles.dividerStyle}/>
          <TouchableOpacity onPress={() => navigation.navigate('Privacidad')}>
          <List.Item 
              title="Privacidad" 
              titleStyle={{ color: 'black', fontWeight: 'bold' }}
              left={() => <List.Icon icon="folder" />}
            />
            </TouchableOpacity>
            <Divider style={styles.dividerStyle}/>
          {/* <TouchableOpacity onPress={() => navigation.navigate('SobreNosotros')}>
            <List.Item 
                title="Sobre nosotros" 
                titleStyle={{ color: 'black', fontWeight: 'bold' }}
                left={() => <List.Icon icon="folder" />}
              />
          </TouchableOpacity> */}
          <Divider style={styles.dividerStyle}/>
          <TouchableOpacity onPress={() => navigation.navigate('Contactanos')}>
          <List.Item 
              title="Contactanos" 
              titleStyle={{ color: 'black', fontWeight: 'bold' }}
              left={() => <List.Icon icon="folder" />}
            />
            </TouchableOpacity>
          
          <Divider style={styles.dividerStyle}/>
          {/* <TouchableOpacity onPress={() => navigation.navigate('ChatBot')}>  
          <List.Item
            title="Chatbot"
            titleStyle={{ color: 'black', fontWeight: 'bold' }}
            left={() => <List.Icon icon="folder"/>}
          />
          <Divider style={styles.dividerStyle}/>
        </TouchableOpacity> */}
        </List.Section>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'left',
    margin: 10,
    padding: 20,
    position: 'relative',
  },
  rowContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  dividerStyle: {
    backgroundColor: '#b5b5b5',
  },
});