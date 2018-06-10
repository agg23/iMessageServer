// Write your JavaScript code.
const connection = new signalR.HubConnection("/hub");

connection.on("broadcastMessage", (user, message) => {
    console.log(user);
    console.log(message);
});

connection.start().catch(err => console.error(err.toString()));