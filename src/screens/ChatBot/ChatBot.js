import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import {
  Text,
  Button,
  Divider,
  Avatar,
  Card,
  Searchbar,
} from "react-native-paper";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const ChatBot = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const value_query = searchQuery;

      // Crear una nueva conversación
      const newConversation = {
        user_query: value_query,
        isLoading: true,
        isEmptyResponse: false,
        predictionData: "",
      };

      // Actualizar el estado con la nueva conversación
      setConversations((prevConversations) => [
        ...prevConversations,
        newConversation,
      ]);

      const data = { answer: value_query };
      const response = await axios.post(
        "https://eduazuara.pythonanywhere.com/api/predict",
        data
      );

      console.log("Respuesta del servidor:", response.data);
      const value_response = response.data;

      // Actualizar la conversación con la respuesta del servidor
      newConversation.isLoading = false;
      newConversation.predictionData = value_response;

      setConversations((prevConversations) => {
        const updatedConversations = [...prevConversations];
        updatedConversations[updatedConversations.length - 1] = newConversation;
        return updatedConversations;
      });

      setSearchQuery("");
    } catch (error) {
      console.error("Error al hacer la solicitud POST:", error);

      setConversations((prevConversations) => [
        ...prevConversations,
        {
          user_query: searchQuery,
          isLoading: false,
          isEmptyResponse: true,
          predictionData: "",
        },
      ]);

      setSearchQuery("");
    }
  };

  return (
    <>
      {user ? (
        <View style={styles.container}>
          <Divider />
          <Searchbar
            placeholder="Pregunta sobre los artículos"
            icon="send"
            onChangeText={onChangeSearch}
            onIconPress={handleSubmit}
            value={searchQuery}
            style={styles.Searchbar}
          />
          <Divider />

          {/* Conversaciones (invertir el orden) */}
          {conversations
            .slice(0)
            .reverse()
            .map((conversation, index) => (
              <React.Fragment key={index}>
                {/* RESPUESTA DEL CHATBOT */}
                {conversation.predictionData !== "" && (
                  <Card style={styles.card}>
                    <Card.Content>
                      <Card.Title
                        subtitle={
                          <Text
                            style={{ textAlign: "right", fontWeight: "bold" }}
                          >
                            ChatBot
                          </Text>
                        }
                        right={(props) => (
                          <Avatar.Image
                            size={44}
                            source={require("../../../assets/img/chatbot/bot.jpg")}
                          />
                        )}
                      />
                      <Text style={{ textAlign: "justify" }}>
                        Respuesta: {conversation.isLoading && "Cargando..."}
                      </Text>
                      <Text style={{ textAlign: "justify" }}>
                        {conversation.isEmptyResponse
                          ? "La respuesta está vacía."
                          : conversation.predictionData.answer}
                      </Text>
                    </Card.Content>
                  </Card>
                )}
                
                {/* PREGUNTA DEL USUARIO */}
                {conversation.user_query !== "" && (
                  <Card style={styles.card}>
                    <Card.Content>
                      <Card.Title
                        title={
                          <Text style={{ fontWeight: "bold" }}>
                            {user.email}
                          </Text>
                        }
                        left={(props) => (
                          <Avatar.Image
                            size={44}
                            source={require("../../../assets/img/chatbot/perfil.png")}
                          />
                        )}
                      />
                      <Text style={{ textAlign: "justify" }}>
                        Pregunta: {conversation.user_query}
                      </Text>
                      <Text style={{ textAlign: "justify" }}>
                        {conversation.isLoading && "Cargando..."}
                      </Text>
                    </Card.Content>
                  </Card>
                )}
              </React.Fragment>
            ))}
        </View>
      ) : (
        <View>
          <Card>
            <Text
              style={{
                textAlign: "center",
                flexDirection: "row",
                alignItems: "center",
                margin: 20,
              }}
            >
              Para poder utilizar el chatbot, es necesario que inicies sesión.
            </Text>
            <Card.Content>
              <Button
                icon="login"
                onPress={() => navigation.navigate("Acceso")}
                style={styles.button2}
              >
                Iniciar sesión
              </Button>
            </Card.Content>
          </Card>
        </View>
      )}
    </>
  );
};

export default ChatBot;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  title: {
    marginBottom: 30,
  },
  Searchbar: {
    marginTop: 20,
    marginBottom: 20,
  },
  card: {
    marginTop: 20,
  },
  letters: {
    color: "white",
  },
  button2: {
    borderWidth: 0.5,
    borderColor: "#531949",
    borderRadius: 30,
    padding: 5,
    margin: 10,
  },
});
