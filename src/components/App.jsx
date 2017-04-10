// @flow
import { PureComponent } from 'react';
import logo from '../assets/logo.svg';
import '../assets/App.css';

class App extends PureComponent {
  render() {
    return (
      <div css={style.app}>
        <div css={style.header}>
          <img src={logo} css={style.logo} alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p css={style.intro}>
          To get started, edit <code>src/App.jsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

const style = {
  app: {
    textAlign: 'center',
  },
  logo: {
    animation: 'App-logo-spin infinite 20s linear',
    height: 80,
  },
  header: {
    backgroundColor: '#222',
    height: 150,
    padding: 20,
    color: 'white',
  },
  intro: {
    fontSize: 'large',
  },
};
