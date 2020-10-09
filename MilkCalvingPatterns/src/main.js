import Vue from 'vue';
import App from './App.vue';
import jQuery from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'popper.js';
import moment from 'moment';
import '@icon/open-iconic/open-iconic.css';
import VueCookie from 'vue-cookie';

window.$ = window.jQuery = jQuery;

Vue.use(VueCookie);
Vue.config.productionTip = true;

Vue.prototype.moment = moment;

Vue.filter('toShortDate', function (value) {
    if (typeof value !== 'string') {
        return value;
    }

    return moment(value).format('DD MMM YYYY');
})

Array.prototype.orderBy = function (prop, asc = true) {
    return this.sort(function (a, b) {
        if (a[prop] > b[prop]) {
            return asc === true ? 1 : -1;
        }
        else if (a[prop] < b[prop]) {
            return asc === true ? -1 : 1;
        }
        else {
            return 0;
        }
    })
}

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

Array.prototype.selectMany = function (fn) {
    return this.map(fn).reduce(function (x, y) { return x.concat(y); }, []);
}

new Vue({
    render: h => h(App)
}).$mount('#app');
