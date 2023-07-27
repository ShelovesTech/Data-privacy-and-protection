// Your JavaScript code here (the fetch() example)
fetch('https://BACKEND.com/api/data', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        // Additional headers if needed
    },
})
.then(response => response.json())
.then(data => {
    // Process the response data from the server
})
.catch(error => {
    // Handle any errors that occurred during the request
});
