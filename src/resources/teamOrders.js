export const teamOrders = {};

fetch('http://13.59.95.158:8000/data/orders')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    
    if (Array.isArray(data)) {
      data.forEach(order => {
        const teamID = order.teamID;
        if (teamID) {
          if (teamOrders[teamID]) {
            teamOrders[teamID] += 1;
          } else {
            teamOrders[teamID] = 1;
          }
        }
      });
    } else {
      throw new Error('Invalid data format');
    }
  })
  .catch(error => {
    console.error('Error fetching orders:', error);
  });
