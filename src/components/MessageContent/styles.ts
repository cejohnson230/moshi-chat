import styled from "styled-components";

export const LinkPreviewWrapper = styled.div`
  margin: 8px 0;
  max-width: 300px;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  cursor: pointer;
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

export const PreviewContent = styled.div`
  padding: 12px;
`;

export const PreviewTitle = styled.div`
  font-weight: bold;
  margin-bottom: 4px;
`;

export const PreviewDescription = styled.div`
  font-size: 0.9em;
  color: #666;
`;