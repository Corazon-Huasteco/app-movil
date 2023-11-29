import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { Button, Checkbox, Text, TextInput, Menu } from "react-native-paper";
import ModalSelector from "react-native-modal-selector";
import { useAuth } from "../../context/AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebaseDB";
import axios from "axios";

const Registro = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [nombreError, setNombreError] = useState("");
  const [apellido, setApellido] = useState("");
  const [apellidoError, setApellidoError] = useState("");
  const [cp, setCp] = useState("");
  const [cpError, setCpError] = useState("");
  const [estado, setEstado] = useState("");
  const [estadoError, setEstadoError] = useState("");
  const [pregunta, setPregunta] = useState("");
  const [preguntaError, setPreguntaError] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [gmail, setGmail] = useState("");
  const [gmailError, setGmailError] = useState("");
  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [checked, setChecked] = useState(false);
  const [sexo, setSexo] = useState("");
  const [sexoError, setSexoError] = useState("");
  const [preguntaMenuVisible, setPreguntaMenuVisible] = useState(false);
  const [respuestaError, setRespuestaError] = useState("");
  const [result, setResult] = useState("");
  const { signup } = useAuth();
  const [cpMessage, setCpMessage] = useState("");
  const handleSubmit = async () => {
    try {
      const info = await signup(gmail, pass);
      const referencia = doc(db, `usuarios/${info.user.uid}`);
      const referencia2 = doc(db, `usuarios_correo/${info.user.email}`);
  
      await getDoc(referencia);
      await getDoc(referencia2);
  
      setDoc(referencia, {
        name:nombre,
        lastName: apellido,
        gender: sexo,
        zipCode:cp,
        email: gmail,
        password: pass,
        secretQuestion: pregunta,
        secretQuestionAnswer:respuesta,
        rol: "consultador",
        state: estado,
        bloqueo: 3,
      });
  
      setDoc(referencia2, {
        name:nombre,
        lastName: apellido,
        gender: sexo,
        zipCode:cp,
        email: gmail,
        password: pass,
        secretQuestion: pregunta,
        secretQuestionAnswer:respuesta,
        rol: "consultador",
        state: estado,
        bloqueo: 3,
      });
      if (info) {
        console.log("Registro exitoso");
        navigation.navigate("Perfil");
      }
    } catch (error) {
      console.log("Error al crear la cuenta", error);
    }
  };
  

  const selectSex = (sex) => {
    setSexo(sex);
  };

  const showPreguntaMenu = () => setPreguntaMenuVisible(true);
  const hidePreguntaMenu = () => setPreguntaMenuVisible(false);
  const selectPregunta = (selectedOption) => {
    setPregunta(selectedOption);
    hidePreguntaMenu();
  };

  const preguntaOptions = [
    "¿Nombre de tu primera mascota?",
    "¿Nombre de tu artista favorito?",
    "¿País donde deseas vivir?",
    "¿Comida favorita?",
    "¿Nombre de tu padre o madre?",
  ];

  const sexoOptions = ["Masculino", "Femenino"];

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  // Función para validar el formato del correo electrónico
  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  // Función para validar la contraseña
  const isPasswordValid = (password) => {
    // La contraseña debe tener al menos 6 caracteres
    if (password.length < 6) return false;
    // La contraseña debe tener un mínimo de una letra mayúscula, una letra minúscula, un número y un carácter especial
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!?/-_%$&^])[A-Za-z\d@#$!?/-_%$&^]+$/;
    return passwordRegex.test(password);
  };
  const validarEmail = async (email) => {
    try {
      const response = await axios.get(
        `https://api.hunter.io/v2/email-verifier?email=${email}&domain_search=uthh.edu.mx&api_key=b7c17eb8a0f0ee28d6606f2677710cd1bf7f1bc0`
      );
      const isValid = response.data.data.result === "deliverable";
  
      if (isValid) {
        setGmailError("");
        return true; // El correo es válido
      } else {
        setGmailError("Tu correo no es válido, ingresa uno existente para continuar");
        return false; // El correo no es válido
      }
    } catch (error) {
      console.error("Error al validar el correo:", error);
      // Puedes personalizar el manejo de errores aquí
      // Por ejemplo, mostrar un mensaje amigable al usuario o registrar el error
      // setGmailError("Ha ocurrido un error al validar el correo.");
      return false; // Considera si quieres marcar el correo como inválido en este caso
    }
  };
  useEffect(() => {
    if (gmail) {
      validarEmail(gmail).then((correoValido) => {
        // Realiza acciones adicionales según si el correo es válido o no
        
      });
    }
  }, [gmail]);
  const codigoPostal = async () => {
    if (cp.length === 5) {
      const response = await fetch(`https://api.zippopotam.us/mx/${cp}`);
      const data = await response.json();
      if (data.places && data.places.length > 0) {
        const state = data.places[0].state;
        setCpMessage(`Código Postal válido: ${cp}`);
        setEstado(state);
        setCpError("");
      } else {
        setCpMessage("El código postal no existe");
        setEstado("");
        setCpError("El código postal no existe");
      }
    } else {
      setCpMessage("");
      setEstado(""); // Restablece el valor del estado est a una cadena vacía
      setCpError("El código postal debe tener 5 dígitos numéricos");
    }
  };

  useEffect(() => {
    if (cp) {
      codigoPostal();
    }
    // eslint-disable-next-line
  }, [cp]);
  
  useEffect(() => {
    // Validación del código postal
    if (/^\d{5}$/.test(cp)) {
      setCpMessage(`Código Postal válido: ${cp}`);
      setCpError(""); // CP es válido, borra el mensaje de error
    } else {
      setCpMessage("Código Postal incorrecto");
      setCpError("El código postal debe tener 5 dígitos numéricos");
    }
    if (nombre.length < 2)
      setNombreError("El nombre debe tener al menos 2 caracteres");
    else setNombreError("");

    if (apellido.length < 2)
      setApellidoError("El apellido debe tener al menos 2 caracteres");
    else setApellidoError("");

    if (!/^\d{5}$/.test(cp))
      setCpError("El código postal debe tener 5 dígitos numéricos");
    else setCpError("");

    if (!isEmailValid(gmail)) setGmailError("El correo no es válido");
    else setGmailError("");

    if (!isPasswordValid(pass))
      setPassError(
        "La contraseña debe tener al menos 6 caracteres y cumplir ciertos requisitos"
      );
    else setPassError("");

    if (estado.trim() === "") setEstadoError("El estado no puede estar vacío");
    else setEstadoError("");

    if (pregunta.trim() === "")
      setPreguntaError("Debe seleccionar una pregunta secreta");
    else setPreguntaError("");

    if (respuesta.trim() === "")
      setRespuestaError("La respuesta no puede estar vacía");
    else setRespuestaError("");
    if (sexo.trim() === "") setSexoError("Debe seleccionar un sexo");
    else setSexoError("");
  }, [nombre, apellido, cp, gmail, pass, sexo, estado, pregunta, respuesta]);

  const formValid =
    nombreError === "" &&
    apellidoError === "" &&
    cpError === "" &&
    gmailError === "" &&
    passError === "" &&
    estadoError === "" &&
    preguntaError === "" &&
    respuestaError === "" &&
    sexoError === "" &&
    checked;

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text variant="displayMedium">Regístrate</Text>

        <View style={styles.registrationContainer}>
          <Text variant="titleMedium">¿Ya tienes cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Acceso")}>
            <Text variant="titleMedium" style={styles.registerLink}>
              Ingresa ahora
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.lineaCompleta}></View>
        <View style={styles.enlinea}>
          <View style={styles.halfWidth}>
            <TextInput
              label="Nombre"
              value={nombre}
              mode="outlined"
              onChangeText={(text) => {
                setNombre(text);
              }}
              style={styles.textInput}
            />
            <Text style={styles.errorText}>{nombreError}</Text>
          </View>
          <View style={styles.halfWidth}>
            <TextInput
              label="Apellido"
              value={apellido}
              mode="outlined"
              onChangeText={(text) => {
                setApellido(text);
              }}
              style={styles.textInput}
            />
            <Text style={styles.errorText}>{apellidoError}</Text>
          </View>
        </View>

        <View style={styles.enlinea}>
          <View style={styles.halfWidth}>
            <View style={styles.pickerContainer}>
              <ModalSelector
                data={sexoOptions.map((sex, index) => ({
                  key: index,
                  label: sex,
                }))}
                initValue="Seleccione..."
                onChange={(option) => selectSex(option.label)}
              >
                <TextInput
                  label="Sexo"
                  value={sexo}
                  mode="outlined"
                  editable={false}
                />
              </ModalSelector>
            </View>
            <Text style={styles.errorText}>{sexoError}</Text>
          </View>
          <View style={styles.halfWidth}>
          <TextInput
            label="Código postal"
            value={cp}
            mode="outlined"
            onChangeText={(text) => {
              setCp(text);
              // Al modificar el CP, borra el mensaje
              setCpError("");
              setCpMessage("");
              setEstado("");
            }}
          />
          <Text style={styles.errorText}>{cpError}</Text>

        </View>
        </View>
        <TextInput
          label="Estado"
          value={estado}
          mode="outlined"
          editable={false}
          onChangeText={(text) => setEstado(text)}
          style={styles.textInput}
        />
        <Text style={styles.errorText}>{estadoError}</Text>
        <TextInput
          label="Correo"
          value={gmail}
          mode="outlined"
          onChangeText={(text) => {
            setGmail(text);
          }}
          style={styles.textInput}
        />
        <Text style={styles.errorText}>{gmailError}</Text>
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
        <Text style={styles.errorText}>{passError}</Text>
        <View style={styles.halfWidth}>
          <View style={styles.pickerContainer}>
            <ModalSelector
              data={preguntaOptions.map((preguntaOption, index) => ({
                key: index,
                label: preguntaOption,
              }))}
              initValue="Seleccione..."
              onChange={(option) => setPregunta(option.label)}
            >
              <TextInput
                label="Pregunta secreta"
                value={pregunta}
                mode="outlined"
                editable={false}
              />
            </ModalSelector>
          </View>
          <Text style={styles.errorText}>{preguntaError}</Text>
        </View>
        <TextInput
          label="Respuesta a la pregunta secreta"
          value={respuesta}
          mode="outlined"
          onChangeText={(text) => setRespuesta(text)}
          secureTextEntry={!showPassword2}
          style={styles.textInput}
          right={
            <TextInput.Icon
              icon={showPassword2 ? "eye-off" : "eye"}
              onPress={toggleShowPassword2}
            />
          }
        />
        <Text style={styles.errorText}>{respuestaError}</Text>
        <View style={styles.terminos}>
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <Text variant="titleMedium">Al continuar, aceptas nuestros </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Registro")}>
            <Text variant="titleMedium" style={styles.registerLink}>
              Términos y condiciones
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <Button
            mode="contained"
            style={styles.sendbutton}
            onPress={() => {
              handleSubmit();
            }}
            disabled={!formValid} // Aquí se deshabilita el botón si formValid es falso
          >
            Crear cuenta
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
            onPress={() => console.log("Pressed")}
          >
            Continuar con Google
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
  },
  enlinea: {
    flexDirection: "row",
  },
  pickerContainer: {
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 8,
  },
  pickerLabel: {
    paddingLeft: 8,
    color: "rgba(0, 0, 0, 0.54)",
  },
  halfWidth: {
    flex: 1,
    marginLeft: 4,
    marginEnd: 4,
  },
  contentContainer: {
    alignItems: "center",
  },
  terminos: {
    alignItems: "center",
    paddingLeft: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  registrationContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 5,
  },
  separador: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  linea: {
    flex: 1,
    height: 1,
    backgroundColor: "black",
    marginHorizontal: 5,
  },
  registerLink: {
    textDecorationLine: "underline",
    paddingLeft: 5,
    color: "#0000FF",
  },
  googlebutton: {
    marginTop: 20,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});

export default Registro;
