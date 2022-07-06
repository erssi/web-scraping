
import TextField from "@mui/material/TextField";
import List from "./Components/List" 
import Button from "./Components/ButtonComponent"
import './App.css';

export  const  App=()=> {
  return (
    <div className="main">
      <h1>React App</h1>
      <div className="search">
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          label="Search"
        />
        <Button 
        border="none"
        color="pink"
        height = "200px"
        onClick={() => console.log("You clicked on the pink circle!")}
        radius = "50%"
        width = "200px"
        children = "I'm a pink circle!"
      />
      </div>
     
      {/* <List /> */}
    </div>
  );
}

// export  App;
