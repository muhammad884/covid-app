// function authHeader() {
//   const admin = JSON.parse(localStorage.getItem("admin"));
//   const agent = JSON.parse(localStorage.getItem("agent"));
//   if (admin) {
//     return {
//       headers: {
//         authorization: `Bearer ${admin.token}`,
//       },
//     };
//   } else if (agent) {
//     return {
//       headers: {
//         authorization: `Bearer ${agent.token}`,
//       },
//     };
//   } else {
//     return {};
//   }
// }
// export default authHeader;
