import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  padding-bottom: 50px;
  height: 100%;
`;

export const Col2 = styled.div`
  display: flex;
  flex: 1;
`;

export const Col3 = styled.div`
  display: flex;
  width: 100%;
  flex: 2;

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

    hr {
      opacity: 0.3;
      margin-top: 5px;
      margin-bottom: 20px;
    }
  }
`;