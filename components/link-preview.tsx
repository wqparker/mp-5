"use client";

import { useState } from "react";
import styled from "styled-components";

// styled components, with some hover logic for buttons and such 
const PreviewContainer = styled.div`
  background: #fff;
  border-radius: 1rem;
  padding: 1.5rem;
  max-width: 64rem;
  margin: 2rem auto;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-sizing: border-box;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
`;

const UrlContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 0.5rem;
`;

const ShortUrl = styled.div`
  flex: 1;
  padding: 0.5rem 1rem;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CopyButton = styled.button`
  background-color: #34d399;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  &:hover { background-color: #059669; }
`;

const SuccessMessage = styled.p`
  color: #059669;
  font-size: 0.875rem;
  text-align: center;
  margin: 0;
`;

// simple object to pass when we give just the shorturl over
type Props = {
  shortUrl: string;
};

// the linkpreview component, to be shown when we make a short url, some logic to handle copying the url
export default function LinkPreview({ shortUrl }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <PreviewContainer>
      <Title>Your Shortened URL</Title>
      <UrlContainer>
        <ShortUrl>{shortUrl}</ShortUrl>
        <CopyButton onClick={handleCopy}>
          {copied ? "Copied!" : "Copy"}
        </CopyButton>
      </UrlContainer>
      {copied && <SuccessMessage>URL copied to clipboard!</SuccessMessage>}
    </PreviewContainer>
  );
}
