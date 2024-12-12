import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Dialog, Portal, useTheme } from "react-native-paper";
import { useLanguage } from "../context/LanguageContext";

const PlayVocabulary = (props) => {
  const { colors } = useTheme();
  // const { game } = props;
  // const { text, hardSentences } = game;
  const [game, setGame] = useState({
    he: {
      text: "זה משפט מאד ארוך ומסובך בעברית שמעניין מה האורך שלו",
      hardSentences: [
        {
          sentence: "מאד ארוך",
          start: 8,
          end: 16,
          explanation: "הסבר למאד ארוך",
        },
        {
          sentence: "מסובך",
          start: 17,
          end: 23,
          explanation: "הסבר למסובך",
        },
      ],
    },
    en: {
      text: "This is a very long and complicated sentence in English",
      hardSentences: [
        {
          sentence: "very long",
          start: 10,
          end: 19,
          explanation: "This phrase emphasizes length.",
        },
        {
          sentence: "complicated",
          start: 24,
          end: 35,
          explanation: "This means 'difficult to understand'.",
        },
      ],
    },
  });
  const { locale } = useLanguage();
  const [text, setText] = useState(game[locale].text);
  const [hardSentences, setHardSentences] = useState(
    game[locale].hardSentences
  );
  useEffect(() => {
    setText(game[locale].text);
    setHardSentences(game[locale].hardSentences);
  }, [locale]);

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

    hardSentences.forEach(({ sentence, start, end, explanation }, index) => {
      // Add non-underlined text before the range
      if (start > prevEnd) {
        elements.push(
          <Text key={`plain-${index}`} style={styles.text}>
            {text.slice(prevEnd, start)}
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
          {text.slice(start, end)}
        </Text>
      );

      prevEnd = end;
    });

    // Add remaining text after the last range
    if (prevEnd < text.length) {
      elements.push(
        <Text key={`plain-last`} style={styles.text}>
          {text.slice(prevEnd)}
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
