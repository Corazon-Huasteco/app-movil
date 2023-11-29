import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Text, Divider } from 'react-native-paper';

const Terms = () => {
  return (
    <ScrollView>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="displaySmall" style={styles.cardTitle}>
            Términos de Uso
          </Text>
          <Divider />

          <Text style={styles.paragraph}>
            Conoce el corazón de la Huasteca, con domicilio en Paseo de los Framboyanes s/n, Colonia Jacarandas, Huejutla de Reyes, CP. 43000, Hidalgo, México, es el responsable del tratamiento de los datos personales que nos proporcione, los cuales serán protegidos conforme a lo dispuesto por la Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados, y demás normatividad que resulte aplicable.
          </Text>

          <Text style={styles.paragraph}>
            <Text style={styles.boldText}>¿Qué datos personales solicitamos y para qué fines?</Text>
            {"\n\n"}
            Los datos personales que solicitamos los utilizaremos para las siguientes finalidades:
          </Text>

          <View style={styles.tableContainer}>
            <View style={styles.table}>
              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text style={styles.cellText}><Text style={styles.boldText}>Finalidad</Text></Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.cellText}><Text style={styles.boldText}>¿Requieren consentimiento del titular?</Text></Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text style={styles.cellText}>Colaborar brindando información</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.cellText}>SI</Text>
                </View>
              </View>
            </View>
          </View>

          <Text style={styles.paragraph}>
            Para llevar a cabo las finalidades descritas en el presente aviso de privacidad, se solicitarán los siguientes datos personales:
            {"\n\n"}
            <Text style={styles.boldText}>Perfil de usuario</Text>
            {"\n\n"}
            Nombre
            {"\n"}
            Apellido paterno
            {"\n"}
            Apellido materno
            {"\n"}
            Edad
            {"\n"}
            Sexo
            {"\n"}
            Código postal
            {"\n"}
            Correo electrónico
            {"\n"}
            Contraseña
            {"\n\n"}
            Se informa que no se solicitarán datos personales sensibles
          </Text>

          <Text style={styles.paragraph}>
            <Text style={styles.boldText}>¿Con quién compartimos su información personal y para qué fines?</Text>
            {"\n\n"}
            Le informamos que realizamos las siguientes transferencias para las cuales requerimos de su consentimiento:
            {"\n\n"}
            <Text style={styles.boldText}>Destinatario de los datos personales</Text>        <Text style={styles.boldText}>Finalidad</Text>
            Casa de la cultura                                                                                    Verificación e integridad de los datos
          </Text>

          <Text style={styles.paragraph}>
            <Text style={styles.boldText}>¿Cuál es el fundamento para el tratamiento de datos personales?</Text>
            {"\n\n"}
            Ley general de transparencia de datos.
          </Text>

          <Text style={styles.paragraph}>
            <Text style={styles.boldText}>¿Dónde puedo ejercer mis derechos ARCO?</Text>
            {"\n\n"}
            Usted podrá presentar su solicitud para el ejercicio de los derechos de acceso, rectificación, cancelación u oposición de sus datos personales (derechos ARCO) directamente ante nuestra Unidad de Transparencia, cuyos datos de contacto son los siguientes:
          </Text>

          <Text style={styles.paragraph}>
          <Text style={styles.boldText}>¿Dónde puedo ejercer mis derechos ARCO?</Text>
          {"\n\n"}
          Usted podrá presentar su solicitud para el ejercicio de los derechos de acceso, rectificación, cancelación u oposición de sus datos personales (derechos ARCO) directamente ante nuestra Unidad de Transparencia, cuyos datos de contacto son los siguientes:
          {"\n\n"}
          a) Nombre de su titular: Eduardo Azuara Redondo.
          {"\n"}
          b) Domicilio: Anahuac s/n, Colonia Palma, Huejutla de Reyes, Huejutla de Reyes, CP. 43000, Hidalgo, México
          {"\n"}
          c) Correo electrónico: 20200725@uthh.edu.mx
          {"\n"}
          d) Número telefónico y extensión: 7717292053
          {"\n"}
          e) Otro dato de contacto: 7711189815
          {"\n\n"}
          Asimismo, usted podrá presentar una solicitud de ejercicio de derechos ARCO a través de la Plataforma Nacional de Transparencia, disponible en el siguiente enlace.
        </Text>

          <Text style={styles.paragraph}>
            Asimismo, usted podrá presentar una solicitud de ejercicio de derechos ARCO a través de la Plataforma Nacional de Transparencia, disponible en el siguiente enlace.
          </Text>

          <Text style={styles.paragraph}>
            <Text style={styles.boldText}>¿Cómo puede conocer los cambios en este aviso de privacidad?</Text>
            {"\n\n"}
            El presente aviso de privacidad puede sufrir modificaciones, cambios o actualizaciones derivadas de nuevos requerimientos legales o por otras causas.
            {"\n\n"}
            Nos comprometemos a mantenerlo informado sobre los cambios que pueda sufrir el presente aviso de privacidad, a través de: Correo electrónico.
            {"\n\n"}
            Otros datos de contacto:
            {"\n\n"}
            Página de Internet: Corazón huasteco
            {"\n"}
            Correo electrónico para la atención del público en general: 20200744@uthh.edu.mx
            {"\n"}
            Número telefónico para la atención del público en general: 7717292053
            {"\n\n"}
            Última actualización: 19/10/2022
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    marginTop: 20, // Espacio en la parte superior de la tabla
    marginBottom: 20, // Espacio en la parte inferior de la tabla
  },
  table: {
    flexDirection: 'column', // Organiza las filas en una columna
  },
  row: {
    flexDirection: 'row', // Organiza las celdas en una fila
  },
  cell: {
    flex: 1, // Las celdas ocupan el mismo espacio en la fila
    borderWidth: 1, // Agrega bordes para separar las celdas
    borderColor: 'black',
    padding: 10, // Añade relleno para el contenido de la celda
  },
  cellText: {
    textAlign: 'center', // Alinea el texto al centro de la celda
  },
  card: {
    margin: 10,
    borderRadius: 10,
  },
  cardTitle: {
    marginBottom: 0,
    fontWeight: 'bold',
  },
  paragraph: {
    marginBottom: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default Terms;
