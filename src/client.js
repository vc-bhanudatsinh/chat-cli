const net = require("net");
const inquirer = require("inquirer");

// IIFE for when file is running
(async () => {
  // question for asking user for his/her name
  const nameQuestion = {
    type: "input",
    name: "Client Data",
    message: "Please Enter your name --",
  };

  // question for asking user to type message
  const chatQuestion = {
    type: "input",
    name: `chat`,
    message: "Your Message --",
  };

  // creating prompt
  const prompt = inquirer.createPromptModule();

  // asking name question
  const getClientName = await prompt(nameQuestion);
  const clientName = getClientName[nameQuestion.name];

  // asking message question and sending back to server
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

    /* only ask message question if the data recieved from server
     * is from client itself
     * or from server
     */
    if (data.name === clientName || data.name === "Server") {
      clientChatHandler();
    }
  });
})();
