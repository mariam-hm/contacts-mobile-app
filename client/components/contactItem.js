import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Button,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AddEditContact from "./addEditContact";

export default function contactItem({ item, editContact, deleteContact }) {
  const intialValues = {
    firstName: item.firstName,
    lastName: item.lastName,
    email: item.email,
    phoneNumber: item.phoneNumber,
    age: item.age.toString(),
    city: item.city,
    gender: item.gender,
    image: item.image,
  };

  return (
    <View>
      <View style={styles.item}>
        <Text style={styles.name}>
          {item.firstName} {item.lastName}
        </Text>

        <Image source={{ uri: item.image }} />

        <View>
          <Text>Age: {item.age.toString()}</Text>
          <Text>Email: {item.email}</Text>
          <Text>Phone: {item.phoneNumber}</Text>
          <Text>Gender: {item.gender}</Text>
          <Text>City: {item.city}</Text>
        </View>

        <View style={styles.buttons}>
          <AddEditContact
            contactID={item._id}
            editContact={editContact}
            btnTitle={"Edit"}
            intialValues={intialValues}
          />
          <Button
            title="Delete"
            color="coral"
            onPress={() => deleteContact(item._id)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "column",
    padding: 16,
    marginTop: 16,
    borderColor: "#bbb",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
  },
  name: {
    fontSize: 20,
  },
  buttons: {
    flex: 1,
    flexDirection: "column",
  },
});
