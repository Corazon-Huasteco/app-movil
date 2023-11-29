import React from "react";
import { useAuth } from "../../context/AuthContext";
import Acceso from './Acceso'
import Articulos from "./Articulos";
import { app } from '../../config/firebase'

const Guardados = ({ navigation }) => {
  const { user } = useAuth();
  return (
    <>
      {user ? (
        <Articulos navigation={navigation} />
      ) : (
        <Acceso navigation={navigation}/>
      )}
    </>
  );
};

export default Guardados;
