import React, { Component } from 'react';
import vibrate from './vibrate';
import { View, Text, StyleSheet, Button, TextInput, Vibration } from 'react-native';


export default class Index extends Component {
    constructor(props){
        super(props);
        console.log(this.props.timerData)
        this.state = {
            mins: 25,
            secs: 0,
            pauseFlag: false,
            btnPlayText: 'Pause',
            brMins: 5,
            brSecs: 0,
            title: 'Work Timer',
            resetText: 'Reset',
        };

    }
    componentDidMount(){
            setInterval(this.defaultStart, 1000)
    }

    cancelVibrate = () => {
        this.setState({resetText: 'Reset', pauseFlag: true});
        console.log('Vib');
        Vibration.cancel();
    }

    setPause = () => {
        if(!this.state.pauseFlag){
            this.setState({pauseFlag : true, btnPlayText: 'Play'})
        }
        else {
            this.setState({pauseFlag : false, btnPlayText: 'Pause'})
        }
    }

    setReset = () => {
        if(this.state.resetText == 'Reset'){
            this.setState({
                mins: 25,
                secs: 0,
                pauseFlag: false,
                btnPlayText: 'Pause',
                brMins: 5,
                brSecs: 0,
                title: 'Work Timer',
            });
        }
        else {
            this.cancelVibrate();
        }
    }

    defaultStart = () => {
        let minsValue = this.state.mins;
        let secsValue = this.state.secs;
        if(!this.state.pauseFlag){
          if(secsValue < 60 && minsValue >= 0) {
                if(secsValue > 0){
                    secsValue--;
                    this.setState({mins: minsValue, secs: secsValue});
                }else if(minsValue !== 0) {
                    secsValue = 59;
                    minsValue--;
                    this.setState({mins: minsValue, secs: secsValue});
                }
                else if(this.state.brMins !== 0 || this.state.brSecs !== 0) {
                    minsValue = this.state.brMins;
                    secsValue = this.state.brSecs;
                    this.setState({mins: minsValue, secs: secsValue, brMins: 0, brSecs: 0, title: 'Break Timer'});
                }
                else if(this.state.brMins === 0 && this.state.brSecs === 0 && minsValue === 0 && secsValue === 0){
                    this.setState({resetText: 'Stop Vibration'});
                    Vibration.vibrate([500, 500, 500]);
                }
            }
        }
    }
    formatTime = (num) => {
        return (num < 10) ? '0' + num : num;
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.headingText}>{this.state.title}</Text>
                <Text style={styles.timeText}>{this.formatTime(this.state.mins) + ':' + this.formatTime(this.state.secs)}</Text>
                <View style={styles.buttonCon}>
                <Button style={styles.btnStyle} title={this.state.btnPlayText} onPress={this.setPause} />
                <Button style={styles.btnStyle} title={this.state.resetText} onPress={this.setReset} />
                
                </View>
                <View style={styles.buttonCon}>
                <Text style={styles.labelText}>Work Time: </Text>
                <Text style={styles.subText}>Mins</Text>
                <TextInput style={styles.inputText} defaultValue="25" keyboardType='numeric' onChangeText={(text) => this.setState({mins: text})} />
                <Text style={styles.subText}>Secs</Text>
                <TextInput style={styles.inputText} defaultValue="00" keyboardType='numeric' onChangeText={(text) => this.setState({secs: text})} />
                </View>
                <View style={styles.buttonCon}>
                <Text style={styles.labelText}>Break Time: </Text>
                <Text style={styles.subText}>Mins</Text>
                <TextInput style={styles.inputText} defaultValue="5" keyboardType='numeric' onChangeText={(text) => this.setState({brMins: text})} />
                <Text style={styles.subText}>Secs</Text>
                <TextInput style={styles.inputText} defaultValue="00" keyboardType='numeric' onChangeText={(text) => this.setState({brSecs: text})} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#71deeb',
      alignItems: 'center',
    },
    headingText: {
        fontSize: 45,
        marginTop: 45,
        fontWeight: '700'
    },
    buttonCon: {
        flexDirection: 'row',
        alignContent: 'space-around',
    },
    btnStyle: {
        marginRight: 15,
    },
    timeText: {
        fontSize: 60,
        marginTop: 15,
    },
    inputText: {
        marginTop: 15,
        height: 40,
        borderColor: '#f0fc',
        borderWidth: 1,
        marginRight: 15,
        paddingLeft: 6
      },
      labelText: {
          fontSize: 35,
          fontWeight: '300',
          marginRight: 5,
          marginTop: 6,
      },
      subText: {
          marginTop: 25,
          marginRight: 5,
      }
  });