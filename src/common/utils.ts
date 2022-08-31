export const getChatRoom = (user1: string, user2: string) => {
  let userArr = [user1.toLowerCase(), user2.toLowerCase()];
  userArr = userArr.sort();
  return userArr.join("");
};

export const appendSender = (sender, str) => {
  return `${sender}: ${str}`;
}