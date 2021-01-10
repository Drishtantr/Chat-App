<template>
  <div class="hello">
    <table class="table">
      <tbody>
        <tr>
          <td v-if="status == false">
            <h2>Welcome!</h2>
            <h4>Enter your name and the room-code(1234)</h4>
            <hr>
            <div><input type="text" id="fname" class="p-2 m-2" v-model="username" name="fname" placeholder="Name" required></div>
            <div><input type="text" class="p-2 m-2" id="fname" v-model="password" v-on:keyup.enter="addItem()" name="pword" placeholder="Room Code" required></div>
            <b-button variant="primary" class="p-2 m-2" @click="addItem()">Enter Chat</b-button>
            <div>{{loginstatus}}</div>
          </td>
          <td v-if="status">
              <b-card-text>{{welcomeMessage}} to the app, {{username}}</b-card-text>
              <hr>
              <ul id="example-1" class="receiver">
                <li v-for="message in liveMessages.messages" :key="message.small">
                  <p variant="primary" class ="message">{{ message.small }}</p>
                </li>
              </ul>
                <div class="input-group mb-3">
                <input type="text" class="form-control" v-model="chatText" placeholder="Type Here" v-on:keyup.enter="updateChat()" aria-label="Recipient's username" aria-describedby="basic-addon2">
                <div class="input-group-append">
                  <span role="button" class="input-group-text" id="basic-addon2" @click="updateChat()">Send</span>
                </div>
                </div>
              <b-button @click="switchUser()" variant="danger" class="p-2 m-2 btn-small">LogOut</b-button>
          </td>
        </tr>
      </tbody>
    </table>
    <hr>
    <div class="reg-users p-2">Registered Users:</div> 
    <ul class="reg-users p-2">
      <li v-for="username in usernames" :key="username.username" class="p-2">
        <b-button variant="info" disabled class="p-2">{{ username.username }}</b-button>
        <b-icon-trash v-if="status == false" class="p-2" @click="deleteUser(username.id)"></b-icon-trash>
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
  },
  data() {
    return {
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
      welcomeMessage: '',
      password: '',
      loginstatus: '',
    }
  },
  methods: {
    async updateChat() {
      if(this.chatText) {
        this.liveMessages.messages.push({small: this.username + ': ' + this.chatText});
        this.chatText = '';
        this.liveMessages.sentBy.push({small: this.username});
        await db.collection('room').doc('JvBcBhHYySObwfqxAmtK').update({ messages: this.liveMessages.messages});
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
      this.loginstatus=""
      if (this.username && this.password === '1234') {
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
        this.loginstatus="";
        this.password=""
      } else if (this.username === "")  {
        this.loginstatus="Name Required"
      } else {
        this.loginstatus="Incorrect Code"
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
  justify-content: center;
  margin: auto;
  padding: 10px;
  text-align: center;
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
.reg-users {
  justify-content: center;
  text-decoration: none;
  list-style: none;
}
</style>
