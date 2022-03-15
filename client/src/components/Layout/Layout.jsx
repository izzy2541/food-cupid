// Import react modules
import React from 'react';

//Import npm packages
import styled from 'styled-components';

const ContentWrap = styled.div`
  margin-top: 0rem;
  margin-bottom: 0rem;
  flex: 1;
`;

const Layout = props => (
  <ContentWrap>
    {props.children}
  </ContentWrap>
);

export default Layout