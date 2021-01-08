import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffe6e6",

    justifyContent: "center",
    alignItems: "center",
  },
  container1: {
    backgroundColor: "#cfdac8",

    flexDirection: "row",
  },
  container2: {
    backgroundColor: "#a685e2",

    flexDirection: "column",
  },
  container3: {
    flexDirection: "column",
    backgroundColor: "#ffe5b9",
  },
  container4: {
    flexDirection: "row",
  },
  container5: {
    flexDirection: "row",
  },
  otherVideo: {
    backgroundColor: "dddddd",
    height: 720,
    width: 800,
    flexDirection: "row",
  },
  myVideo: {
    position: "absolute",
  },
  chatbox: {
    flexDirection: "column",
    backgroundColor: "#f3f2da",
    height: 300,
    width: 300,
  },
  inviteButton: {},
  leaveButton: {},

  chatmessages: {},
  textbox: {
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
  },
  sendButton: {},
});

export default styles;
