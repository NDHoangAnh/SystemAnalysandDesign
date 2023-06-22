import styled from "styled-components";

export default styled.div`
  height: 100vh;
  overflow: hidden;
  .grid-container {
    height: 100vh;
  }
  .box {
    margin: 20% 4%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .background-image {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .avatar {
    background-color: #9c27b0;
  }
  .round-border {
    margin: 1%;
  }
  .form-box {
    margin-top: 3%;
  }
  .button {
    margin-top: 3%;
    margin-bottom: 2%;
  }
`;
