import { getUsers, register } from "../../utils/network-api";

const ActionType = {
  RECEIVE_USERS: "RECEIVE_USERS",
};

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users: users,
    },
  };
}

// function asyncReceiveUsers() {
//   return async (dispatch) => {
//     try {
//       const users = await getUsers();
//       dispatch(receiveUsersActionCreator(users));
//     } catch (e) {
//       alert(e.message);
//     }
//   };
// }

async function asyncRegister({ name, email, password }) {
  try {
    await register({ name, email, password });
    alert("Successfully registered");
  } catch (e) {
    alert(e.message);
  }
}

export { ActionType, receiveUsersActionCreator, asyncRegister };
