import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Dialog, Portal, useTheme } from "react-native-paper";
import { useLanguage } from "../context/LanguageContext";

const PlayVocabulary = (props) => {
  const { colors } = useTheme();
  const { game } = props;
  const { text, hardSentences } = game;
  const { locale } = useLanguage();

  const [visible, setVisible] = useState(false);
  const [currentExplanation, setCurrentExplanation] = useState("");
  const [currentSentence, setCurrentSentence] = useState("");

  const showDialog = (sentence, explanation) => {
    setCurrentSentence(sentence);
    setCurrentExplanation(explanation);
    setVisible(true);
  };

  const hideDialog = () => {
    setVisible(false);
  };

  const renderTextWithUnderline = () => {
    let elements = [];
    let prevEnd = 0;

    hardSentences[locale].forEach(({ sentence, start, end, explanation }, index) => {
      // Add non-underlined text before the range
      if (start > prevEnd) {
        elements.push(
          <Text key={`plain-${index}`} style={styles.text}>
            {text[locale].slice(prevEnd, start)}
          </Text>
        );
      }

      // Add the underlined, pressable text
      elements.push(
        <Text
          key={`underline-${index}`}
          style={[styles.text, styles.highlightedText]}
          onPress={() => showDialog(sentence, explanation)}
        >
          {text[locale].slice(start, end)}
        </Text>
      );

      prevEnd = end;
    });

    // Add remaining text after the last range
    if (prevEnd < text[locale].length) {
      elements.push(
        <Text key={`plain-last`} style={styles.text}>
          {text[locale].slice(prevEnd)}
        </Text>
      );
    }

    return elements;
  };

  return (
    <Card style={[styles.card, { backgroundColor: colors.myOrange }]}>
      <View style={styles.textContainer}>
        <Text
          style={{
            textAlign: locale === "he" ? "right" : "left",
            writingDirection: locale === "he" ? "rtl" : "ltr",
          }}
        >
          {renderTextWithUnderline()}
        </Text>
      </View>

      {/* Dialog for displaying explanations */}
      <Portal>
        <Dialog
          style={{ backgroundColor: colors.myBeige }}
          visible={visible}
          onDismiss={hideDialog}
        >
          <Dialog.Title
            style={{
              textAlign: locale === "he" ? "right" : "left",
              writingDirection: locale === "he" ? "rtl" : "ltr",
            }}
          >
            {currentSentence}
          </Dialog.Title>
          <Dialog.Content>
            <Text
              style={{
                textAlign: locale === "he" ? "right" : "left",
                writingDirection: locale === "he" ? "rtl" : "ltr",
              }}
            >
              {currentExplanation}
            </Text>
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
