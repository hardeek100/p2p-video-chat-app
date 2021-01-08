import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, SafeAreaView } from "react-native";

import styles from "../Styles/styles";
import { v4 as uuidv4 } from "uuid";

const Login = ({ navigation }) => {
  const [UID, setUID] = useState("");
  const [roomID, setRID] = useState("");

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.loginbox}>
          <View style={styles.userInfo}>
            <Text> User ID: </Text>
            <TextInput
              style={styles.textbox}
              onChangeText={(text) => {
                setUID(text);
              }}
              value={UID}
            />
            <Text> Room ID: </Text>
            <TextInput
              style={styles.textbox}
              onChangeText={(text) => {
                setRID(text);
              }}
              value={roomID}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Button
              title="Random IDs"
              color="#f05454"
              onPress={() =>
                navigation.navigate("Room", {
                  userID: uuidv4(),
                  roomID: uuidv4(),
                })
              }
            />
            <Button
              title="Join Room"
              color="#cae4db"
              onPress={() =>
                UID && roomID
                  ? navigation.navigate("Room", { userID: UID, roomID: roomID })
                  : null
              }
            />
       
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
