/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
window.Vue = require('vue').default;


Vue.use(VueRouter);

import Vue from 'vue'
import VueRouter from 'vue-router'


import moment from 'moment';
import VueProgressBar from 'vue-progressbar'
import Form from 'vform'
import Swal from 'sweetalert2'
import Gate from './Gate';

Vue.prototype.$gate = new Gate(window.user);


//Custom event 

window.Fire = new Vue();

//sweet alert
window.swal = Swal;
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
window.toast = Toast;
//v-form
window.form = Form;
const errors = form.errors
import {
  Button,
  HasError,
  AlertError,
  AlertErrors,
  AlertSuccess
} from 'vform/src/components/bootstrap5'
Vue.component(Button.name, Button)
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
Vue.component(AlertErrors.name, AlertErrors)
Vue.component(AlertSuccess.name, AlertSuccess)

Vue.component('not-found', () => import('./components/NotFound.vue')).default;
Vue.component('pagination', require('laravel-vue-pagination'));

//progress bar
const options = {
  color: '#bffaf3',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}

Vue.use(VueProgressBar, options)


let routes = [
  { path: '/dashboard', component: require('./components/Dashboard.vue').default },
  { path: '/developer', component: require('./components/Developer.vue').default },
  { path: '/users', component: require('./components/Users.vue').default },
  { path: '/profile', component: require('./components/Profile.vue').default },
  { path: '*', component: require('./components/NotFound.vue').default }
];

const router = new VueRouter({
  mode: 'history',
  routes
 } );


Vue.filter('uppercase', function (text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
});

Vue.filter('Tdate', (created) => moment().format('MMMM Do YYYY, h:mm:ss a'));

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))



/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
  el: '#app',
  router,

  data: {
    search: ''

  },
  methods: {
    searchit() {
      Fire.$emit('searching');
    }
  }
}
);
