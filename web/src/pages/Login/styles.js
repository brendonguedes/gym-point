import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 8rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: baseline;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
  flex: 1;

  h1,
  ~ div {
    margin-top: 80px;
  }

  h1 {
    color: #fff;
    font-weight: 600;
  }

  h2 {
    color: #fff;
    margin-top: 15px;
    opacity: 0.5;
  }

  form {
    input {
      margin-bottom: 15px;
    }

    button {
      margin-top: 35px;
    }

    span {
      color: var(--color-primary);
      align-self: flex-start;
      margin: 0 0 10px;
    }
  }
`;