// home page. need header, shortenform, and linkpreview components
"use client";

import { useState } from "react";
import styled from "styled-components";
import Header from "@/components/header";
import ShortenForm from "@/components/shorten-form";
import LinkPreview from "@/components/link-preview";

// styled components
const Main = styled.main`
  background-color: #ecfdf5;
  min-height: 100vh;
  padding: 2rem 1rem;
`;

const Container = styled.div`
  max-width: 64rem;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  text-align: center;
  color: #6b7280;
  margin-bottom: 2rem;
`;

// have the main components of the webpage, check to handle success of the form working 
// and then call the linkpreview component with its params
export default function HomePage() {
  const [shortUrl, setShortUrl] = useState<string | null>(null);

  const handleSuccess = (alias: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || location.origin;
    setShortUrl(`${baseUrl}/${alias}`);
  };

  return (
    <>
      <Header />
      <Main>
        <Container>
          <Title>URL Shortener</Title>
          <Subtitle>
            Shorten your long URLs into compact, shareable links
          </Subtitle>

          <ShortenForm onSuccess={handleSuccess} />
          
          {shortUrl && <LinkPreview shortUrl={shortUrl} />}
        </Container>
      </Main>
    </>
  );
}
