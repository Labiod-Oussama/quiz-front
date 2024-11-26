
const BASE_URL = '/quiz-front.github.io';
export const paths = {
    home: BASE_URL + '/',
    auth: {
        register: BASE_URL + `/register`,
        login: BASE_URL + `/login`,
    },
    dashboard: {
        index: BASE_URL + `/dashboard`,
        result: BASE_URL + `/results`
    }
}