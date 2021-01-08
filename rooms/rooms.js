
import React, { useEffect, useState } from "react";
import { View, Text, Button, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import styles from "../Styles/styles";

import Peer from "peerjs";
import io from "socket.io-client";

const ENDPOINT = "localhost:3000";
const socket = io(ENDPOINT, { withCredentials: true });


const localVideo = React.createRef();
const remoteVideo = React.createRef();


// const Video = ({ stream }) => {
//   const remoteVideo = React.createRef();
//   useEffect(() => {
//     remoteVideo.current ? (remoteVideo.current.srcObject = stream) : null;
//   }, [stream, remoteVideo]);

//   return (
//     <View >
//       <video ref={remoteVideo} autoPlay />
//       <Text> user: {stream.id} </Text>
//     </View>
//   );
// };


const Room = ({ navigation, route }) => {
  const [userID, setUID] = useState(route.params.userID);
  const [roomID, setRID] = useState(route.params.roomID);
  const [peerID, setPID] = useState("");
  const [status, setStatus] = useState("red");

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState("Welcome to room: ");
 
  socket.on("message", (userID, msg) => {
    setMessages(messages + "\n" + userID + " : " + msg);
  });

  socket.on("user-disconnected", (data) => {
    setMessages(messages + "\n" + data + " disconnected!!");

  })

  function sendMsg(msg) {
    setMessages(messages + "\n" + userID + " : " + msg);
    setMessage("");
    socket.emit("sendmessage", roomID, userID, msg);
  }


  var peer = new Peer();

  useEffect(() => {
    peer.on("open", (id) => {
      console.log("PeerID: ", id);
      setPID(id);
      setStatus("green");
      socket.emit("joinRoom", roomID, userID, id);
    });
  }, []);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((localStream) => {
      localVideo.current.srcObject = localStream;

      socket.on("user-connected", (data) => {
        const remoteUserID = data[0];
        const remotePeerID = data[1];

        setMessages(messages + "\n" + remoteUserID + " joined!");
        var call = peer.call(remotePeerID, localStream);

        call.on("stream", (remoteStream) => {
          remoteVideo.current.srcObject = remoteStream;
          
        });
      });

      peer.on("call", (call) => {
        call.answer(localStream);
        call.on("stream", (remoteStream) => {
      
          remoteVideo.current.srcObject = remoteStream;
        });
      });
    });
  }, []);

  

  return (
    <SafeAreaView>
    
        
    <View id="backGround" style={styles.container}>
      <Text>Room : {roomID} </Text>
      <View id="twopart" style={styles.container1}>
        <View id="otherVideo" style={styles.otherVideo}>
        
         <video style ={{height: 300, width: 300}} ref = {remoteVideo} autoPlay />
           
          
        </View>
        <View id="myside" style={styles.container2}>
          <View>
            <video
              style={{ height: 300, width: 300 }}
              ref={localVideo}
              autoPlay
            />
            {/* <MyVideo /> */}
            <Text>User ID: {userID} </Text>
          </View>
          <View id="userControls" style={styles.container3}>
            <View id="buttons" style={styles.container4}>
              {/* <View style={styles.inviteButton}>
                <Button title="Invite" />
              </View>
              <View style={styles.leaveButton}>
                <Button title="leave" />
              </View>
              <View style={styles.muteButton}>
                <Button title="mute" />
              </View> */}
              <View>
                <TouchableOpacity style={{ backgroundColor: status }}>
                  <Text>****Status****</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View id="messageView" style={styles.chatbox}>
              <Text>{messages}</Text>
            </View>

            <View id="userInput" style={styles.container5}>
              <TextInput
                style={{width: 250}}
                onChangeText={(text) => setMessage(text)}
                value={message}
                placeholder={"Type your message here..."}
              />

              <Button title="Send" onPress={() => sendMsg(message)} />
              
            </View>
          </View>
        </View>
      </View>
    </View>

    {/* <View >
          {
             streams.map((s) => {
               <Video key = {s.id} stream = {s} />
             })
           }

        </View> */}
    </SafeAreaView>
  );
};

export default Room;
