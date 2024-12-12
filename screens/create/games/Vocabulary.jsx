// import React, { useState } from "react";
// import { View, Text, StyleSheet, Button, TextInput } from "react-native";
// import { Card, Dialog, Portal, useTheme } from "react-native-paper";

// const CreateVocabulary = () => {
//   const { colors } = useTheme();
//   const [text, setText] = useState({ he: "", en: "" });
//   const [lang, setLang] = useState("he");
//   const [selectedText, setSelectedText] = useState("");

//   const [visible, setVisible] = useState(false);
//   const [currentExplanation, setCurrentExplanation] = useState("");
//   const [currentSentence, setCurrentSentence] = useState("");

//   const screenStyle = { backgroundColor: colors.myBeige };

//   const saveHandler = () => {
//     console.log(`Saving text: ${text[lang]} for language: ${lang}`);
//     // Save to database logic goes here
//   };

//   const changeHandler = (newText) => {
//     setText((prevText) => ({ ...prevText, [lang]: newText }));
//   };

//   const toggleLanguage = () => {
//     setLang((prevLang) => (prevLang === "he" ? "en" : "he"));
//   };

//   const showDialog = (sentence, explanation) => {
//     setCurrentSentence(sentence);
//     setCurrentExplanation(explanation[locale]);
//     setVisible(true);
//   };

//   const hideDialog = () => {
//     setVisible(false);
//   };

//   const handleSelectionChange = (event) => {
//     console.log(event.nativeEvent);
//     const { selection } = event.nativeEvent;

//     // Check if selection and inputText are valid
//     if (selection) {
//       const { start, end } = selection;

//       if (start !== undefined && end !== undefined) {
//         const selectedTextRange = text[lang].slice(start, end);
//         console.log(selectedTextRange);
//         setSelectedText(selectedTextRange); // Update the state with selected text
//       }
//     }
//   };

//   return (
//     <View style={[styles.screen, screenStyle]}>
//       <Card style={[styles.card, { backgroundColor: colors.myOrange }]}>
//         <TextInput
//           style={[
//             styles.textInput,
//             {
//               textAlign: lang === "he" ? "right" : "left",
//               borderColor: colors.primary,
//             },
//           ]}
//           value={text[lang]}
//           onChangeText={changeHandler}
//           placeholder={`${
//             lang === "he" ? "הקלד טקסט בעברית" : "Enter text in English"
//           }`}
//           onSelectionChange={handleSelectionChange}
//           multiline
//         />
//       </Card>
//       <View style={styles.buttons}>
//         <Button title="Save" onPress={saveHandler} color={colors.primary} />
//         <Button
//           title={`Switch to ${lang === "he" ? "English" : "Hebrew"}`}
//           onPress={toggleLanguage}
//           color={colors.secondary}
//         />
//       </View>
//       <Portal>
//         <Dialog
//           style={{ backgroundColor: colors.myBeige }}
//           visible={visible}
//           onDismiss={hideDialog}
//         >
//           <Dialog.Title>{selectedText}</Dialog.Title>
//           <Dialog.Content>
//             <Text>Here will be explanation</Text>
//           </Dialog.Content>
//         </Dialog>
//       </Portal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     height: "100%",
//     justifyContent: "center",
//   },
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
//   highlightedContainer: {
//     borderBottomWidth: 2,
//     borderBottomColor: "blue",
//   },
//   highlightedText: {
//     color: "blue",
//     fontWeight: "bold",
//   },
// });

// export default CreateVocabulary;

// import React, { useState } from "react";
// import { View, Text, StyleSheet, Button, TextInput } from "react-native";
// import { Card, Dialog, Portal, useTheme, TouchableRipple } from "react-native-paper";

// const CreateVocabulary = () => {
//   const { colors } = useTheme();
//   const [text, setText] = useState({ he: "", en: "" });
//   const [lang, setLang] = useState("he");
//   const [selectedText, setSelectedText] = useState("");
//   const [portelVisible, setPortalVisible] = useState(false);
//   const [contextMenuHidden, setContextMenuHidden] = useState(false);

//   const screenStyle = { backgroundColor: colors.myBeige };

//   const saveHandler = () => {
//     console.log(`Saving text: ${text[lang]} for language: ${lang}`);
//     // Save to database logic goes here
//   };

//   const changeHandler = (newText) => {
//     setText((prevText) => ({ ...prevText, [lang]: newText }));
//   };

//   const toggleLanguage = () => {
//     setLang((prevLang) => (prevLang === "he" ? "en" : "he"));
//   };

//   const showDialog = () => {
//     setContextMenuHidden(true)
//     setPortalVisible(true);
//   };

//   const hideDialog = () => {
//     setPortalVisible(false);
//     setContextMenuHidden(false);
//   };

//   const handleSelectionChange = (event) => {
//     const { selection } = event.nativeEvent;

//     if (selection) {
//       const { start, end } = selection;

//       if (start !== undefined && end !== undefined) {
//         const selectedTextRange = text[lang].slice(start, end);
//         setSelectedText(selectedTextRange);
//       }
//     }
//   };

//   return (
//     <View style={[styles.screen, screenStyle]}>
//       <Card style={[styles.card, { backgroundColor: colors.myOrange }]}>
//         <TextInput
//           style={[
//             styles.textInput,
//             {
//               textAlign: lang === "he" ? "right" : "left",
//               borderColor: colors.primary,
//             },
//           ]}
//           value={text[lang]}
//           onChangeText={changeHandler}
//           placeholder={`${
//             lang === "he" ? "הקלד טקסט בעברית" : "Enter text in English"
//           }`}
//           onSelectionChange={handleSelectionChange}
//           multiline
//           contextMenuHidden={contextMenuHidden}
//         />
//       </Card>

//       <View style={styles.buttons}>
//         <Button title="Save" onPress={saveHandler} color={colors.primary} />
//         <Button
//           title={`Switch to ${lang === "he" ? "English" : "Hebrew"}`}
//           onPress={toggleLanguage}
//           color={colors.secondary}
//         />
//       </View>

//       {selectedText.length > 0 && (
//         <Button
//           title={
//             selectedText.length > 20 ? "Too long" : `Use: ${selectedText}`
//           }
//           disabled={selectedText.length > 20}
//           onPress={showDialog}
//           color={colors.primary}
//         />
//       )}

//       <Portal>
//         <Dialog
//           style={{ backgroundColor: colors.myBeige }}
//           visible={portelVisible}
//           onDismiss={hideDialog}
//         >
//           <Dialog.Title>{selectedText}</Dialog.Title>
//           <Dialog.Content>
//             <Text>Here will be explanation</Text>
//           </Dialog.Content>
//         </Dialog>
//       </Portal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     height: "100%",
//     justifyContent: "center",
//   },
//   card: {
//     margin: 20,
//     paddingVertical: 30,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//   },
//   textInput: {
//     height: 150,
//     borderWidth: 1,
//     borderRadius: 10,
//     padding: 10,
//     fontSize: 18,
//   },
//   buttons: {
//     marginTop: 20,
//     flexDirection: "row",
//     justifyContent: "space-around",
//   },
// });

// export default CreateVocabulary;

// import React, { useState } from "react";
// import { View, StyleSheet, Button, TextInput } from "react-native";
// import { Card, Dialog, Portal, useTheme } from "react-native-paper";

// const CreateVocabulary = () => {
//   const { colors } = useTheme();
//   const [text, setText] = useState({ he: "", en: "" });
//   const [finalText, setFinalText] = useState({ he: "", en: "" });
//   const [lang, setLang] = useState("he");
//   const [isTextSaved, setTextSaved] = useState(false);
//   const [selectedText, setSelectedText] = useState({
//     start: 0,
//     end: 0,
//     text: "",
//   });
//   const [portalVisible, setPortalVisible] = useState(false);
//   const [currentSentence, setCurrentSentence] = useState({
//     start: 0,
//     end: 0,
//     text: "",
//   });
//   const [explanation, setExplanation] = useState("");
//   const [contextMenuHidden, setContextMenuHidden] = useState(false);
//   const [key, setKey] = useState(0); // Forcing re-render of TextInput when needed

//   const screenStyle = { backgroundColor: colors.myBeige };

//   const saveHandler = () => {
//     console.log(`Saving text: ${text[lang]} for language: ${lang}`);
//     setTextSaved(true);
//     setFinalText(text);
//     // Save logic can be implemented here
//   };

//   const toggleLanguage = () => {
//     setLang((prevLang) => (prevLang === "he" ? "en" : "he"));
//   };

//   const handleTextChange = (newText) => {
//     if (!isTextSaved) {
//       setText((prevText) => ({ ...prevText, [lang]: newText }));
//     }
//   };

//   const handleSelectionChange = (event) => {
//     const { selection } = event.nativeEvent;
//     if (selection) {
//       const { start, end } = selection;
//       const selectedTextRange = text[lang].slice(start, end);
//       setSelectedText({ start, end, text: selectedTextRange });
//     }
//   };

//   const showDialog = () => {
//     const currentText = text[lang];
//     let { start, end } = selectedText;

//     // Adjust to full words
//     while (start > 0 && currentText[start - 1] !== " ") start--;
//     while (end < currentText.length && currentText[end] !== " ") end++;

//     const adjustedText = currentText.slice(start, end).trim();
//     setCurrentSentence({ start, end, text: adjustedText });
//     setContextMenuHidden(true);
//     setKey((prevKey) => prevKey + 1); // Trigger re-render
//     setPortalVisible(true);
//   };

//   const hideDialog = () => {
//     setPortalVisible(false);
//     setContextMenuHidden(false);
//     setKey((prevKey) => prevKey + 1); // Trigger re-render
//   };

//   const saveSentence = () => {
//     console.log(`saved: ${finalText} : ${currentSentence} = ${explanation}`)
//     hideDialog();
//   };

//   return (
//     <View style={[styles.screen, screenStyle]}>
//       <Card style={[styles.card, { backgroundColor: colors.myOrange }]}>
//         <TextInput
//           key={key} // Forcing re-render
//           style={[
//             styles.textInput,
//             {
//               textAlign: lang === "he" ? "right" : "left",
//               borderColor: colors.primary,
//             },
//           ]}
//           value={text[lang]}
//           onChangeText={handleTextChange}
//           placeholder={
//             lang === "he" ? "הקלד טקסט בעברית" : "Enter text in English"
//           }
//           onSelectionChange={handleSelectionChange}
//           multiline
//           contextMenuHidden={contextMenuHidden}
//         />
//       </Card>

//       {!isTextSaved && (
//         <View style={styles.buttons}>
//           <Button title="Save" onPress={saveHandler} color={colors.primary} />
//           <Button
//             title={`Switch to ${lang === "he" ? "English" : "Hebrew"}`}
//             onPress={toggleLanguage}
//             color={colors.secondary}
//           />
//         </View>
//       )}

//       {isTextSaved && selectedText.text.length > 0 && (
//         <Button
//           title={
//             selectedText.text.length > 20
//               ? "Too long"
//               : `Use: ${selectedText.text}`
//           }
//           disabled={selectedText.text.length > 20}
//           onPress={showDialog}
//           color={colors.primary}
//         />
//       )}

//       <Portal>
//         <Dialog
//           style={{ backgroundColor: colors.myBeige }}
//           visible={portalVisible}
//           onDismiss={hideDialog}
//         >
//           <Dialog.Title>{currentSentence.text}</Dialog.Title>
//           <Dialog.Content>
//             <TextInput
//               style={styles.dialogInput}
//               placeholder="Write here the explanation"
//               value={explanation}
//               onChangeText={setExplanation}
//               multiline
//             />
//           </Dialog.Content>
//           <Dialog.Actions>
//             <Button title="Save" onPress={saveSentence} color={colors.primary} />
//           </Dialog.Actions>
//           <Dialog.Actions>
//             <Button title="Close" onPress={hideDialog} color={colors.primary} />
//           </Dialog.Actions>
//         </Dialog>
//       </Portal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     height: "100%",
//     justifyContent: "center",
//   },
//   card: {
//     margin: 20,
//     paddingVertical: 30,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//   },
//   textInput: {
//     height: 150,
//     borderWidth: 1,
//     borderRadius: 10,
//     padding: 10,
//     fontSize: 18,
//   },
//   buttons: {
//     marginTop: 20,
//     flexDirection: "row",
//     justifyContent: "space-around",
//   },
//   dialogInput: {
//     height: 100,
//     borderWidth: 1,
//     borderRadius: 10,
//     padding: 10,
//     fontSize: 16,
//     marginTop: 10,
//     borderColor: "#ccc",
//   },
// });

// export default CreateVocabulary;

import PlayVocabulary from "@/components/playGame/Vocabulary";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useState } from "react";
import { View, StyleSheet, TextInput, ScrollView, Text } from "react-native";
import { Button, Card, Dialog, Portal, useTheme } from "react-native-paper";

const CreateVocabulary = () => {
  const { colors } = useTheme();
  const [text, setText] = useState({ he: "", en: "" });
  const [finalText, setFinalText] = useState({
    he: { text: "", hardSentences: [] },
    en: { text: "", hardSentences: [] },
  });
  const [lang, setLang] = useState("he");
  const [preview, setPreview] = useState(false);
  const [isTextSaved, setTextSaved] = useState(false);
  const [selectedText, setSelectedText] = useState({
    start: 0,
    end: 0,
    text: "",
  });
  const [portalVisible, setPortalVisible] = useState(false);
  const [currentSentence, setCurrentSentence] = useState({
    start: 0,
    end: 0,
    text: "",
  });
  const [explanation, setExplanation] = useState("");
  const [contextMenuHidden, setContextMenuHidden] = useState(false);
  const [key, setKey] = useState(0); // Forcing re-render of TextInput when needed

  const screenStyle = { backgroundColor: colors.myBeige };

  const saveHandler = () => {
    setTextSaved(true);
    if (text["he"].length > 0) {
      setFinalText((prevFinalText) => ({
        ...prevFinalText,
        ["he"]: { ...prevFinalText["he"], text: text["he"] },
      }));
    }
    if (text["en"].length > 0) {
      setFinalText((prevFinalText) => ({
        ...prevFinalText,
        ["en"]: { ...prevFinalText["en"], text: text["en"] },
      }));
    }
  };

  const toggleLanguage = () => {
    setLang((prevLang) => (prevLang === "he" ? "en" : "he"));
    if (isTextSaved) {
      setSelectedText({
        start: 0,
        end: 0,
        text: "",
      });
    }
  };
  const togglePreview = () => {
    setPreview((prev) => !prev);
  };

  const handleTextChange = (newText) => {
    if (!isTextSaved) {
      setText((prevText) => ({ ...prevText, [lang]: newText }));
    }
  };

  const handleSelectionChange = (event) => {
    const { selection } = event.nativeEvent;
    if (selection) {
      const { start, end } = selection;
      const selectedTextRange = text[lang].slice(start, end);
      setSelectedText({ start, end, text: selectedTextRange });
    }
  };

  const showDialog = () => {
    const currentText = text[lang];
    let { start, end } = selectedText;

    // Adjust to full words
    while (start > 0 && currentText[start - 1] !== " ") start--;
    while (end < currentText.length && currentText[end] !== " ") end++;

    const adjustedText = currentText.slice(start, end).trim();
    setCurrentSentence({ start, end, text: adjustedText });
    setContextMenuHidden(true);
    setKey((prevKey) => prevKey + 1); // Trigger re-render
    setPortalVisible(true);
  };

  const hideDialog = () => {
    setPortalVisible(false);
    setContextMenuHidden(false);
    setKey((prevKey) => prevKey + 1); // Trigger re-render
  };

  const saveSentence = () => {
    setFinalText((prevFinalText) => {
      const updatedSentences = [
        ...prevFinalText[lang].hardSentences,
        {
          sentence: currentSentence.text,
          start: currentSentence.start,
          end: currentSentence.end,
          explanation,
        },
      ];

      return {
        ...prevFinalText,
        [lang]: { ...prevFinalText[lang], hardSentences: updatedSentences },
      };
    });

    setExplanation("");
    hideDialog();
  };

  return (
    <ScrollView style={[styles.screen, screenStyle]}>
      {!preview && (
        <Card style={[styles.card, { backgroundColor: colors.myOrange }]}>
          <TextInput
            key={key} // Forcing re-render
            style={[
              styles.textInput,
              {
                textAlign: lang === "he" ? "right" : "left",
                borderColor: colors.primary,
              },
            ]}
            value={text[lang]}
            onChangeText={handleTextChange}
            placeholder={
              lang === "he" ? "הקלד טקסט בעברית" : "Enter text in English"
            }
            onSelectionChange={handleSelectionChange}
            multiline
            contextMenuHidden={contextMenuHidden}
          />
        </Card>
      )}

      {preview && (<PlayVocabulary game={{text: {he: finalText.he.text, en: finalText.en.text}, hardSentences: []}}/>)}

      <View style={styles.buttons}>
        {!isTextSaved && (text["he"].length > 0 || text["en"].length > 0) && (
          <Button onPress={saveHandler}>Save</Button>
        )}
        {isTextSaved && selectedText.text.length > 0 && (
          <Button disabled={selectedText.text.length > 20} onPress={showDialog}>
            {selectedText.text.length > 20
              ? "Too long"
              : `Selected: ${selectedText.text}`}
          </Button>
        )}
        {(!isTextSaved ||
          (finalText["en"].text.length > 0 &&
            finalText["he"].text.length > 0)) && (
          <Button onPress={toggleLanguage}>
            {lang == "he" ? (
              <MaterialIcons name="abc" size={22} />
            ) : (
              <MaterialCommunityIcons name="abjad-hebrew" />
            )}
          </Button>
        )}
      </View>

      {isTextSaved && (
        <Button onPress={togglePreview}>
          {preview == false ? (
            <AntDesign name="eye" />
          ) : (
            <AntDesign name="edit" />
          )}
        </Button>
      )}

      <Portal>
        <Dialog
          style={{ backgroundColor: colors.myBeige }}
          visible={portalVisible}
          onDismiss={hideDialog}
        >
          <Dialog.Title>{currentSentence.text}</Dialog.Title>
          <Dialog.Content>
            <TextInput
              style={styles.dialogInput}
              placeholder="Write here the explanation"
              value={explanation}
              onChangeText={setExplanation}
              multiline
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={saveSentence}>Save</Button>
          </Dialog.Actions>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <View style={styles.savedSentences}>
        <Text style={styles.heading}>Saved Sentences:</Text>
        {Object.entries(finalText).map(([language, data]) => (
          <View key={language} style={styles.languageSection}>
            <Text style={styles.languageTitle}>
              {language === "he" ? "Hebrew" : "English"}
            </Text>
            {data.hardSentences.map((sentence, index) => (
              <Text key={index} style={styles.sentence}>
                • {sentence.sentence} ({sentence.explanation})
              </Text>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    height: "100%",
  },
  card: {
    margin: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  textInput: {
    height: 150,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 18,
  },
  buttons: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dialogInput: {
    height: 100,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginTop: 10,
    borderColor: "#ccc",
  },
  savedSentences: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  languageSection: {
    marginBottom: 15,
  },
  languageTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  sentence: {
    fontSize: 14,
    marginLeft: 10,
  },
});

export default CreateVocabulary;

// import React, { useState } from "react";
// import { View, StyleSheet, Button, TextInput, ScrollView, Text } from "react-native";
// import { Card, Dialog, Portal, useTheme } from "react-native-paper";

// const CreateVocabulary = () => {
//   const { colors } = useTheme();
//   const [text, setText] = useState({ he: "", en: "" });
//   const [finalText, setFinalText] = useState({
//     he: { text: "", hardSentences: [] },
//     en: { text: "", hardSentences: [] },
//   });
//   const [lang, setLang] = useState("he");
//   const [isTextSaved, setTextSaved] = useState(false);
//   const [selectedText, setSelectedText] = useState({
//     start: 0,
//     end: 0,
//     text: "",
//   });
//   const [portalVisible, setPortalVisible] = useState(false);
//   const [currentSentence, setCurrentSentence] = useState({
//     start: 0,
//     end: 0,
//     text: "",
//   });
//   const [explanation, setExplanation] = useState("");
//   const [contextMenuHidden, setContextMenuHidden] = useState(false);
//   const [key, setKey] = useState(0); // Forcing re-render of TextInput when needed
//   const [usedIndices, setUsedIndices] = useState({ he: new Set(), en: new Set() });

//   const screenStyle = { backgroundColor: colors.myBeige };

//   const saveHandler = () => {
//     console.log(`Saving text for language: ${lang}`);
//     setTextSaved(true);
//     setFinalText((prevFinalText) => ({
//       ...prevFinalText,
//       [lang]: { ...prevFinalText[lang], text: text[lang] },
//     }));
//   };

//   const toggleLanguage = () => {
//     setLang((prevLang) => (prevLang === "he" ? "en" : "he"));
//   };

//   const handleTextChange = (newText) => {
//     if (!isTextSaved) {
//       setText((prevText) => ({ ...prevText, [lang]: newText }));
//     }
//   };

//   const handleSelectionChange = (event) => {
//     const { selection } = event.nativeEvent;
//     if (selection) {
//       const { start, end } = selection;
//       const selectedTextRange = text[lang].slice(start, end);
//       setSelectedText({ start, end, text: selectedTextRange });
//     }
//   };

//   const isSelectionUsed = () => {
//     const indicesInRange = new Set();
//     for (let i = selectedText.start; i < selectedText.end; i++) {
//       indicesInRange.add(i);
//     }

//     const alreadyUsed = [...indicesInRange].some((index) =>
//       usedIndices[lang].has(index)
//     );

//     return alreadyUsed;
//   };

//   const showDialog = () => {
//     const currentText = text[lang];
//     let { start, end } = selectedText;

//     // Adjust to full words
//     while (start > 0 && currentText[start - 1] !== " ") start--;
//     while (end < currentText.length && currentText[end] !== " ") end++;

//     const adjustedText = currentText.slice(start, end).trim();
//     setCurrentSentence({ start, end, text: adjustedText });
//     setContextMenuHidden(true);
//     setKey((prevKey) => prevKey + 1); // Trigger re-render
//     setPortalVisible(true);
//   };

//   const hideDialog = () => {
//     setPortalVisible(false);
//     setContextMenuHidden(false);
//     setKey((prevKey) => prevKey + 1); // Trigger re-render
//   };

//   const saveSentence = () => {
//     setFinalText((prevFinalText) => {
//       const updatedSentences = [
//         ...prevFinalText[lang].hardSentences,
//         {
//           sentence: currentSentence.text,
//           start: currentSentence.start,
//           end: currentSentence.end,
//           explanation,
//         },
//       ];

//       return {
//         ...prevFinalText,
//         [lang]: { ...prevFinalText[lang], hardSentences: updatedSentences },
//       };
//     });

//     setUsedIndices((prevUsedIndices) => {
//       const updatedIndices = new Set(prevUsedIndices[lang]);
//       for (let i = currentSentence.start; i < currentSentence.end; i++) {
//         updatedIndices.add(i);
//       }
//       return { ...prevUsedIndices, [lang]: updatedIndices };
//     });

//     setExplanation("");
//     hideDialog();
//   };

//   return (
//     <ScrollView style={[styles.screen, screenStyle]}>
//       <Card style={[styles.card, { backgroundColor: colors.myOrange }]}>
//         <TextInput
//           key={key} // Forcing re-render
//           style={[
//             styles.textInput,
//             {
//               textAlign: lang === "he" ? "right" : "left",
//               borderColor: colors.primary,
//             },
//           ]}
//           value={text[lang]}
//           onChangeText={handleTextChange}
//           placeholder={
//             lang === "he" ? "הקלד טקסט בעברית" : "Enter text in English"
//           }
//           onSelectionChange={handleSelectionChange}
//           multiline
//           contextMenuHidden={contextMenuHidden}
//         />
//       </Card>

//       {!isTextSaved && (
//         <View style={styles.buttons}>
//           <Button title="Save" onPress={saveHandler} color={colors.primary} />
//           <Button
//             title={`Switch to ${lang === "he" ? "English" : "Hebrew"}`}
//             onPress={toggleLanguage}
//             color={colors.secondary}
//           />
//         </View>
//       )}

//       {isTextSaved && selectedText.text.length > 0 && (
//         <Button
//           title={isSelectionUsed() ? "Selection already used" : `Use: ${selectedText.text}`}
//           disabled={isSelectionUsed()}
//           onPress={showDialog}
//           color={colors.primary}
//         />
//       )}

//       <Portal>
//         <Dialog
//           style={{ backgroundColor: colors.myBeige }}
//           visible={portalVisible}
//           onDismiss={hideDialog}
//         >
//           <Dialog.Title>{currentSentence.text}</Dialog.Title>
//           <Dialog.Content>
//             <TextInput
//               style={styles.dialogInput}
//               placeholder="Write here the explanation"
//               value={explanation}
//               onChangeText={setExplanation}
//               multiline
//             />
//           </Dialog.Content>
//           <Dialog.Actions>
//             <Button title="Save" onPress={saveSentence} color={colors.primary} />
//           </Dialog.Actions>
//           <Dialog.Actions>
//             <Button title="Close" onPress={hideDialog} color={colors.primary} />
//           </Dialog.Actions>
//         </Dialog>
//       </Portal>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     height: "100%",
//   },
//   card: {
//     margin: 20,
//     paddingVertical: 30,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//   },
//   textInput: {
//     height: 150,
//     borderWidth: 1,
//     borderRadius: 10,
//     padding: 10,
//     fontSize: 18,
//   },
//   buttons: {
//     marginTop: 20,
//     flexDirection: "row",
//     justifyContent: "space-around",
//   },
//   dialogInput: {
//     height: 100,
//     borderWidth: 1,
//     borderRadius: 10,
//     padding: 10,
//     fontSize: 16,
//     marginTop: 10,
//     borderColor: "#ccc",
//   },
// });

// export default CreateVocabulary;
