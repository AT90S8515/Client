import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { AuthState } from '../reducers/auth';
import Button from './UI/Button';
import { Link } from 'react-router-dom';

const styles = require('./Login.scss');

export interface IProps extends RouteComponentProps<any>, AuthState {
  login({}): void;
}

export interface IState {
  muted: boolean;
}

class Login extends React.Component<IProps, IState> {
  private backgroundVideo: HTMLVideoElement | null;

  public state = {
    muted: false,
  };

  private handleVideoRef = (ref: HTMLVideoElement | null) => {
    // Sometimes the ref is null
    if (!ref) return;

    this.backgroundVideo = ref;
    // Set default volume
    this.backgroundVideo.volume = this.state.muted ? 0.0 : 0.2;
  }

  private handleMutedChange = (checked: boolean) => {
    this.setState({ muted: checked });
    this.backgroundVideo!.volume = checked ? 0.0 : 0.2;
  }

  render() {
    // const { login } = this.props;

    return (
      <div className={styles.container}>
        <video
          ref={this.handleVideoRef}
          autoPlay
          loop
          className={styles.video}
        >
          <source src="./assets/video/login.mp4" type="video/mp4" />
        </video>
        <div className={styles.topContainer}>
          <div className={styles.topContentContainer}>
            <img
              className={styles.logo}
              src="./assets/img/logo.png"
            />
            <div className={styles.loginContainer}>
              <p style={{padding: 3}}>Account Login</p>
              <hr />
              <div className={styles.loginContainerContent}>
                <p>Username</p>
                <input type="text" />
                <p>Password</p>
                <input type="text" />
                <div className={styles.loginContainerAction}>
                  <input type="checkbox" />
                  <p>Remember Username</p>
                  <div style={{flex: 1}} />
                  <div>
                    <Button onClick={() => alert('log in')}>Log In</Button>
                  </div>
                </div>
                <Link style={{color: 'skyblue'}} to="/home">Fuck this I want see the homepage</Link>
                <hr />
                <div className={styles.bottomActions}>
                  <p>Don't have an account? Sign up now!</p>
                  <p>Forgot your username?</p>
                  <p>Forgot your password?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bottomContainer}>
          <input
            type="checkbox"
            checked={this.state.muted}
            onChange={data => this.handleMutedChange(data.target.checked)}
          />
          <p>Disable Login Music</p>
        </div>
      </div>
    );
  }
}

export default Login;
