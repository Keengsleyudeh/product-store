# Product Store

A simple project to practice MERN stack and all CRUD operations. This application provides a full-featured product management system with create, read, update, and delete functionalities.

## 🚀 Features

- **Product Management**: Full CRUD operations for products
- **Modern UI**: Built with React and Chakra UI/Styled Components
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Instant UI updates when products are modified
- **Dark/Light Mode**: Supports theme switching for better user experience
- **Authentication**: Implemented login and signup feature

## 🛠️ Tech Stack

- **Frontend**:
  - React.js
  - Styled Components/Chakra UI
  - React Hooks
  - Zustand for global state management
  - Js-cookie
  - 

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose ODM
  - Cors
  - Jsonwebtoken
  - Bycrypt

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Keengsleyudeh/product-store.git
cd product-store
```

2. Install dependencies for both frontend and backend:
```bash
npm run build
```

3. Create a `.env` file in the backend directory with the following variables:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

4. Start the development servers:
```bash
# Start application
npm start
```

## 💡 Usage

The application provides a simple interface for managing products:

- **View Products**: Browse through the list of products
- **Add Product**: Create new products with name, price, and image
- **Edit Product**: Update existing product details
- **Delete Product**: Remove products from the store
- **Theme Toggle**: Switch between dark and light modes

## 🔍 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/products | Get all products |
| POST   | /api/products | Create a new product |
| PUT    | /api/products/:id | Update a product |
| DELETE | /api/products/:id | Delete a product |



## 👤 Author

**Kingsley Udeh**

* GitHub: [@Keengsleyudeh](https://github.com/Keengsleyudeh)

## 🌟 Show your support

Give a ⭐️ if this project helped you!
