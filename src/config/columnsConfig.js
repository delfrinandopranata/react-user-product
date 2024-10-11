// src/config/columnsConfig.js

// Define column configurations for different data types
const columnsConfig = {
    users: [
      { header: 'First Name', accessor: 'firstName' },
      { header: 'Last Name', accessor: 'lastName' },
      { header: 'Maiden Name', accessor: 'maidenName' },
      { header: 'Age', accessor: 'age' },
      { header: 'Gender', accessor: 'gender' },
      { header: 'Email', accessor: 'email' },
      { header: 'Username', accessor: 'username' },
      { header: 'Blood Group', accessor: 'bloodGroup' },
      { header: 'Eye Color', accessor: 'eyeColor' },
    ],
    products: [
      { header: 'Title', accessor: 'title' },
      { header: 'Price', accessor: 'price' },
      { header: 'Brand', accessor: 'brand' },
      { header: 'Category', accessor: 'category' },
      { header: 'Stock', accessor: 'stock' },
      { header: 'Description', accessor: 'description' },
    ],
  };
  
  export default columnsConfig;
  