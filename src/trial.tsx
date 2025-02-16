function Component() {

    const jsonData = {
      "users": [
          {
              "name": "alan", 
              "age": 23,
              "username": "aturing"
          },
          {
              "name": "john", 
              "age": 29,
              "username": "__john__"
          }
      ],
      'message': "I just want to say hello"
    }
  
    function handleClick() {
      
      // Send data to the backend via POST
      fetch('http://localhost:5000/api/receive-data', {  // Enter your IP address here
  
        method: 'POST', 
        // mode: 'cors', 
        // credentials: 'include',
        headers: {
          
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // 'Access-Control-Allow-Origin':'*'
        },
        
        body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
  
      }).then((response) => response.json())
      .then((data) => {
         console.log(data);
         // Handle data
      })
      .catch((err) => {
         console.log(JSON.stringify(err));
      });
      
    }
  
    return (
      <button onClick={handleClick} tabIndex={0} style={{
        textAlign: 'center',
        width: '100px',
        border: '1px solid gray',
        borderRadius: '5px'
      }}>
        Send data to backend
      </button>
    );
  
  }
  
  export { Component };