import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Easing, ScrollView, Image } from 'react-native';
import { Text, Divider } from 'react-native-paper';

const MiPantalla = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const avatars = [
    { id: 1, image: 'https://corazon-huasteco.com/assets/lalo-f7cbb327.jpg', name: 'EDUARDO AZUARA REDONDO' },
    { id: 2, image: 'https://corazon-huasteco.com/assets/josa-4d1c1783.jpg', name: 'YAEL JOSAFATH FLORES ALVARADO' },
    { id: 3, image: 'https://corazon-huasteco.com/assets/elder-7c4e93b0.jpg', name: 'ELDER YAHIR MEYER SÁNCHEZ ' },
    { id: 4, image: 'https://corazon-huasteco.com/assets/einar-0c00beb4.jpg', name: 'EINAR OMAR VILLEGAZ RUIZ ' },
    { id: 5, image: 'https://scontent.fver2-1.fna.fbcdn.net/v/t39.30808-6/402941631_3498820663674073_5245205798744370229_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGYXwDicEHwbp6RfVYX5WGR-duk1IH4lZX526TUgfiVlUGNU46TflNThpFG0WfOyUgslimR2ZYZBlrWXenZNmFW&_nc_ohc=6LnvU39nAQ0AX81buI3&_nc_oc=AQmu5Xhz_ujzl99CJl5mZ4RtvYp83ZFoytgCKaD3UQgAZ0d4eh7dhKWvVgKKUozKcqVpaatPJ68iJY_n4rQTGJsn&_nc_ht=scontent.fver2-1.fna&oh=00_AfBNL06mw_IfMaRySGI9B-QLOXoVAKfcFiqJbbesJxlMOw&oe=65609EA2', name: 'JUAN DE DIOS DEL ANGEL ARRIAGA  ' },
  ];

  const handleAvatarPressIn = (avatarId) => {
    setSelectedAvatar(avatarId);
  };

  const handleAvatarPressOut = () => {
    setSelectedAvatar(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="displaySmall" style={{ marginBottom: 0, fontWeight: '700' }}>
        Nuestro equipo
      </Text>

      <Divider style={styles.dividerStyle} />

      <View style={styles.avatarContainer}>
        {avatars.map((avatar) => (
          <TouchableOpacity
            key={avatar.id}
            onPressIn={() => handleAvatarPressIn(avatar.id)}
            onPressOut={handleAvatarPressOut}
            style={styles.avatarWrapper} // Agregamos este estilo
          >
            <Animated.Image
              source={{ uri: avatar.image }}
              style={[
                styles.avatarImage,
                selectedAvatar === avatar.id && {
                  transform: [
                    {
                      rotate: '10deg',
                    },
                  ],
                },
              ]}
            />
            <Text style={styles.avatarText}>{avatar.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 20,
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
  dividerStyle: {
    backgroundColor: '#b5b5b5',
  },
  avatarContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatarWrapper: {
    alignItems: 'center', // Centramos el contenido dentro de TouchableOpacity
    marginBottom: 20, // Espacio entre cada avatar
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
  },
  avatarText: {
    marginTop: 5,
    textAlign: 'center',
  },
});

export default MiPantalla;
