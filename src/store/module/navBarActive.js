import { setCookie } from "../../utils/cookie";

export default {
    state: {
        activeIndex: ''
    },
    mutations: {
        updateActiveIndex(state, payload) {
            state.activeIndex = payload;
        }
    },
    actions: {
        actionUpdateActiveIndex(context, payload) {
            setCookie("navBarActiveIndex", payload, 1);
            context.commit("updateActiveIndex", payload);
        }
    }
}