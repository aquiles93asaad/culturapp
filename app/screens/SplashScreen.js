import React from 'react';
import { StyleSheet, Image, View, Dimensions, StatusBar, Text } from 'react-native';
// import { ProgressBar } from '../components';
// import { scale, scaleVertical } from '../utils/scale';
import { AuthService } from '../services';
import { LightTheme } from '../themes/theme';

const delay = 500;

export class SplashScreen extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    state = {
        progress: 0,
    };

    authService = new AuthService(false);

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        let naviageTo = '';
        let userLogged = null;
        await this.authService.me()
        .then(user => {
            userLogged = user;
            naviageTo = 'Drawer';
        }).catch(error => {
            console.log(error);
            naviageTo = 'Auth';
        }).finally(() => {
            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            this.setState({ progress: 1 });
            StatusBar.setHidden(true, 'none');
            this.props.navigation.navigate(naviageTo, {user: userLogged});
        })
    };

    componentWillMount() {
        this.timer = setInterval(this.updateProgress, delay);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    updateProgress = () => {
        if (this.state.progress === 1) {
            clearInterval(this.timer);
            setTimeout(this.onLoaded, delay);
        } else {
            const randProgress = this.state.progress + (Math.random() * 0.5);
            this.setState({ progress: randProgress > 1 ? 1 : randProgress });
        }
    };

    onLoaded = () => {
        StatusBar.setHidden(false, 'slide');
    };

    render = () => (
        <View style={styles.container}>
            <View>
                <Image
                    style={[styles.image, { width: Dimensions.get('window').width, height: Dimensions.get('window').height }]}
                    source={require('../../assets/images/splash.png')}
                />
            </View>
            {/* <ProgressBar
                color={LightTheme.colors.accent}
                style={styles.progress}
                progress={this.state.progress}
                width={scale(320)}
            /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: LightTheme.colors.screen.base,
        justifyContent: 'space-between',
        flex: 1,
    },
    image: {
        resizeMode: 'cover',
        // height: scaleVertical(430),
    },
    text: {
        alignItems: 'center',
    },
    hero: {
        fontSize: 37,
    },
    appName: {
        fontSize: 62,
    },
    progress: {
        alignSelf: 'center',
        marginBottom: 35,
        backgroundColor: '#e5e5e5',
    },
});
