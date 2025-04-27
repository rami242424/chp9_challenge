// src/Components/Header.tsx
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 20px 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 10;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(Link)`
  font-weight: bold;
  font-size: 24px;
  margin-right: 30px;
  color: ${(props) => props.theme.red};
  text-decoration: none;
`;

const Items = styled.ul`
  display: flex;
  gap: 20px;
`;

const Item = styled.li<{ active: boolean }>`
  a {
    color: ${(props) => (props.active ? props.theme.red : props.theme.white.lighter)};
    font-weight: ${(props) => (props.active ? "bold" : "normal")};
    text-decoration: none;
    transition: color 0.3s;
  }
`;

function Header() {
  const location = useLocation();

  return (
    <Nav>
      <Col>
        <Logo to="/">🍿</Logo>
        <Items>
          <Item active={location.pathname === "/"}>
            <Link to="/">Home</Link>
          </Item>
          <Item active={location.pathname.startsWith("/tv")}>
            <Link to="/tv">TV Shows</Link>
          </Item>
        </Items>
      </Col>
      <Col>
        {/* 추후 검색 기능 추가 예정 */}
      </Col>
    </Nav>
  );
}

export default Header;
