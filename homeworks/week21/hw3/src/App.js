import Footer from './components/Footer'
import Form from './components/Form'
import styled from 'styled-components';


const AppWrapper = styled.div`
  margin: 2rem auto;
  padding: 2.1rem 1.4rem;
  text-align: left;
  border-top: 8px solid #fad312;
  max-width: 645px;
  background: #fff;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);

  h1 {
    font-size: 2rem;
    font-weight: 700;
  }

  .info {
    margin: 30px 0 20px;
    font-size: 14px;
    & > p {
      margin-top: 10px;
    }
  }
  .danger {
    color: red;
    font-size: 16px;
    margin-bottom: 40px;
  }
`

function App() {
  return (
    <>
      <AppWrapper>
        <h1>新拖延運動報名表單</h1>
        <div className="info">
          <p>活動日期：2020/12/10 ~ 2020/12/11</p>
          <p>活動地點：台北市大安區新生南路二段1號</p>
        </div>
        <p className="danger">* 必填</p>
        <Form/>
      </AppWrapper>
      <Footer/>
    </>
  );
}

export default App;
