import './App.css';
import { BrowserRouter as Routers, Routes, Route, Navigate,} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';
import Header from './Components/Header';
import Nav from './Components/Nav';
import Home from './screens/Home';
import About from './screens/About';
import Footer from './screens/Footer';
import PostPage from './screens/PostPage';
import NewPost from './screens/NewPost';
import {format} from 'date-fns';
import Missing from './screens/Missing';
import EditPost from './screens/EditPost';
import api from './api/posts'
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');                 //for search
  const [searchResult, setSearchResults] = useState([]);    
  const [postTitle, setPostTitle] = useState('');           //for add
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');           //for edit
  const [editBody, setEditBody] = useState('');

//axios lesson (fetch data from api (json-server))
  useEffect(()=>{

    const fetchPosts = async () => {
      try{
        const response = await api.get('/posts');
        setPosts(response.data);
      }catch (err){
        if(err.response){
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        }else{
          console.log(`Error: ${err.message}`);
        }
      }
    }

    fetchPosts();

  },[])


  //search
  useEffect(() => {
    const filteredResults = posts.filter((post) =>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResults.reverse());
  }, [posts, search])


//delete data
  
  // const navigate = useNavigate();
  const handleDelete = async (id) =>{
    try{
      await api.delete(`/posts/${id}`);

      const postsList = posts.filter(post => post.id !== id);
      setPosts(postsList);
      // Navigate("/");
      // Navigate.push("/");
    }catch (err){
      console.log(`Error: ${err.message}`);
    }
  }
  
  
//submit new data
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try{
      const response = await api.post('/posts', newPost);
      const allPosts = [...posts, newPost];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      // navigate('/')

    }catch (err){
      console.log(`Error: ${err.message}`);
    }
  }

//edit
  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(posts.map(post => post.id === id ? { ...response.data } : post));
      setEditTitle('');
      setEditBody('');
      // history.push('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  return (
    <div className="App">
      <Routers>
        <Header title="ReactJS blog"/>
        <Nav search={search} setSearch={setSearch}/>
        <Routes>
          <Route path="/" element={
            <Home posts={searchResult}/>  // search and new post go on top
          }/>
          <Route path="/about" element={<About/>}/>
          <Route path='/post' element={
            <NewPost
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
          />}/>
          <Route path="/post/:id" element={
            <PostPage posts={posts} handleDelete={handleDelete}/>
          }/>
          <Route path="/edit/:id" element={
            <EditPost
              posts={posts}
              handleEdit={handleEdit}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editBody={editBody}
              setEditBody={setEditBody}
            />
          }
          />
          <Route path='*' element={<Missing/>}/>
        </Routes>
        <Footer/>
      </Routers>

    </div>
  );
}
export default App;
