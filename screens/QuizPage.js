import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
  Switch,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";

const QuizPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);
  const [answers, setAnswers] = useState([
    "Tap to add question",
    "Add answer",
    "Add answer",
    "Add answer (optional)",
    "Add answer (optional)",
  ]);
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [timeLimitModalVisible, setTimeLimitModalVisible] = useState(false);
  const [timeLimit, setTimeLimit] = useState(20);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const timeLimits = [5, 10, 20, 30, 45, 60, 90, 120, 180, 240];

  const openTimeLimitModal = () => setTimeLimitModalVisible(true);

  const selectTimeLimit = (limit) => {
    setTimeLimit(limit);
    setTimeLimitModalVisible(false);
  };
  const MAX_CHARS = 75;

  const getButtonColor = (index) => {
    switch (index) {
      case 0:
        return "orange";
      case 1:
        return "#E74C3C";
      case 2:
        return "#3498DB";
      case 3:
        return "#FFCC00";
      case 4:
        return "#27AE60";
      default:
        return "#E74C3C";
    }
  };

  const openModal = (index) => {
    setSelectedButtonIndex(index);
    if (index > 0) {
      setCurrentAnswer(
        answers[index].startsWith("Add answer") ? "" : answers[index]
      );
    } else {
      setCurrentAnswer(
        answers[index].startsWith("Tap to add question") ? "" : answers[index]
      );
    }
    setModalVisible(true);
  };

  const handleModalClose = () => {
    if (currentAnswer.trim()) {
      const newAnswers = [...answers];
      newAnswers[selectedButtonIndex] = currentAnswer
        .trim()
        .slice(0, MAX_CHARS);
      setAnswers(newAnswers);
    }
    setModalVisible(false);
    setCurrentAnswer("");
    setSelectedButtonIndex(null);
  };

  const getButtonStyle = (index) => {
    switch (index) {
      case 0:
        return styles.questionBox;
      case 1:
        return styles.redBox;
      case 2:
        return styles.blueBox;
      case 3:
        return styles.yellowBox;
      case 4:
        return styles.greenBox;
      default:
        return styles.redBox;
    }
  };

  const translateX = useRef(new Animated.Value(0)).current;

  const onGestureEvent = (event) => {
    const { translationX: gestureTranslationX } = event.nativeEvent;
    translateX.setValue(gestureTranslationX);
  };

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === 4) { // Active state
      const { translationX } = event.nativeEvent;
  
      // Reset animation position
      translateX.setValue(0);
  
      // Handle swipe based on translation distance
      if (translationX < -100 && currentQuestionIndex < answers.length - 1) {
        // Swipe left
        setCurrentQuestionIndex(prev => prev + 1);
      } else if (translationX > 100 && currentQuestionIndex > 0) {
        // Swipe right
        setCurrentQuestionIndex(prev => prev - 1);
      }
    }
  };

  return (
    // <PanGestureHandler
    //   onGestureEvent={onGestureEvent}
    //   onHandlerStateChange={onHandlerStateChange}
    // >
      <View style={styles.container}>
        {/* Top Section */}
        <View style={styles.header}>
          <TouchableOpacity onPress={openTimeLimitModal}>
            <Text style={styles.timer}>{timeLimit} sec</Text>
          </TouchableOpacity>
        </View>

        {/* Answer Boxes */}
        <Animated.View
          style={[
            styles.answersContainer,
            {
              transform: [{ translateX }],
            },
          ]}
        >
          {answers.map((answer, index) => (
            <TouchableOpacity
              key={index}
              style={getButtonStyle(index)}
              onPress={() => openModal(index)}
            >
              <Text style={styles.text} numberOfLines={2}>
                {answer}
              </Text>
              {correctAnswer.includes(index) && (
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color="green"
                  style={styles.checkIcon}
                />
              )}
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Modal question answer*/}
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleModalClose}
          animationType="fade"
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={handleModalClose}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
              style={[
                styles.modalContent,
                selectedButtonIndex !== null && {
                  backgroundColor: getButtonColor(selectedButtonIndex),
                },
              ]}
            >
              <Text style={styles.characterCountText}>
                {MAX_CHARS - currentAnswer.length}
              </Text>
              <TextInput
                style={styles.input}
                value={currentAnswer}
                onChangeText={setCurrentAnswer}
                placeholderTextColor="#666"
                multiline
                maxLength={MAX_CHARS}
                autoFocus={true}
              />
            </TouchableOpacity>

            {/* Correct Answer Toggle */}
            {selectedButtonIndex > 0 && (
              <TouchableOpacity
                style={styles.correctAnswerContainer}
                onPress={() =>
                  setCorrectAnswer((prev) =>
                    prev.includes(selectedButtonIndex)
                      ? prev.filter((val) => val !== selectedButtonIndex)
                      : [...prev, selectedButtonIndex]
                  )
                }
              >
                <Text style={styles.correctAnswerText}>Correct answer</Text>
                <Switch
                  value={correctAnswer.includes(selectedButtonIndex)}
                  thumbColor="#fff"
                  trackColor={{ false: "#767577", true: "#34C759" }}
                />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        </Modal>

        {/* Time Limit Modal */}
        <Modal
          transparent={true}
          visible={timeLimitModalVisible}
          onRequestClose={() => setTimeLimitModalVisible(false)}
          animationType="fade"
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setTimeLimitModalVisible(false)}
          >
            <View style={styles.timeLimitModalContent}>
              <Text style={styles.modalTitle}>Time limit</Text>
              <View style={styles.timeLimitOptions}>
                {timeLimits.map((limit) => (
                  <TouchableOpacity
                    key={limit}
                    style={[
                      styles.timeLimitButton,
                      timeLimit === limit && styles.selectedTimeLimit,
                    ]}
                    onPress={() => selectTimeLimit(limit)}
                  >
                    <Text style={styles.timeLimitText}>{limit} sec</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    // </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  timer: {
    backgroundColor: "#8E44AD",
    color: "#FFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalOverlay: {
    // flex: 1,
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    // justifyContent: "center",
    // alignItems: "center",
    // padding: 20,
  },
  timeLimitModalContent: {
    // backgroundColor: "#FFF",
    // borderRadius: 8,
    // padding: 20,
    // width: "80%",
    // alignItems: "center",
  },
  addMedia: {
    alignItems: "center",
    marginBottom: 20,
  },
  addMediaText: {
    color: "#555",
    fontSize: 18,
    fontWeight: "600",
  },
  question: {
    textAlign: "center",
    fontSize: 18,
    color: "#333",
    marginBottom: 20,
  },
  answersContainer: {
    flex: 2,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  redBox: {
    backgroundColor: "#E74C3C",
    padding: 15,
    borderRadius: 8,
    width: "48%",
    minHeight: 120,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  blueBox: {
    backgroundColor: "#3498DB",
    padding: 15,
    borderRadius: 8,
    width: "48%",
    minHeight: 120,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  yellowBox: {
    backgroundColor: "#FFCC00",
    padding: 15,
    borderRadius: 8,
    width: "48%",
    minHeight: 120,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  greenBox: {
    backgroundColor: "#27AE60",
    padding: 15,
    borderRadius: 8,
    width: "48%",
    minHeight: 120,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  questionBox: {
    backgroundColor: "orange",
    padding: 15,
    borderRadius: 8,
    minHeight: 80,
    width: "100%",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#FFF",
    fontWeight: "600",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "48%",
    minHeight: 60,
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  characterCountText: {
    color: "#FFF",
    fontSize: 14,
    width: "100%",
    textAlign: "right",
    borderColor: "#fff",
    fontWeight: "500",
  },
  input: {
    width: "100%",
    textAlign: "center",
    color: "#fff",
  },
  correctAnswerContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "70%",
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  correctAnswerText: {
    fontWeight: "600",
  },
  checkIcon: {
    position: "absolute",
    top: 5,
    right: 5,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  timeLimitOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    textAlign: "center",
  },
  timeLimitButton: {
    width: "40%",
    height: 50,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "#ccc",
    borderRadius: 8,
  },
  selectedTimeLimit: { backgroundColor: "#8E44AD" },
  timeLimitText: { color: "#000", fontWeight: "bold" },
  doneButton: {
    marginTop: 20,
    backgroundColor: "#3498DB",
    padding: 10,
    borderRadius: 8,
  },
  doneButtonText: { color: "#FFF", fontWeight: "bold" },
});

export default QuizPage;
