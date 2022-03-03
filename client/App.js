import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TextInput, View, Button } from "react-native";
import Toast from "react-native-toast-message";

import Header from "./components/header";
import ContactItem from "./components/contactItem";
import AddEditContact from "./components/addEditContact";

export default function App() {
  const ngrokDomain = "http://fb50-45-2-224-224.ngrok.io";

  const fetchContacts = () => {
    axios
      .get(`${ngrokDomain}/api/contacts`)
      .then((res) => {
        setContacts(res.data.data.contacts);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchContacts();
  }, [contacts]);

  const formInitValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    age: null,
    city: "",
    gender: "",
  };

  const showToast = (type, msg) => {
    Toast.show({
      type: type,
      text1: type,
      text2: msg,
    });
  };

  // ====================================== STATES =========================================

  const [contacts, setContacts] = useState([]);

  const [inputSearch, setInputSearch] = useState("");

  const [sortName, setSortName] = useState(false);
  const [sortAge, setSortAge] = useState(false);

  // ====================================== SORTING FILTERING =========================================

  const sortByName = (contacts) => {
    return contacts.sort((contact1, contact2) => {
      if (contact1.firstName.toLowerCase() < contact2.firstName.toLowerCase()) {
        return -1;
      }
      if (contact1.firstName.toLowerCase() > contact2.firstName.toLowerCase()) {
        return 1;
      }
      return 0;
    });
  };

  const sortByAge = (contacts) => {
    return contacts.sort((contact1, contact2) => contact1.age - contact2.age);
  };

  const filterSearch = (contacts) => {
    return contacts.filter((contact) => {
      let name = (contact.firstName + " " + contact.lastName).toLowerCase();
      return name.includes(inputSearch.toLowerCase());
    });
  };

  const applyFilters = (contacts) => {
    let newContacts = [...contacts];

    if (sortName) {
      newContacts = sortByName(newContacts);
    }
    if (sortAge) {
      newContacts = sortByAge(newContacts);
    }

    newContacts = filterSearch(newContacts);

    return newContacts;
  };

  // ====================================== CRUD OPERATIONS =========================================

  const addContact = async (contactInfo) => {
    try {
      const res = await axios.post(`${ngrokDomain}/api/contacts`, contactInfo);
      console.log(res.data.data.contact);
      // Update contact list
      fetchContacts();
      // Display Message
      showToast("success", "Contact added succesfully!");
    } catch (err) {
      showToast("error", err.response.data.message);
    }
  };

  const editContact = async (id, contactInfo) => {
    console.log(contactInfo);
    try {
      await axios.patch(`${ngrokDomain}/api/contacts/${id}`, contactInfo);

      fetchContacts();

      showToast("success", "Contact edited!");
    } catch (err) {
      showToast("error", err.response.data.message);
    }
  };

  const deleteContact = async (contactID) => {
    try {
      await axios.delete(`${ngrokDomain}/api/contacts/${contactID}`);

      fetchContacts();

      showToast("success", "Contact deleted!");
    } catch (err) {
      showToast("error", err.response.data.message);
    }
  };

  // ====================================== RETURN STATEMENT =========================================

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <AddEditContact
          addContact={addContact}
          btnTitle={"Add contact"}
          intialValues={formInitValues}
        />

        <TextInput
          style={styles.input}
          placeholder="Search..."
          value={inputSearch}
          onChangeText={(val) => setInputSearch(val)}
        />

        <View style={styles.sortButtons}>
          <Button
            title="Sort by name "
            color={sortName ? "blue" : "coral"}
            onPress={() => setSortName(!sortName)}
          />

          <Button
            title="Sort by age "
            color={sortAge ? "blue" : "coral"}
            onPress={() => setSortAge(!sortAge)}
          />
        </View>

        <View style={styles.list}>
          <FlatList
            keyExtractor={(item) => item._id}
            data={applyFilters(contacts)}
            renderItem={({ item }) => (
              <ContactItem
                item={item}
                editContact={editContact}
                deleteContact={deleteContact}
              />
            )}
          />
        </View>
      </View>

      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    padding: 40,
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  sortButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
  },
});
