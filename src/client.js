const net = require("net");
const inquirer = require("inquirer");

const clientCliStart = async () => {
  const nameQuestion = {
    type: "input",
    name: "Client Data",
    message: "Please Enter your name --",
  };
  const chatQuestion = {
    type: "input",
    name: "chat",
    message: "Your Message --",
  };
  const prompt = inquirer.createPromptModule();
  const getClientName = await prompt(nameQuestion);
  const clientName = getClientName[nameQuestion.name];

  // make client message in json
  const getClientMsg = (name, message) => {
    return JSON.stringify({ name, message });
  };
  const clientChatHandler = async () => {
    const chatMessageAnswer = await prompt(chatQuestion);
    const getChatMessage = chatMessageAnswer[chatQuestion.name];
    client.write(getClientMsg(clientName, getChatMessage));
    getPreviousChat();
  };

  // get Previous chat
  const getPreviousChat = async () => {
    client.on("data", (data) => {
      data = JSON.parse(data.toString());
      console.log("\n" + data.name + ":", data.message + "\n");
      clientChatHandler();
    });
  };
  // send Client Message
  const handleClientMsg = () => {
    console.log("Connected to server");
    getPreviousChat();
  };
  //   create a client connection
  const client = net.createConnection(
    { port: 4000, host: "192.168.1.34" },
    handleClientMsg
  );

  //   show the data recieved from server
};

clientCliStart();
