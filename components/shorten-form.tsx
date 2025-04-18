"use client";

import { FormEvent, useState, useEffect } from "react";
import styled from "styled-components";
import CreateShortUrl from "@/lib/create-short-url";

// styled components
const FormContainer = styled.form`
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

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #34d399;
  }
  box-sizing: border-box;
`;

const AliasWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const AliasPrefix = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0 0.75rem;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-right: none;
  border-radius: 0.5rem 0 0 0.5rem;
  color: #6b7280;
`;

// inherit the styled Input component
const AliasInput = styled(Input)`
  flex: 1;
  border-radius: 0 0.5rem 0.5rem 0;
  border-left: none;
`;

const Button = styled.button`
  background-color: #34d399;
  color: #fff;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  &:hover { background-color: #059669; }
`;

const ErrorMsg = styled.p`
  color: #dc2626;
  font-size: 0.875rem;
`;

// big part of the project here, taking in the inputs, moving data around to where it needs to be
// also all the styling for the actual component which is essentially our entire webpage
export default function ShortenForm({
    onSuccess,
}: {
    onSuccess: (alias: string) => void;
}) {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [error, setError] = useState("");
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    const result = await CreateShortUrl(alias, url);

    if (result.success) {
      onSuccess(alias);
      setUrl("");
      setAlias("");
    } else {
      setError(result.message);
    }
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>Shorten a URL</Title>

      <div>
        <Label>URL</Label>
        <Input
          type="text"
          required
          placeholder="https://example.com/very/long/url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>

      <div>
        <Label>Custom Alias</Label>
        <AliasWrapper>
          <AliasPrefix>
            {origin}/
          </AliasPrefix>
          <AliasInput
            type="text"
            required
            placeholder="your-custom-alias"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
          />
        </AliasWrapper>
      </div>

      {error && <ErrorMsg>{error}</ErrorMsg>}

      <Button type="submit">Shorten</Button>
    </FormContainer>
  );
}
