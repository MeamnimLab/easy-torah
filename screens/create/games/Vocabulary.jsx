import PlayVocabulary from "@/components/playGame/Vocabulary";
import useHttp from "@/hooks/http";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useState } from "react";
import { View, StyleSheet, TextInput, ScrollView, Text } from "react-native";
import { Button, Card, Dialog, Portal, useTheme } from "react-native-paper";

const CreateVocabulary = ({ route, navigation }) => {
  const {subLevelId} = route.params;
  console.log(subLevelId)
  const { colors } = useTheme();
  const [text, setText] = useState({ he: "", en: "" });
  const { sendRequest: postVocabulary } = useHttp();
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

  const submitHandler = () => {
    const body = {
      text: {}, hardSentences: {}
    }
    const url = `https://easy-torah-production.up.railway.app/api/game/vocabulary/${subLevelId}`;

    if (finalText.he.text.length > 0){
      body.text.he = finalText.he.text;
      body.hardSentences.he = finalText.he.hardSentences;
    }
    if (finalText.en.text.length > 0){
      body.text.en = finalText.en.text;
      body.hardSentences.en = finalText.en.hardSentences;
    }

    if(!(body.text.he || body.text.en)){
      // alert
      return;
    }

    console.log(body)
    console.log(url)

    postVocabulary(
      {
        url,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      },
      (response) => {
        console.log("response")
        console.log(response)
        navigation.navigate("SubLevelGamesOfCreate", {subLevelId})
      }
    );
    

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

      {preview && (<PlayVocabulary game={{text: {he: finalText.he.text, en: finalText.en.text}, hardSentences: {he: finalText.he.hardSentences, en: finalText.en.hardSentences}}}/>)}

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
      {isTextSaved && (
        <Button onPress={submitHandler}>Submit
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