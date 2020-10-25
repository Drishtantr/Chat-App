<template>
  <div class="hello">
    <table class="table">
      <tbody>
        <ul id="example-1" class="receiver">
          <li v-for="username in usernames" :key="username.username">
            <b-button variant="info" class ="message">{{ username.username }}</b-button>
            <b-icon-trash v-if="status == false" @click="deleteUser(username.id)"></b-icon-trash>
          </li>
        </ul>
        <tr>
          <td v-if="status == false">
            <h2>LogIn</h2>
            <h4>Enter your name and I'll direct you to the chat page.</h4>
            <input type="text" id="fname" v-model="username" v-on:keyup.enter="addItem()" name="fname">
            <button @click="addItem()">Enter Chat</button>
          </td>
          <td v-if="status">
              <b-card-text>Welcome {{username}} {{messages}}</b-card-text>
              <!-- <ul id="example-1" class="sender">
                <li v-for="item in items" :key="item.message">
                  <b-button variant="primary" class ="message">{{ item.message }}</b-button>
                </li>
              </ul> -->
              <ul id="example-1" class="sender">
                <li v-for="message in messages" :key="message.small">
                  <small id="emailHelp" class="form-text text-muted">{{username}}</small>
                  <b-button variant="primary" class ="message">{{ message.small }}</b-button>
                </li>
              </ul>
              <ul id="example-1" class="receiver">
                <li v-for="message in messages" :key="message.small">
                  <small id="emailHelp" class="form-text text-muted">Sender</small>
                  <b-button variant="dark" class ="message">{{ message.small }}</b-button>
                </li>
              </ul>
              <ul id="example-1" class="receiver">
                <li v-for="message in senderMessages" :key="message.small">
                  <b-button variant="dark" class ="message">{{ message.small }}</b-button>
                </li>
              </ul>
              <!-- <ul id="example-1" class="sender">
                <li v-for="item in items" :key="item.message">
                  <b-button variant="primary" class ="message">{{ item.message }}</b-button>
                </li>
              </ul> -->
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
    console.log(this.usernames);
    // for(i=0; i<this.usernames.length; i++) {
    //   this.names = this.usernames.username
    // }
    //pull usernames
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
      senderMessages: [],
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
    async updateChat() {
      if(this.chatText) {
        this.messages.push({small: this.chatText});
        this.items.push({messages: this.chatText});
        const id = this.UserId;
        await db.collection('username').doc(id).update({ messages: this.messages });
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
      if (this.username) {
        await db.collection('username').add({ username: this.username, messages: []});
        this.items = [];
        this.status = true;
      }
      await db.collection('username').where('username', '==', this.username).get().then((mySnapshot) => {
        mySnapshot.forEach((myDoc) => {
          const myData = {
            id: myDoc.id,
            messages: myDoc.data().messages,
          };
          this.UserId = myData.id;
          this.messages = myData.messages;
        });
        // db.collection('UserData').doc(this.myUserId).set({
        //   test: this.testPush,
        //   testNo: this.testNum,
        // },
        // { merge: true });  rcVZJxSwQplU5jg8A4sm
      });
      await db.collection('username').where('username', '==', 'Benzema').get().then((mySnapshot) => {
        mySnapshot.forEach((myDoc) => {
          const myData = {
            // id: myDoc.id,
            messages: myDoc.data().messages,
          };
          // this.UserId = myData.id;
          this.senderMessages = myData.messages;
        });
        // db.collection('UserData').doc(this.myUserId).set({
        //   test: this.testPush,
        //   testNo: this.testNum,
        // },
        // { merge: true });  rcVZJxSwQplU5jg8A4sm
      });
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
