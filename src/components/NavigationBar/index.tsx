import React, { useState } from 'react';
import { FaArrowLeft, FaPhone } from 'react-icons/fa';
import { NavBar, IconButton, BrandContainer, BrandLogo, BrandName, PopupOverlay, PopupContent } from './styles';

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
        <IconButton 
          onClick={onBack} 
          aria-label="back"
        >
          <FaArrowLeft />
        </IconButton>
        <BrandContainer>
          <BrandLogo src={brandLogo} alt={brandName} />
          <BrandName>{brandName}</BrandName>
        </BrandContainer>
        <IconButton 
          onClick={() => setShowCallPopup(true)}
          aria-label="call"
        >
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