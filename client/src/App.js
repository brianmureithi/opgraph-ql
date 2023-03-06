import Header from "./components/Header";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { ApolloProvider,ApolloClient,InMemoryCache,
 } from "@apollo/client";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import Project from "./components/Project";
import Projects from "./components/Projects";

const cache = new InMemoryCache({
  typePolicies:{
    Query:{
      fields:{
        clients:{
          merge(existing,incoming){
            return incoming
          }
        },
        projects:{
          merge(existing,incoming){
            return incoming
          }
        }
      }
    }
  }
})

 const client = new ApolloClient({
  uri:'http://localhost:5000/graphql',
  cache,
 })

function App() {
  return (
  <>
    <ApolloProvider client={client}>
      <Router>
      <Header/>
   <Routes>
    <Route path='/' element={<Home/>} exact/>
 
    <Route path='project/:id' element={<Project/>} />
    <Route path='*' element={<NotFound/>} />

   </Routes>

      </Router>
   
    </ApolloProvider>

 </>
  );
}

export default App;
