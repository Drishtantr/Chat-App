<template>
  <div class="hello">
    <table class="table">
      <tbody>
        <tr>
          <td v-if="status == false">
            <h2>LogIn {{pickColour}}</h2>
            <h4>Enter your name and I'll direct you to the chat page.</h4>
            <input type="text" id="fname" v-model="username" v-on:keyup.enter="addItem()" name="fname">
            <button @click="addItem()">Enter Chat</button>
          </td>
          <td v-if="status">
              <b-card-text>{{welcomeMessage}} {{username}} Room no. 101 </b-card-text>
              <ul id="example-1" class="receiver">
                <li v-for="message in liveMessages.messages" :key="message.small">
                  <p v-bind:style="{color: pickColour }" variant="primary" class ="message">{{ message.small }}</p>
                </li>
              </ul>
                <input type="text" id="fname" v-model="chatText" v-on:keyup.enter="updateChat()" name="fname">
                <b-button @click="updateChat()" variant="dark"><b-icon-cursor-fill></b-icon-cursor-fill></b-button><br>
              <b-button @click="switchUser()" variant="danger">LogOut</b-button>
          </td>
        </tr>
      </tbody>
    </table>
    Registered Users: 
    <ul id="example-1" class="receiver">
      <li v-for="username in usernames" :key="username.username">
        <b-button variant="info" class ="message">{{ username.username }}</b-button>
        <b-icon-trash v-if="status == false" @click="deleteUser(username.id)"></b-icon-trash>
      </li>
    </ul>
  </div>
</template>

<script>
// import * as firebase from 'firebase/app';
import { db } from '../firebase/db';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  created() {
    this.status = false;
    this.colours = ['black'];
    this.pickColour = this.colours[Math.floor(Math.random() * this.colours.length)];
    console.log(this.pickColour);
  },
  data() {
    return {
      colours: [],
      pickColour: '',
      names: [],
      usernames: [],
      username: '',
      status: false,
      currentUser: '',
      chatText: '',
      displayChat: false,
      items: [],
      UserId: '',
      messages: [],
      liveMessages: [],
      sentBy: '',
      welcomeMessage: ''
    }
  },
  methods: {
    async updateChat() {
      if(this.chatText) {
        this.liveMessages.messages.push({small: this.username + ': ' + this.chatText});
        this.liveMessages.sentBy.push({small: this.username});
        await db.collection('room').doc('JvBcBhHYySObwfqxAmtK').update({ messages: this.liveMessages.messages});
        this.chatText = '';
      }
    },
    async deleteUser(id) {
      await db.collection('username').doc(id).delete();
    },
    switchUser() {
      this.username = '';
      this.status = false;
    },
    async addItem() {
      var thisUser = [];
      if (this.username) {
        this.usernames.forEach((item) => {
          thisUser.push(item.username);
        });
        if (thisUser.includes(this.username)){
          this.welcomeMessage = 'Welcome Back';
        } else {
        await db.collection('username').add({ username: this.username, messages: []});
        this.welcomeMessage = 'Welcome';
        }
        this.items = [];
        this.status = true;
      }
    },
  },
  firestore: {
    usernames: db.collection('username'),
    liveMessages: db.collection('room').doc('JvBcBhHYySObwfqxAmtK'),
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  margin: auto;
  width: 50%;
  border: 1px solid green;
  padding: 10px;
  text-align: center;
  margin: 10%;
}
.sender {
  list-style-type: none;
  text-align: right;
}
.receiver {
  list-style-type: none;
  text-align: left;
}
.message {
  max-width: 20rem;
  min-width: 2rem;
  padding: 2px;
  margin: 2px;
}
</style>
