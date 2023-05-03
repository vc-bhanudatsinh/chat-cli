const net = require("net");
const inquirer = require("inquirer");
(async () => {
  const nameQuestion = {
    type: "input",
    name: "Client Data",
    message: "Please Enter your name --",
  };
  const chatQuestion = {
    type: "input",
    name: `chat`,
    message: "Your Message --",
  };
  const prompt = inquirer.createPromptModule();
  const getClientName = await prompt(nameQuestion);
  const clientName = getClientName[nameQuestion.name];

  const clientChatHandler = async () => {
    const chatMessageAnswer = await prompt(chatQuestion);
    const getChatMessage = chatMessageAnswer[chatQuestion.name];
    sendMessage(JSON.stringify({ name: clientName, message: getChatMessage }));
  };

  // send Client Message
  const sendMessage = async (data) => {
    client.write(data);
  };

  //   create a client connection
  const client = net.createConnection(4000, () =>
    console.log("Connected to server")
  );

  //   show the data recieved from server
  client.on("data", (data) => {
    data = JSON.parse(data.toString());
    console.log("\n" + data.name + ":", data.message + "\n");
    if (data.name === clientName || data.name === "Server") {
      clientChatHandler();
    }
  });
})();
