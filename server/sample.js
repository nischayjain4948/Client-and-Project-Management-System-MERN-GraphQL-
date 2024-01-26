// Dummy array of projects
const projects = [
    {
        id: 1,
        clientId: 101,
        description: "Project A",
        status: "In progress",
    },
    {
        id: 2,
        clientId: 102,
        description: "Project B",
        status: "Completed",
    },
    {
        id: 3,
        clientId: 103,
        description: "Project C",
        status: "In progress",
    },
    // Add more projects as needed
];

// Dummy array of clients
const clients = [
    {
        id: 101,
        name: "Client X",
        email: "clientx@example.com",
        phone: "123-456-7890",
    },
    {
        id: 102,
        name: "Client Y",
        email: "clienty@example.com",
        phone: "987-654-3210",
    },
    {
        id: 103,
        name: "Client Z",
        email: "clientz@example.com",
        phone: "555-123-4567",
    },
    // Add more clients as needed
];

module.exports = { projects, clients };
