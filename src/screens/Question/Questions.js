import * as React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, View, StyleSheet } from 'react-native';
import { List, Card, Divider, Text } from 'react-native-paper';

const AccordionExample = () => {
  const [expanded1, setExpanded1] = React.useState(false);
  const [expanded2, setExpanded2] = React.useState(false);
  const [expanded3, setExpanded3] = React.useState(false);
  const [expanded4, setExpanded4] = React.useState(false);
  const [expanded5, setExpanded5] = React.useState(false);
  const [expanded6, setExpanded6] = React.useState(false);
  const [expanded7, setExpanded7] = React.useState(false);
  const [expanded8, setExpanded8] = React.useState(false);

  const handlePress1 = () => {
    setExpanded1(!expanded1);
  };

  const handlePress2 = () => {
    setExpanded2(!expanded2);
  };

  const handlePress3 = () => {
    setExpanded3(!expanded3);
  };

  const handlePress4 = () => {
    setExpanded4(!expanded4);
  };

  const handlePress5 = () => {
    setExpanded5(!expanded5);
  };

  const handlePress6 = () => {
    setExpanded6(!expanded6);
  };

  const handlePress7 = () => {
    setExpanded7(!expanded7);
  };

  const handlePress8 = () => {
    setExpanded8(!expanded8);
  };

  return (
    <View>
      <Card>
      <Card>
        <List.Accordion
          title="¿Qué puedo hacer para subir un archivo?"
          left={(props) => (
            <List.Icon
              {...props}
              icon={() => <MaterialCommunityIcons name="help" size={24} />}
            />
          )}
          expanded={expanded1}
          onPress={handlePress1}
          style={{ backgroundColor: 'white' }}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text>
              Para subir un archivo... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Text>
          </ScrollView>
        </List.Accordion>
        <Divider />
      </Card>

      <Card>
        <List.Accordion
          title="¿Qué puedo hacer para solicitar cambio de información?"
          left={(props) => (
            <List.Icon
              {...props}
              icon={() => <MaterialCommunityIcons name="help" size={24} />}
            />
          )}
          expanded={expanded2}
          onPress={handlePress2}
          style={{ backgroundColor: 'white' }}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text>
              Para solicitar un cambio... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Text>
          </ScrollView>
        </List.Accordion>
        <Divider />
      </Card>

      <Card>
        <List.Accordion
          title="¿Existen pagos alternos?"
          left={(props) => (
            <List.Icon
              {...props}
              icon={() => <MaterialCommunityIcons name="help" size={24} />}
            />
          )}
          expanded={expanded3}
          onPress={handlePress3}
          style={{ backgroundColor: 'white' }}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text>
              Los pagos alternos...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Text>
          </ScrollView>
        </List.Accordion>
        <Divider />
      </Card>

      <Card>
        <List.Accordion
          title="¿Cómo solicitar un reembolso?"
          left={(props) => (
            <List.Icon
              {...props}
              icon={() => <MaterialCommunityIcons name="help" size={24} />}
            />
          )}
          expanded={expanded4}
          onPress={handlePress4}
          style={{ backgroundColor: 'white' }}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text>
              Puedes solicitar un reembolso...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Text>
          </ScrollView>
        </List.Accordion>
        <Divider />
      </Card>

      <Card>
        <List.Accordion
          title="¿Los libros cuentan con alguna contraseña o restricción?"
          left={(props) => (
            <List.Icon
              {...props}
              icon={() => <MaterialCommunityIcons name="help" size={24} />}
            />
          )}
          expanded={expanded5}
          onPress={handlePress5}
          style={{ backgroundColor: 'white' }}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text>
              No, todos nuestros libros son de libre acceso.
            </Text>
          </ScrollView>
        </List.Accordion>
        <Divider />
      </Card>

      <Card>
        <List.Accordion
          title="¿Puedo solicitar un libro a la pagina?"
          left={(props) => (
            <List.Icon
              {...props}
              icon={() => <MaterialCommunityIcons name="help" size={24} />}
            />
          )}
          expanded={expanded6}
          onPress={handlePress6}
          style={{ backgroundColor: 'white' }}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text>
            Puedes solicitar un libro o recomendar uno en... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Text>
          </ScrollView>
        </List.Accordion>
        <Divider />
      </Card>

      <Card>
        <List.Accordion
          title="¿Que datos necesitan para mi compra"
          left={(props) => (
            <List.Icon
              {...props}
              icon={() => <MaterialCommunityIcons name="help" size={24} />}
            />
          )}
          expanded={expanded7}
          onPress={handlePress7}
          style={{ backgroundColor: 'white' }}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text>
            Los datos que solicitamos son... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Text>
          </ScrollView>
        </List.Accordion>
        <Divider />
      </Card>

      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
});

export default AccordionExample;
