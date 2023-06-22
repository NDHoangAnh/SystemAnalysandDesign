import styled from "styled-components";

export default styled.div`
  height: 100vh;
  overflow: hidden;
  .grid-container {
    height: 100vh;
  }
  .background-image {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .box {
    margin: 23% 4%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .avatar {
    background-color: #9c27b0;
  }
  .round-border {
    margin: 1%;
  }
  .text-field {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .button {
    margin-top: 3%;
    margin-bottom: 2%;
  }
  .pointer {
    cursor: pointer;
  }
`;
