import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import EditLevelBox from "./EditLevelBox";
import { ActivityIndicator, Button, TextInput, useTheme } from "react-native-paper";

const LevelActionModal = ({ isVisible, onClose, onSave, levelData }) => {
  if (!levelData) return null;

  const { colors } = useTheme();
  const [heTitle, setHeTitle] = useState(levelData.name.title["he"]);
  const [enTitle, setEnTitle] = useState(levelData.name.title["en"]);
  const [heDescription, setHeDescription] = useState(
    levelData.name.description["he"]
  );
  const [enDescription, setEnDescription] = useState(
    levelData.name.description["en"]
  );
  const [icon, setIcon] = useState(levelData.icon.name);
  const [isSaving, setIsSaving] = useState(false);

  const textInputStyle = {
    colors: {
      primary: colors.myGreen,
      text: colors.myGreen,
      placeholder: colors.myGreen,
    },
  };

  const handleSave = () => {
    setIsSaving(true);
    const updatedData = {
      name: {
        title: { he: heTitle, en: enTitle },
        description: { he: heDescription, en: enDescription },
      },
      icon: { name: icon, color: "white" },
    };

    setTimeout(() => {
      onSave(updatedData);
      setIsSaving(false);
    }, 1000);
  };

  const handleCancel = () => {
    setEnDescription(null);
    setEnTitle(null);
    setHeDescription(null);
    setHeTitle(null);
    setIcon(null);
    onClose();
  };

  useEffect(() => {
    setHeTitle(levelData.name.title["he"]);
    setEnTitle(levelData.name.title["en"]);
    setHeDescription(levelData.name.description["he"]);
    setEnDescription(levelData.name.description["en"]);
    setIcon(levelData.icon.name);
  }, [levelData]);

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalOverlay}
      >
        <ScrollView contentContainerStyle={styles.modalScrollContent}>
          <View style={styles.modalContent}>
            <EditLevelBox
              title={enTitle}
              content={enDescription}
              icon={icon}
              locked={!levelData.hasGame}
            />
            <EditLevelBox
              title={heTitle}
              content={heDescription}
              icon={icon}
              locked={!levelData.hasGame}
            />
            <TextInput
              label="Hebrew Title"
              value={heTitle}
              onChangeText={(title) => setHeTitle(title)}
              style={styles.textInput}
              theme={textInputStyle}
            />
            <TextInput
              label="English Title"
              value={enTitle}
              onChangeText={(title) => setEnTitle(title)}
              style={styles.textInput}
              theme={textInputStyle}
            />
            <TextInput
              label="Hebrew Description"
              value={heDescription}
              onChangeText={(desc) => setHeDescription(desc)}
              style={styles.textInput}
              multiline
              theme={textInputStyle}
            />
            <TextInput
              label="English Description"
              value={enDescription}
              onChangeText={(desc) => setEnDescription(desc)}
              style={styles.textInput}
              multiline
              theme={textInputStyle}
            />
            <TextInput
              label="Icon Name"
              value={icon}
              onChangeText={(iconName) => setIcon(iconName)}
              style={styles.textInput}
              theme={textInputStyle}
            />
            <Button
              mode="text"
              onPress={handleSave}
              disabled={isSaving}
              textColor={colors.myGreen}
              style={styles.modalButton}
              icon={() => (
                <MaterialIcons name="save" size={20} color={colors.myGreen} />
              )}
            >
              {isSaving ? (
                <ActivityIndicator
                  animating={true}
                  color={colors.myGreen}
                  size="small"
                />
              ) : (
                <Text style={styles.modalButtonText}>Save</Text>
              )}
            </Button>
            <Button
              mode="text"
              onPress={handleCancel}
              textColor={colors.myGreen}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>Cancle</Text>
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalScrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
    padding: 20,
    marginVertical: 40,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalButton: {
    width: "80%",
    marginVertical: 8,
  },
  modalButtonText: {
    fontSize: 16,
  },
  textInput: {
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "white",
    fontSize: 16,
  },
});

export default LevelActionModal;
