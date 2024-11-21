// import React, { useState } from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { Card, Dialog, Portal, Button, useTheme } from "react-native-paper";
// import { useLanguage } from "../context/LanguageContext";

// const PlayVocabulary = (props) => {
//     const {colors} = useTheme();
//   const { game } = props;
//   const { text, hardSentences } = game;
//   const {locale} = useLanguage();

//   // Create a map for easy lookup of explanations
//   const sentenceMap = hardSentences.reduce((map, item) => {
//     map[item.sentence[locale]] = item.explanation[locale];
//     return map;
//   }, {});

//   // Split the text into words
//   const words = text[locale].split(/(\s+)/); // Split by spaces, keeping the spaces

//   // State to manage Dialog visibility and content
//   const [visible, setVisible] = useState(false);
//   const [currentExplanation, setCurrentExplanation] = useState("");
//   const [currentWord, setCurrentWord] = useState("");

//   // Functions to show and hide the Dialog
//   const showDialog = (word, explanation) => {
//     setCurrentWord(word);
//     setCurrentExplanation(explanation);
//     setVisible(true);
//   };
//   const hideDialog = () => {
//     setVisible(false);
//   };

//   return (
//     <Card style={[styles.card, {backgroundColor: colors.myOrange}]}>
//       <View style={styles.textContainer}>
//         {words.map((word, index) => {
//           // Check if the word is in the sentenceMap
//           const explanation = sentenceMap[word];

//           return (
//             <TouchableOpacity
//               key={index}
//               onPress={() => explanation && showDialog(word, explanation)}
//               disabled={!explanation} // Disable press if no explanation
//             >
//               <Text
//                 style={[
//                   styles.text,
//                   explanation && styles.highlightedText, // Apply highlighted style if explanation exists
//                 ]}
//               >
//                 {word}
//               </Text>
//             </TouchableOpacity>
//           );
//         })}
//       </View>

//       {/* Dialog for displaying explanations */}
//       <Portal>
//         <Dialog style={{backgroundColor: colors.myBeige}} visible={visible} onDismiss={hideDialog}>
//           <Dialog.Title>{currentWord}</Dialog.Title>
//           <Dialog.Content>
//             <Text>{currentExplanation}</Text>
//           </Dialog.Content>
//         </Dialog>
//       </Portal>
//     </Card>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     margin: 20,
//     paddingVertical: 30,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//   },
//   textContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//   },
//   text: {
//     fontSize: 20,
//     marginHorizontal: 2,
//   },
//   highlightedText: {
//     textDecorationLine: "underline",
//   },
// });

// export default PlayVocabulary;


// import React, { useState } from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { Card, Dialog, Portal, useTheme } from "react-native-paper";
// import { useLanguage } from "../context/LanguageContext";

// const PlayVocabulary = (props) => {
//   const { colors } = useTheme();
//   const { game } = props;
//   const { text, hardSentences } = game;
//   const { locale } = useLanguage();

//   // Create a map for easy lookup of explanations
//   const sentenceMap = hardSentences.reduce((map, item) => {
//     map[item.sentence[locale]] = item.explanation[locale];
//     return map;
//   }, {});

//   // State to manage Dialog visibility and content
//   const [visible, setVisible] = useState(false);
//   const [currentExplanation, setCurrentExplanation] = useState("");
//   const [currentSentence, setCurrentSentence] = useState("");

//   // Function to show dialog with explanation
//   const showDialog = (sentence, explanation) => {
//     setCurrentSentence(sentence);
//     setCurrentExplanation(explanation);
//     setVisible(true);
//   };

//   const hideDialog = () => {
//     setVisible(false);
//   };

//   // Function to split the text into sentences and detect matches
//   const renderText = (inputText) => {
//     // Split the text by punctuation (.,!? etc.) to handle sentences
//     const sentenceRegex = /([^.!?]+[.!?]+)/g;
//     const sentences = inputText.split(sentenceRegex).filter(Boolean); // Remove empty entries

//     const result = sentences.map((sentence, index) => {
//       const trimmedSentence = sentence.trim(); // Trim any extra spaces
//       // Check if the sentence matches any in the sentenceMap
//       const explanation = sentenceMap[trimmedSentence];

//       return explanation ? (
//         <TouchableOpacity
//           key={index}
//           onPress={() => showDialog(trimmedSentence, explanation)}
//         >
//           <Text style={[styles.text, styles.highlightedText]}>
//             {sentence}
//           </Text>
//         </TouchableOpacity>
//       ) : (
//         <Text key={index} style={styles.text}>
//           {sentence}
//         </Text>
//       );
//     });

//     return result;
//   };

//   return (
//     <Card style={[styles.card, { backgroundColor: colors.myOrange }]}>
//       <View style={styles.textContainer}>{renderText(text[locale])}</View>

//       {/* Dialog for displaying explanations */}
//       <Portal>
//         <Dialog style={{ backgroundColor: colors.myBeige }} visible={visible} onDismiss={hideDialog}>
//           <Dialog.Title>{currentSentence}</Dialog.Title>
//           <Dialog.Content>
//             <Text>{currentExplanation}</Text>
//           </Dialog.Content>
//         </Dialog>
//       </Portal>
//     </Card>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     margin: 20,
//     paddingVertical: 30,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//   },
//   textContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//   },
//   text: {
//     fontSize: 20,
//     marginHorizontal: 2,
//   },
//   highlightedText: {
//     textDecorationLine: "underline",
//   },
// });

// export default PlayVocabulary;
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Dialog, Portal, useTheme } from "react-native-paper";
import { useLanguage } from "../context/LanguageContext";

const PlayVocabulary = (props) => {
  const { colors } = useTheme();
  const { game } = props;
  const { text, hardSentences } = game;
  const { locale } = useLanguage();

  // State to manage Dialog visibility and content
  const [visible, setVisible] = useState(false);
  const [currentExplanation, setCurrentExplanation] = useState("");
  const [currentSentence, setCurrentSentence] = useState("");

  // Function to show dialog with explanation
  const showDialog = (sentence, explanation) => {
    setCurrentSentence(sentence);
    setCurrentExplanation(explanation[locale]);
    setVisible(true);
  };

  const hideDialog = () => {
    setVisible(false);
  };

  // Function to render text with highlighting
  const renderText = (inputText) => {
    // Create an array to store text segments
    const segments = [];
    let remainingText = inputText;

    // Sort hard sentences by length (descending) to handle nested/overlapping cases
    const sortedHardSentences = [...hardSentences].sort((a, b) => 
      b.sentence.length - a.sentence.length
    );

    sortedHardSentences.forEach((hardSentence) => {
      const { sentence, explanation } = hardSentence;
      
      // Use indexOf to find the sentence
      const index = remainingText.indexOf(sentence);

      if (index !== -1) {
        // Add text before the hard sentence
        if (index > 0) {
          segments.push({
            text: remainingText.substring(0, index),
            isHighlighted: false
          });
        }

        // Add the hard sentence
        segments.push({
          text: sentence,
          isHighlighted: true,
          explanation: explanation
        });

        // Update remaining text
        remainingText = remainingText.substring(index + sentence.length);
      }
    });

    // Add any remaining text
    if (remainingText) {
      segments.push({
        text: remainingText,
        isHighlighted: false
      });
    }

    // Render segments
    return segments.map((segment, index) => {
      if (segment.isHighlighted) {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => showDialog(segment.text, segment.explanation)}
            style={styles.highlightedContainer}
          >
            <Text style={[styles.text, styles.highlightedText]}>
              {segment.text}
            </Text>
          </TouchableOpacity>
        );
      }
      return (
        <Text key={index} style={styles.text}>
          {segment.text}
        </Text>
      );
    });
  };

  return (
    <Card style={[styles.card, { backgroundColor: colors.myOrange }]}>
      <View style={styles.textContainer}>
        {renderText(text[locale])}
      </View>

      {/* Dialog for displaying explanations */}
      <Portal>
        <Dialog
          style={{ backgroundColor: colors.myBeige }}
          visible={visible}
          onDismiss={hideDialog}
        >
          <Dialog.Title>{currentSentence}</Dialog.Title>
          <Dialog.Content>
            <Text>{currentExplanation}</Text>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  textContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  text: {
    fontSize: 20,
    marginHorizontal: 2,
  },
  highlightedContainer: {
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
  },
  highlightedText: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default PlayVocabulary;