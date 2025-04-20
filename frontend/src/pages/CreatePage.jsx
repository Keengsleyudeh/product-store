import { Box, Button, Container, Heading, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";
import { useColorModeValue } from "../components/ui/color-mode";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

// Toast component
const Toast = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  padding: 1rem;
  border-radius: 6px;
  background: ${props => {
    if (props.status === 'error') {
      return props.theme.mode === 'dark' ? '#C53030' : '#E53E3E';
    }
    return props.theme.mode === 'dark' ? '#2F855A' : '#38A169';
  }};
  color: white;
  box-shadow: ${({ theme }) => 
    theme.mode === 'dark' 
      ? '0 4px 6px rgba(0, 0, 0, 0.4)' 
      : '0 4px 6px rgba(0, 0, 0, 0.1)'};
  z-index: 1000;
`;

const CreatePage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState(null);
    
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: "",
    });

    const { createProduct } = useProductStore();

    const showToast = (message, status) => {
        setToast({ message, status });
        setTimeout(() => setToast(null), 3000);
    };

    const handleAddProduct = async () => {
        setIsLoading(true);
        try {
            const { success, message } = await createProduct(newProduct);
            if (!success) {
                showToast(message, 'error');
            } else {
                showToast('Product created successfully!', 'success');
                setNewProduct({ name: "", price: "", image: "" });
                // Navigate to home page after successful creation
                setTimeout(() => {
                    navigate('/');
                }, 2000); // Wait for 2 seconds so user can see success message
            }
        } catch (error) {
            showToast(error.message || 'An error occurred', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={8}>
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                    Create New Product
                </Heading>

                <Box w={"28rem"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
                    <VStack spacing={4}>
                        <Input
                            placeholder='Product Name'
                            name='name'
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            borderColor={useColorModeValue("gray.300", "gray.600")}
                            isDisabled={isLoading}
                        />
                        <Input
                            placeholder='Price'
                            name='price'
                            type='number'
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            borderColor={useColorModeValue("gray.300", "gray.600")}
                            isDisabled={isLoading}
                        />
                        <Input
                            placeholder='Image URL'
                            name='image'
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                            borderColor={useColorModeValue("gray.300", "gray.600")}
                            isDisabled={isLoading}
                        />

                        <Button 
                            colorScheme='blue' 
                            onClick={handleAddProduct} 
                            w='full'
                            isLoading={isLoading}
                            loadingText="Creating Product..."
                            disabled={isLoading || !newProduct.name || !newProduct.price || !newProduct.image}
                        >
                            Add Product
                        </Button>
                    </VStack>
                </Box>
            </VStack>

            {toast && (
                <Toast status={toast.status}>
                    {toast.message}
                </Toast>
            )}
        </Container>
    );
};

export default CreatePage;