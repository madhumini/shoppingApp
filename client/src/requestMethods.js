// import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/"
// // const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NjM2ODJiZmU4ZGVmZGU0ZGY5OGU0NyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4NDM5NzI2NywiZXhwIjoxNjg0NjU2NDY3fQ.zdqq_q1OvyIKxO4-ixRwsmh6Q_1yLoh1DvcQvR2mBhA"

// export const publicRequest = axios.create({
//     baseURL: BASE_URL,
// })

// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
//   .currentUser.accessToken;
// export const userRequest = axios.create({
  
//     baseURL: BASE_URL,
//     header:{token:`BEARER ${TOKEN}` }
// })




import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

// Retrieve user data from localStorage and parse it once
const userFromLocalStorage = JSON.parse(localStorage.getItem("persist:root"));
const user = userFromLocalStorage ? userFromLocalStorage.user : null;

// Set the TOKEN only if there is a user and an accessToken available
let TOKEN = null;
if (user && user.currentUser && user.currentUser.accessToken) {
  TOKEN = user.currentUser.accessToken;
}

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: TOKEN ? { token: `Bearer ${TOKEN}` } : {}, // Use "Authorization" only if there is a TOKEN available
});




// import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/"
// // const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NjM2ODJiZmU4ZGVmZGU0ZGY5OGU0NyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4NDM5NzI2NywiZXhwIjoxNjg0NjU2NDY3fQ.zdqq_q1OvyIKxO4-ixRwsmh6Q_1yLoh1DvcQvR2mBhA"

// export const publicRequest = axios.create({
//     baseURL: BASE_URL,
// })

// let TOKEN = null;
// export const userRequest = axios.create({

//   TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
//   .currentUser.accessToken;
  
//     baseURL: BASE_URL,
//     header:{token:`BEARER ${TOKEN}` }
// })

