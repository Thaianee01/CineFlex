import styled from 'styled-components';

export default function Header() {
  return (
    <HeaderContainer>
      <Logo src="/logo.svg" alt="CineFlex" />
      <Title>CineFlex</Title>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: 67px;
  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  flex-direction: row;
  gap: 10px;

  padding: 10px;
  background-color:#EE897F;
  box-sizing: border-box;
`;

const Logo = styled.img`
  width: 40px;
  height: 40px;
`;

const Title = styled.h1`
  font-size: 34px;
  font-weight: 600;
  color: #FADBC5;
  font-family: 'Raleway', sans-serif;
`;