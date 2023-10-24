import React from 'react'
import styled from 'styled-components';
import { ImSpinner2 } from 'react-icons/im';

function Loading({ ...props }) {
  return (
    <div {...props}>
      <ImSpinner2 className="spinner" />
    </div>
  )
}

export default styled(Loading)`
  display: flex;
  height: 100vh;
  flex: 1;
  justify-content: center;
  align-items: center;

  .spinner {
    animation: spin 2s linear infinite;
    font-size: 80px;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;