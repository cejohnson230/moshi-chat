import styled from "styled-components";

export const NavBar = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: white;
  border-bottom: 1px solid #dbdbdb;

    @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    height: 60px; // Set explicit height
  }
`;

export const IconButton = styled.button`
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

export const BrandContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  margin-left: 12px;
`;

export const BrandLogo = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
`;

export const BrandName = styled.span`
  font-weight: 600;
  font-size: 16px;
`;

export const PopupOverlay = styled.div`
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

export const PopupContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;