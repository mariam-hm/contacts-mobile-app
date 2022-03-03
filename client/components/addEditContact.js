import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button, Modal } from "react-native";
import RadioButton from "radio-buttons-react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

//export default function AddEditContact({ addContact, editContact, intialValues }) {
export default function AddEditContact({
  contactID,
  addContact,
  editContact,
  btnTitle,
  intialValues,
}) {
  const [state, setState] = useState(intialValues);
  const [modalOpen, setModalOpen] = useState(false);

  const genders = [{ label: "M" }, { label: "F" }, { label: "X" }];

  const submitForm = () => {
    contactID ? editContact(contactID, state) : addContact(state);
    setModalOpen(false);
    setState({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      age: null,
      city: "",
      gender: "",
    });
  };

  return (
    <View>
      <Modal visible={modalOpen} style={styles.container} animationType="slide">
        <View>
          <TextInput
            style={styles.input}
            placeholder="First name"
            value={state.firstName}
            onChangeText={(firstName) => setState({ ...state, firstName })}
          />
          <TextInput
            style={styles.input}
            placeholder="Last name"
            value={state.lastName}
            onChangeText={(lastName) => setState({ ...state, lastName })}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={state.email}
            onChangeText={(email) => setState({ ...state, email })}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            keyboardType="numeric"
            value={state.phoneNumber}
            onChangeText={(phoneNumber) => setState({ ...state, phoneNumber })}
          />
          <TextInput
            style={styles.input}
            placeholder="Age"
            keyboardType="numeric"
            value={state.age}
            onChangeText={(age) => setState({ ...state, age: age })}
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            value={state.city}
            onChangeText={(city) => setState({ ...state, city })}
          />
          <RadioButton
            data={genders}
            selectedBtn={(e) => setState({ ...state, gender: e.label })}
          />

          <Button title={btnTitle} color="coral" onPress={submitForm} />

          <Button
            title="Close"
            color="coral"
            onPress={() => {
              setModalOpen(false);
            }}
          />
        </View>
        <Toast />
      </Modal>

      <Button
        title={btnTitle}
        color="coral"
        onPress={() => setModalOpen(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
