<template>
  <div class="hello">
    <table class="table">
      <tbody>
        <tr>
          <td v-if="status == false">
            <h2>LogIn</h2>
            <h4>Enter your name and I'll direct you to the chat page.{{useColor}}</h4>
            <input type="text" id="fname" v-model="username" v-on:keyup.enter="addItem()" name="fname">
            <button @click="enterChat()">Enter Chat</button>
          </td>
          <td v-if="status">
              <b-card-text>Welcome {{username}}</b-card-text>
              <ul id="example-1" class="sender">
                <li v-for="item in items" :key="item.message">
                  <b-button variant="primary" class ="message">{{ item.message }}</b-button>
                </li>
              </ul>
              <ul id="example-1" class="sender">
                <li v-for="item in items" :key="item.message">
                  <b-button variant="primary" class ="message">{{ item.message }}</b-button>
                </li>
              </ul>
              <ul id="example-1" class="receiver">
                <li v-for="username in usernames" :key="username.username">
                  <b-button variant="dark" class ="message">{{ username.username }}</b-button>
                </li>
              </ul>
                <input type="text" id="fname" v-model="chatText" v-on:keyup.enter="updateChat()" name="fname">
                <b-button @click="updateChat()" variant="dark"><b-icon-cursor-fill></b-icon-cursor-fill></b-button><br>
              <b-button @click="switchUser()" variant="danger">LogOut</b-button>
          </td>
        </tr>
      </tbody>
    </table>
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
    this.useColor = this.color[Math.floor(Math.random()*this.color.length)];
  },
  data() {
    return {
      usernames: [],
      useColor: '',
      color: ['red', 'blue', 'green', 'yellow', 'purple'],
      username: '',
      status: false,
      currentUser: '',
      chatText: '',
      displayChat: false,
      items: [],
    }
  },
  methods: {
    enterChat() {
      if (this.username !== ''){
        this.items = [];
        this.status = true;
      }      
    },
    chat() {
      this.currentUser = 'Lisa'
    },
    updateChat() {
      this.items.push({message: this.chatText});
      this.chatText = '';
    },
    switchUser() {
      this.username = '';
      this.status = false;
    },
    async addItem() {
      if (this.username) {
        await db.collection('username').add({ username: this.username });
        this.items = [];
        this.status = true;
      }
    },
  },
  firestore: {
    usernames: db.collection('username'),
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
