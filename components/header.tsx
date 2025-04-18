// simple header component
import styled from "styled-components";

const HeaderContainer = styled.header`
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const Wrapper = styled.div`
  max-width: 64rem;
  margin: 0 auto;
  padding: 1rem;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #111827;
  margin: 0;
`;

export default function Header() {
  return (
    <HeaderContainer>
      <Wrapper>
        <Title>CS391 URL Shortener</Title>
      </Wrapper>
    </HeaderContainer>
  );
}
