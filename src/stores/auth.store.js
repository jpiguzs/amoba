import { defineStore } from 'pinia';
import { db } from 'boot/db'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')),
        users:[],
        returnUrl: null
    }),
    actions: {
         SetUser(user) {

            console.log(user)
            // update pinia state
            this.user = user;

            // store user details and jwt in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            // redirect to previous url or default to home page

        },
        getUsers(){
          db.collection('users').get().then(res => {
            this.users = []

            setTimeout(() => {
            this.users = res.reverse();

          }, 100)
          })
        },
        CheckAviableName(value){
        return  this.users.some(user=> user.user_name===value.user_name && user.id!=value.id );
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');

        }
    }
});
