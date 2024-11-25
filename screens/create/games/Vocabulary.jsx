import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { Card, useTheme } from "react-native-paper";

const CreateVocabulary = () => {
  const { colors } = useTheme();
  const [text, setText] = useState({ he: "", en: "" });
  const [lang, setLang] = useState("he");

  const screenStyle = { backgroundColor: colors.myBeige };

  const saveHandler = () => {
    console.log(`Saving text: ${text[lang]} for language: ${lang}`);
    // Save to database logic goes here
  };

  const changeHandler = (newText) => {
    setText((prevText) => ({ ...prevText, [lang]: newText }));
  };

  const toggleLanguage = () => {
    setLang((prevLang) => (prevLang === "he" ? "en" : "he"));
  };


  return (
    <View style={[styles.screen, screenStyle]}>
      <Card style={[styles.card, { backgroundColor: colors.myOrange }]}>
        <TextInput
          style={[
            styles.textInput,
            {
              textAlign: lang === "he" ? "right" : "left",
              borderColor: colors.primary,
            },
          ]}
          value={text[lang]}
          onChangeText={changeHandler}
          placeholder={`${
            lang === "he" ? "הקלד טקסט בעברית" : "Enter text in English"
          }`}
          multiline
        />
      </Card>
      <View style={styles.buttons}>
        <Button title="Save" onPress={saveHandler} color={colors.primary} />
        <Button
          title={`Switch to ${lang === "he" ? "English" : "Hebrew"}`}
          onPress={toggleLanguage}
          color={colors.secondary}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
  },
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
    borderBottomColor: "blue",
  },
  highlightedText: {
    color: "blue",
    fontWeight: "bold",
  },
});

export default CreateVocabulary;
