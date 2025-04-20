import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useColorModeValue } from '../components/ui/color-mode';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

// Reuse all styled components from Login except add these new ones

const Card = styled.div`
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s;
  background: ${props => props.bg};
  width: 100%;
  max-width: 450px;
  margin: 2rem auto;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => 
      theme.mode === 'dark' 
        ? '0 20px 25px -5px rgba(0, 0, 0, 0.3)' 
        : '0 20px 25px -5px rgba(0, 0, 0, 0.1)'};
  }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background: ${props => props.bg};
`;

const ContentBox = styled.div`
  padding: 2rem;
  background: ${props => props.bg};
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: ${props => props.color};
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${props => props.color};
  font-weight: 500;
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
  width: 100%;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  background: ${({ theme }) => theme.mode === 'dark' ? '#2B6CB0' : '#3182CE'};
  color: white;
  font-weight: 600;
  
  &:hover {
    background: ${({ theme }) => theme.mode === 'dark' ? '#2C5282' : '#2B6CB0'};
  }

  &:disabled {
    background: ${({ theme }) => theme.mode === 'dark' ? '#4A5568' : '#A0AEC0'};
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.mode === 'dark' ? '#FC8181' : '#E53E3E'};
  font-size: 14px;
  margin-top: 4px;
`;

const SignupText = styled.div`
  margin-top: 1rem;
  text-align: center;
  color: ${props => props.color};
`;

const StyledLink = styled.span`
  color: ${({ theme }) => theme.mode === 'dark' ? '#90CDF4' : '#3182CE'};
  cursor: pointer;
  margin-left: 0.5rem;
  
  &:hover {
    text-decoration: underline;
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


const InputGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const Signup = () => {
  const navigate = useNavigate();
  const { signup, isAuthenticated } = useAuthStore();


  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const containerBg = useColorModeValue("white", "#1A202C");
  const cardBg = useColorModeValue("white", "#2D3748");
  const textColor = useColorModeValue("#333333", "white");

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showToast = (message, status) => {
    setToast({ message, status });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Signup attempt:', {
      ...formData,  // This will now include both passwords
      timestamp: new Date().toISOString()
    });
  
    if (validateForm()) {
      setIsLoading(true);
      try {
        // Include both passwords in the signup data
        const result = await signup(formData);
        
        if (result.success) {
          showToast('Account created successfully!', 'success');
          // Navigation will happen automatically due to the useEffect
        } else {
          showToast(result.error || 'Signup failed', 'error');
        }

        setFormData({});


      } catch (error) {
        showToast(error.message || 'An error occurred', 'error');
        console.error('Signup error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Log all field changes including passwords
    console.log(`Field "${name}" changed:`, {
      value,
      timestamp: new Date().toISOString()
    });
  
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };


  return (
    <Container bg={containerBg}>
      <Card bg={cardBg}>
        <ContentBox bg={cardBg}>
          <Title color={textColor}>Create Account</Title>
          
          <form onSubmit={handleSubmit}>
            <InputGrid>
              <FormGroup>
                <Label color={textColor} htmlFor="firstName">First Name</Label>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                />
                {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label color={textColor} htmlFor="lastName">Last Name</Label>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                />
                {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
              </FormGroup>
            </InputGrid>

            <FormGroup>
              <Label color={textColor} htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a username"
              />
              {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label color={textColor} htmlFor="email">Email Address</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
              />
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label color={textColor} htmlFor="phone">Phone Number</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
              {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label color={textColor} htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
              />
              {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label color={textColor} htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
            </FormGroup>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>
          
          <SignupText color={textColor}>
            Already have an account?
            <StyledLink onClick={() => navigate("/login")}>
              Login
            </StyledLink>
          </SignupText>
        </ContentBox>
      </Card>

      {toast && (
        <Toast status={toast.status}>
          {toast.message}
        </Toast>
      )}
    </Container>
  );
};

export default Signup;