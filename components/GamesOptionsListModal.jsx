import React from "react";
import {
  Modal,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { Card, Title, useTheme, TouchableRipple } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

const GameOptionsListModal = ({ isVisible, onClose, onCardPress }) => {
  const { colors } = useTheme();

  const cards = [
    { title: "Trivia", icon: "quiz", navigateTo: "yyy" },
    { title: "True/False", icon: "check-circle", navigateTo: "yyy" },
    { title: "Vocabulary", icon: "text-fields", navigateTo: "yyy" },
  ];

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.modalContent}
            >
              {cards.map((card, index) => (
                <TouchableRipple
                  key={index}
                  onPress={() => onCardPress(card.navigateTo)}
                  rippleColor={colors.myGreen}
                  style={styles.cardContainer}
                >
                  <Card style={[styles.card, { backgroundColor: colors.myGray }]}>
                    <Card.Content style={styles.cardContent}>
                      <MaterialIcons
                        name={card.icon}
                        size={40}
                        color={colors.myOrange}
                      />
                      <Title style={styles.cardTitle}>{card.title}</Title>
                    </Card.Content>
                  </Card>
                </TouchableRipple>
              ))}
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default GameOptionsListModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  cardContainer: {
    marginVertical: 10,
    width: "100%",
  },
  card: {
    borderRadius: 10,
    elevation: 4, // For shadow effect on Android
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 18,
    color: "white",
    marginLeft: 10,
  },
});
