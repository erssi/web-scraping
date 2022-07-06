import axios from 'axios';
import React, { useEffect, useState } from 'react';

import './App.css';
import { datax } from './components/ListData';
import SearchButton from './components/SearchButton';
import { searchService } from './services/SearchService';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setitems] = useState([]);

  const benRakia =  async () => {
     await fetch(
      `http://localhost:3001/shopping/search?search=${searchQuery}`,
      {
        method:'GET',
        headers: {
          "Access-Control-Allow-Origin" : "*",
          "Content-Type": "application/json"
        }
      }
    ).then(async (res) => {
      const a = await res.json();
      return setitems(a.amazon.concat(a.ebay))
    }).catch( (error) => {
      console.error(error); 
    })

    await fetch(
      `http://localhost:3001/shopping/search-login?search=${searchQuery}`,
      {
        method:'GET',
        headers: {
          'Authorization': 'Bearer' + localStorage.getItem('token'),
          "Access-Control-Allow-Origin" : "*",
          "Content-Type": "application/json"
        }
      }
    ).then(async (res) => {
      const a = await res.json();
      return setitems(a.amazon.concat(a.ebay))
    }).catch( (error) => {
      console.error(error); 
    })
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      benRakia();
    }
  };
  
  return (
    <div className='App'>
      <h1>Ben Pijedashesi</h1>
      <SearchButton onChange={onChange} onKeyPress={onKeyPress}/>
      <button onClick={benRakia}>Serach</button>
      <ul>
        {items.map(({id, description, image,price,rating,url, type} : any ) => (
          <li key={id}> {type} {description} <img src={image} width="100" height="100" />  {price} {rating}  <a href={url} target="_">Visit</a> </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
