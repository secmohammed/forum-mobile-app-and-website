const connectivityModule = require("tns-core-modules/connectivity");
const myConnectionType = connectivityModule.getConnectionType();
import Home from '~/pages/Home.vue'

export default {
    mounted() {
        if (myConnectionType ==  connectivityModule.connectionType.none) {
            this.$toast.notify('You do not have an active internet currently')
            this.$navigateTo(Home)
        }
    }
}
