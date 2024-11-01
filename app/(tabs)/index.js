import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Platform } from "react-native";
import { Image } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { Picker } from "@react-native-picker/picker";

export default function HomeScreen() {
  const [userName, setUserName] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [quantity, setQuantity] = useState("");

  const items = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
  ];

  const handleGeneratePDF = async () => {
    const html = `
      <html>
        <body>
          <h1>Ticket</h1>
          <p>Name: ${userName}</p>
          <p>Item: ${selectedItem}</p>
          <p>Quantity: ${quantity}</p>
        </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({ html });
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/majnoun.png")}
          style={styles.reactLogo}
        />
      }
    >
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Input One"
          value={userName}
          onChangeText={setUserName}
        />

        <Picker
          selectedValue={selectedItem}
          style={styles.input}
          onValueChange={(itemValue) => setSelectedItem(itemValue)}
        >
          {items.map((item) => (
            <Picker.Item key={item.id} label={item.name} value={item.name} />
          ))}
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Enter quantity"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />

        <Button title="Save as PDF Ticket" onPress={handleGeneratePDF} />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    paddingLeft: 10,
  },
  reactLogo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
