import * as React from 'react';
import { AuthState } from '../reducers/auth';
import { login } from '../actions/auth';
import Button from './UI/Button';
import { Formik, FormikProps, Form, Field, FieldProps } from 'formik';
import * as Yup from 'yup';
import LocalStorage from '../LocalStorage';

const styles = require('./Login.scss');

export interface IProps extends AuthState {
  login: typeof login;
}

export interface IState {
  muted: boolean;
}

interface IFormValues {
  username: string;
  password: string;
  rememberMe: boolean;
}

class Login extends React.Component<IProps, IState> {
  private backgroundVideo: HTMLVideoElement | null;

  public state = {
    muted: LocalStorage.instance.data!.loginMusicMuted,
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
    LocalStorage.instance.mutateAndSave((data) => {
      data.loginMusicMuted = checked;
      return data;
    });
  }

  private handleLogIn = (values: IFormValues) => {
    if (values.rememberMe) {
      LocalStorage.instance.mutateAndSave((data) => {
        data.username = values.username;
        return data;
      });
    }

    this.props.login({
      username: values.username,
      password: values.password,
    });
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
              <p style={{ padding: 3 }}>Account Login</p>
              <hr />
              <div className={styles.loginContainerContent}>
                <Formik
                  initialValues={{
                    username: LocalStorage.instance.data!.username,
                    password: '',
                    rememberMe: Boolean(LocalStorage.instance.data!.username),
                  } as IFormValues}
                  validationSchema={Yup.object().shape({
                    username: Yup.string().min(3, 'too short').required(),
                    password: Yup.string().min(3, 'too short').required(),
                  })}
                  onSubmit={this.handleLogIn}
                  render={(bag: FormikProps<IFormValues>) => (
                    <Form>
                      <p>Username</p>
                      <Field name="username" render={(fieldProps: FieldProps<IFormValues>) =>
                        <input type="text" {...fieldProps.field} />
                      } />
                      <p>Password</p>
                      <Field name="password" render={(fieldProps: FieldProps<IFormValues>) =>
                        <input type="password" {...fieldProps.field} />
                      } />
                      <div className={styles.loginContainerAction}>
                        <Field name="rememberMe" render={(fieldProps: FieldProps<IFormValues>) =>
                          <input type="checkbox" {...fieldProps.field} />
                        } />
                        <p>Remember Username</p>
                        <div style={{ flex: 1 }} />
                        <div>
                          <Button
                            onClick={bag.submitForm}
                            disabled={!bag.isValid || bag.isSubmitting}
                          >Log In</Button>
                        </div>
                      </div>
                    </Form>
                  )}
                />
                <hr />
                <div className={styles.bottomActions}>
                  <p>Don't have an account? Sign up now!</p>
                  <p>Forgot your username?</p>
                  <p>Forgot your password?</p>
                </div>
              </div>
            </div>
            <div className={styles.disclaimerContainer}>
              <p>
                League of Memories is a free to play, community based version of League of Legends back in season 4.
              </p>
              <p className={styles.disclaimerSmall}>
              League of Memories isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
              </p>
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
