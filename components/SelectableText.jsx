// import { StyleSheet, View } from "react-native";
// import SelectableText1 from "./SelectableText1";

// const SelectableText = () => {
//     return (
//         <View style={styles.container}>
//           <SelectableText1
//             selectable={true}
//             menuItems={["Foo", "Bar"]}
//             onSelection={console.log}
//             style={styles.welcome}
//             value="Astrocoders"
//           />
//           <SelectableText1
//             selectable={true}
//             menuItems={["Foo", "Bar"]}
//             onSelection={console.log}
//             style={styles.welcome}
//           >
//             Go Beyond
//           </SelectableText1>
//           <SelectableText1
//             selectable={true}
//             menuItems={["Astro", "Coders"]}
//             onSelection={console.log}
//             style={styles.instructions}
//             value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eleifend laoreet risus nec accumsan. In bibendum urna id ante vehicula auctor. Donec ipsum nisi, malesuada quis erat ac, molestie facilisis lacus. Vestibulum a erat dui. In imperdiet, purus at venenatis fermentum, dui neque congue est, in suscipit metus magna malesuada ex. In hendrerit tincidunt mi, vel rhoncus eros dignissim non. Nulla tincidunt, tortor et dictum fermentum, sapien leo blandit nunc, nec rutrum nulla libero nec elit. Sed vitae urna sed eros volutpat venenatis. Nulla finibus velit ac odio elementum pharetra. Ut mollis metus est, vitae blandit urna venenatis at."
//           />
//           <SelectableText1
//             selectable={true}
//             menuItems={["Crave", "Star", "Damage"]}
//             onSelection={console.log}
//             style={styles.instructions}
//             value="Quisque nec faucibus ligula. Nam ut congue mauris. Duis quis risus dolor. Praesent tempor est elit, in pretium risus sodales ac. Cras fermentum aliquam feugiat. Pellentesque in dapibus ex. Suspendisse ut magna maximus, scelerisque dui in, finibus ipsum. Nullam non justo ornare, faucibus lorem non, congue nisl. Cras venenatis ex vitae lacinia posuere. In congue porttitor velit id porta. In fermentum ultricies est nec sagittis. Etiam eget commodo ex, vel placerat nulla. Phasellus porttitor, libero eget ornare pellentesque, ipsum ex ultrices metus, et volutpat neque magna a ante."
//           />
//         </View>
//       );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#F5FCFF",
//         padding: 10
//       },
//       welcome: {
//         fontSize: 20,
//         textAlign: "center",
//         margin: 10,
//         color: "#FF0000"
//       },
//       instructions: {
//         textAlign: "center",
//         color: "#333333",
//         marginBottom: 5,
//         color: "#0000FF"
//       }
// });

// export default SelectableText;
import React from 'react';
import { View, Text } from 'react-native';
import { RNSelectableText } from 'react-native-selectable-text'; // Make sure to adjust based on your package name

const SelectableText = () => {
  return (
    <View>
      <Text>Example of Using RNSelectableText</Text>
      <RNSelectableText
        text="This is some selectable text"
        onSelection={(e) => console.log('Selected text:', e.nativeEvent)}
      />
    </View>
  );
};

export default SelectableText;

