import Header from "./components/Header";
import Clients from "./components/Clients";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import AddClientModal from "./components/AddClientModal";
import Login from "./pages/Login";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache,
  connectToDevTools: true,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <Login />
        <div className="container">
          <AddClientModal />
          <Clients />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
