import styled from 'styled-components';
import { useState } from 'react';
import { useProductStore } from '../store/product';
import { useColorModeValue } from './ui/color-mode';


// Styled Components
const Card = styled.div`
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s;
  background: ${props => props.bg}; // Using the bg prop instead of theme
  color: 1px solid ${props => props.bg};
  width: 25rem;
  max-width: 400px;
  margin-bottom: 50px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => 
      theme.mode === 'dark' 
        ? '0 20px 25px -5px rgba(0, 0, 0, 0.3)' 
        : '0 20px 25px -5px rgba(0, 0, 0, 0.1)'};
  }
`

const ProductImage = styled.img`
  height: 12rem;
  width: 100%;
  object-fit: cover;
  border-bottom: 1px solid ${({ theme }) => theme.mode === 'dark' ? '#4A5568' : '#E2E8F0'};
`;

const ContentBox = styled.div`
  padding: 1.5rem;
  background: ${props => props.bg};
`;

const ProductTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: ${props => props.bg};
  font-weight: 600;
`;

const Price = styled.p`
  font-weight: bold;
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.mode === 'dark' ? '#90CDF4' : '#3182CE'};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const IconButton = styled.button`
  padding: 0.5rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  background: ${props => {
    if (props.variant === 'delete') {
      return props.theme.mode === 'dark' ? '#C53030' : '#E53E3E';
    }
    return props.theme.mode === 'dark' ? '#2B6CB0' : '#3182CE';
  }};
  color: white;
  
  &:hover {
    background: ${props => {
      if (props.variant === 'delete') {
        return props.theme.mode === 'dark' ? '#9B2C2C' : '#C53030';
      }
      return props.theme.mode === 'dark' ? '#2C5282' : '#2B6CB0';
    }};
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => 
    theme.mode === 'dark' 
      ? 'rgba(0, 0, 0, 0.7)' 
      : 'rgba(0, 0, 0, 0.5)'};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.mode === 'dark' ? '#2D3748' : '#FFFFFF'};
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  position: relative;
  box-shadow: ${({ theme }) => 
    theme.mode === 'dark' 
      ? '0 4px 6px rgba(0, 0, 0, 0.4)' 
      : '0 4px 6px rgba(0, 0, 0, 0.1)'};
`;

const ModalHeader = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.mode === 'dark' ? '#E2E8F0' : '#2D3748'};
`;

const CloseButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.mode === 'dark' ? '#A0AEC0' : '#4A5568'};
  
  &:hover {
    color: ${({ theme }) => theme.mode === 'dark' ? '#E2E8F0' : '#1A202C'};
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  border: 2px solid ${({ theme }) => theme.mode === 'dark' ? '#4A5568' : '#E2E8F0'};
  border-radius: 6px;
  background: ${({ theme }) => theme.mode === 'dark' ? '#1A202C' : '#FFFFFF'};
  color: ${({ theme }) => theme.mode === 'dark' ? '#E2E8F0' : '#2D3748'};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.mode === 'dark' ? '#90CDF4' : '#3182CE'};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.mode === 'dark' ? '#90CDF4' : '#3182CE'};
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.mode === 'dark' ? '#718096' : '#A0AEC0'};
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  margin-left: ${props => props.marginLeft ? '0.75rem' : '0'};
  transition: all 0.2s;
  
  background: ${props => {
    if (props.variant === 'ghost') {
      return 'transparent';
    }
    return props.theme.mode === 'dark' ? '#2B6CB0' : '#3182CE';
  }};
  
  color: ${props => {
    if (props.variant === 'ghost') {
      return props.theme.mode === 'dark' ? '#90CDF4' : '#3182CE';
    }
    return '#FFFFFF';
  }};
  
  border: ${props => 
    props.variant === 'ghost' 
      ? `2px solid ${props.theme.mode === 'dark' ? '#90CDF4' : '#3182CE'}`
      : 'none'};
  
  &:hover {
    background: ${props => {
      if (props.variant === 'ghost') {
        return props.theme.mode === 'dark' ? 'rgba(144, 205, 244, 0.1)' : 'rgba(49, 130, 206, 0.1)';
      }
      return props.theme.mode === 'dark' ? '#2C5282' : '#2B6CB0';
    }};
  }
`;

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

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 0.6s linear infinite;
  margin: 0 auto;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { deleteProduct, updateProduct } = useProductStore();

  const showToast = (title, message, status) => {
    setToast({ title, message, status });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDeleteProduct = async (pid) => {
    setIsDeleting(true);
    try {
      const { success, message } = await deleteProduct(pid);
      showToast(
        success ? 'Success' : 'Error',
        message,
        success ? 'success' : 'error'
      );
    } catch (error) {
      showToast('Error', error.message || 'Failed to delete product', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const bg = useColorModeValue("white", "#1A202C");

  const handleUpdateProduct = async (pid, updatedProduct) => {
    setIsUpdating(true);
    try {
      const { success, message } = await updateProduct(pid, updatedProduct);
      if (success) {
        setIsOpen(false);
        showToast(
          'Success',
          'Product updated successfully',
          'success'
        );
      } else {
        showToast('Error', message, 'error');
      }
    } catch (error) {
      showToast('Error', error.message || 'Failed to update product', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <Card bg={bg}>
        <ProductImage src={product.image} alt={product.name} />
        <ContentBox bg={bg}>
          <ProductTitle bg={useColorModeValue("#333333", "white")}>
            {product.name}
          </ProductTitle>
          <Price>${product.price}</Price>
          <ButtonGroup>
            <IconButton 
              onClick={() => setIsOpen(true)} 
              disabled={isDeleting}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </IconButton>
            <IconButton 
              variant="delete" 
              onClick={() => handleDeleteProduct(product._id)}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <LoadingSpinner />
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              )}
            </IconButton>
          </ButtonGroup>
        </ContentBox>
      </Card>

      {isOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Update Product</ModalHeader>
            <CloseButton onClick={() => setIsOpen(false)} disabled={isUpdating}>
              &times;
            </CloseButton>
            <div>
              <Input
                placeholder="Product Name"
                value={updatedProduct.name}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                disabled={isUpdating}
              />
              <Input
                placeholder="Price"
                type="number"
                value={updatedProduct.price}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                disabled={isUpdating}
              />
              <Input
                placeholder="Image URL"
                value={updatedProduct.image}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                disabled={isUpdating}
              />
              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                  onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                  disabled={isUpdating}
                >
                  {isUpdating ? <LoadingSpinner /> : 'Update'}
                </Button>
                <Button 
                  variant="ghost" 
                  marginLeft 
                  onClick={() => setIsOpen(false)}
                  disabled={isUpdating}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}

      {toast && (
        <Toast status={toast.status}>
          <strong>{toast.title}</strong>: {toast.message}
        </Toast>
      )}
    </>
  );
};

export default ProductCard;