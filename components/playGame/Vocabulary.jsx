import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Dialog, Portal, Button, useTheme } from "react-native-paper";

const PlayVocabulary = (props) => {
    const {colors} = useTheme();
  const { game } = props;
  const { text, hardSentences } = game;

  // Create a map for easy lookup of explanations
  const sentenceMap = hardSentences.reduce((map, item) => {
    map[item.sentence] = item.explanation;
    return map;
  }, {});

  // Split the text into words
  const words = text.split(/(\s+)/); // Split by spaces, keeping the spaces

  // State to manage Dialog visibility and content
  const [visible, setVisible] = useState(false);
  const [currentExplanation, setCurrentExplanation] = useState("");
  const [currentWord, setCurrentWord] = useState("");

  // Functions to show and hide the Dialog
  const showDialog = (word, explanation) => {
    setCurrentWord(word);
    setCurrentExplanation(explanation);
    setVisible(true);
  };
  const hideDialog = () => {
    setVisible(false);
  };

  return (
    <Card style={[styles.card, {backgroundColor: colors.myOrange}]}>
      <View style={styles.textContainer}>
        {words.map((word, index) => {
          // Check if the word is in the sentenceMap
          const explanation = sentenceMap[word];

          return (
            <TouchableOpacity
              key={index}
              onPress={() => explanation && showDialog(word, explanation)}
              disabled={!explanation} // Disable press if no explanation
            >
              <Text
                style={[
                  styles.text,
                  explanation && styles.highlightedText, // Apply highlighted style if explanation exists
                ]}
              >
                {word}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Dialog for displaying explanations */}
      <Portal>
        <Dialog style={{backgroundColor: colors.myBeige}} visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>{currentWord}</Dialog.Title>
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
  highlightedText: {
    textDecorationLine: "underline",
  },
});

export default PlayVocabulary;
