async function postData() {
    const phoneNumber = document.getElementById('phonenumber').value;
  
    if (!phoneNumber) {
      alert('Please enter a phone number.');
      return;
    }
  
    try {
      // Send the POST request to your backend
      const response = await fetch('http://localhost:8000/post-phonenumber', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phonenumber: phoneNumber }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch data from the backend');
      }
  
      const data = await response.json();
  
      // Display headers on the page
      const headersTable = document.getElementById('headersTable').querySelector('tbody');
      headersTable.innerHTML = ''; // Clear previous data
  
      Object.entries(data.headers).forEach(([name, value]) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${name}</td><td>${value}</td>`;
        headersTable.appendChild(row);
      });
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while fetching the data.');
    }
  }
  