import React, { useState } from 'react';
import styled from 'styled-components';
import { FaArrowLeft, FaPhone } from 'react-icons/fa';

const NavBar = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: white;
  border-bottom: 1px solid #dbdbdb;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    opacity: 0.7;
  }
`;

const BrandContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  margin-left: 12px;
`;

const BrandLogo = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
`;

const BrandName = styled.span`
  font-weight: 600;
  font-size: 16px;
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

interface NavigationBarProps {
  onBack: () => void;
  brandName: string;
  brandLogo: string;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ onBack, brandName, brandLogo }) => {
  const [showCallPopup, setShowCallPopup] = useState(false);

  return (
    <>
      <NavBar>
        <IconButton onClick={onBack}>
          <FaArrowLeft />
        </IconButton>
        <BrandContainer>
          <BrandLogo src={brandLogo} alt={brandName} />
          <BrandName>{brandName}</BrandName>
        </BrandContainer>
        <IconButton onClick={() => setShowCallPopup(true)}>
          <FaPhone />
        </IconButton>
      </NavBar>
      {showCallPopup && (
        <PopupOverlay onClick={() => setShowCallPopup(false)}>
          <PopupContent onClick={e => e.stopPropagation()}>
            <h3>Call {brandName}</h3>
            <IconButton onClick={() => setShowCallPopup(false)}>
              Close
            </IconButton>
          </PopupContent>
        </PopupOverlay>
      )}
    </>
  );
};

export default NavigationBar; 