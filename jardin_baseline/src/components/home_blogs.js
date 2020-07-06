import React from 'react';
import Button from "@material-ui/core/Button";

export default function HomeBlogs() {

    return (
            <div >
      <header style={{}} >
        <p> <b> Top Picks for today </b> </p>
        <br></br>
        <a
          href="https://google.com"
          target="_blank"
        >
          Tips and tricks for good harvest
        </a>

        <span style={{paddingLeft: '250px'}}>
        <span >  <Button  color='primary' > Edit  </Button> </span>
        <span>  <Button  color='primary' > Share </Button> </span>
        <span>  <Button  color='primary' > Delete </Button> </span>
        </span>

        <p> <b> Peter Miller, 22nd May 2020</b></p>
        <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum </p>
        <br></br>
        <a
          href="https://reactjs.org"
          target="_blank"
        >
          How to use gardening tools?
        </a>

        <span style={{paddingLeft: '275px'}}>
        <span >  <Button  color='primary' > Edit </Button> </span>
        <span>  <Button  color='primary' > Share </Button> </span>
        <span>  <Button  color='primary' > Delete </Button> </span>
        </span>


         <br></br>
        <p> <b> Julia Schmidt, 22nd May 2020</b></p>
        <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum </p>
        <br></br>
        <a
          href="https://reactjs.org"
          target="_blank"
        >
          How I managed a garden on my own?
        </a> 

        <span style={{paddingLeft: '210px'}}>
        <span >  <Button  color='primary' > Edit </Button> </span>
        <span>  <Button  color='primary' > Share </Button> </span>
        <span>  <Button  color='primary' > Delete </Button> </span>
        </span>

        <br></br>
        <p> <b> Frederick Boster, 22nd May 2020</b></p>
        <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum </p>
        <br></br>
       <br></br> 
      </header>
    </div>
    );
}