import { Box } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import Homepage from "./pages/Homepage"
import CreatePage from "./pages/CreatePage"
import Navbar from "./components/Navbar"
import { useColorModeValue } from "./components/ui/color-mode"
import Signup from "./pages/Signup"
import ProtectedRoute from "./ProtectedRoute"
import Login from "./pages/Login"

function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}> 
      <Navbar />
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Homepage />
          </ProtectedRoute>
        } />
        <Route path="/create" element={
          <ProtectedRoute>
            <CreatePage />
          </ProtectedRoute>
        } />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Box>
  )
}

export default App