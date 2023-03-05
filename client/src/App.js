import Header from "./components/Header";
import { ApolloProvider,ApolloClient,InMemoryCache,
 } from "@apollo/client";
import Clients from "./components/Clients";

 const client = new ApolloClient({
  uri:'http://localhost:5000/graphql',
  cache:new InMemoryCache(),
 })

function App() {
  return (
  <>
    <ApolloProvider client={client}>
    <Header/>
    <div className="container mx-[6rem] mt-4">
      <Clients/>

    </div>
    </ApolloProvider>

 </>
  );
}

export default App;
