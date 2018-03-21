import React, { PureComponent } from 'react';
import { View, Text, FlatList, Button, TextInput } from 'react-native'

class InitScreen extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            HOST: `ws://192.168.22.104:5000`,
            message: [],
            text: '',
            group: null,
            cid: null
        }
        this.socket = null
        this.broadcastMessage = this.broadcastMessage.bind(this)
        this.errorEvent = this.errorEvent.bind(this)
        this.closeEvent = this.closeEvent.bind(this)
        this.onMessage = this.onMessage.bind(this)
    }
    componentWillMount() {
        this.socket = new WebSocket(this.state.HOST)
    }
    componentDidMount() {
        this.socket.addEventListener('error', this.errorEvent)
        this.socket.addEventListener('close', this.closeEvent)
        this.socket.addEventListener('message', this.onMessage)
    }
    errorEvent(e) {
        this.setState(prevState => {
            return { message: [...prevState.message, `error: ${e}`] }
        })
    }
    closeEvent(reasson) {
        this.setState(prevState => {
            this.send(`${this.state.cid} close`, `session_close`)
            this.socket.close()
            this.socket = null
            return {
                message: [...prevState.message,
                `close: ${reasson}`]
            }
        })
    }
    onMessage(ms) {
        let message = JSON.parse(ms.data)
        this.setState(prevState => {
            return {
                message: [...prevState.message, message],
                cid: message.cid
            }
        })
    }
    sendMessage(messageData, type = 'message_sent') {
        this.socket.send(JSON.stringify({
            cid: this.state.cid,
            msg: messageData, type
        }))
    }
    broadcastMessage(messageData, room = 'common') {
        this.socket.send(JSON.stringify({
            cid: this.state.cid,
            room, msg: messageData
        }))
    }
    joinRoom(roomName) {
        this.socket.send(JSON.stringify({
            cid: this.state.cid,
            room: roomName, type: 'session_join'
        }));
        this.setState({ group: roomName })
    }
    leftRoom(roomName) {
        this.socket.send(JSON.stringify({
            cid: this.state.cid,
            room: roomName, type: 'session_left'
        }));
        this.setState({ group: null })
    }
    sendMessage() {
        if (this.state.text) {
            this.broadcastMessage(this.state.text, this.state.group);
            this.setState({ text: null })
        }
    }
    componentWillUnmount() {
        this.socket.removeEventListener('error', this.errorEvent)
        this.socket.removeEventListener('close', this.closeEvent)
        this.socket.removeEventListener('message', this.onMessage)
        this.socket = null
    }
    toString(data) {
        if (typeof data === 'object') {
            return `${data.cid}-${data.msg || data.type}`
        }
        // return `${data.cid}-${data.msg | data.type}`
        // return JSON.stringify(data)
        if (typeof data === 'string') return data
    }
    render() {
        return (
            <View style={{ marginTop: 30 }}>
                <Text>websocket</Text>
                <View>
                    <Text>Group:darwin</Text>
                </View>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(text) => this.setState({ HOST })}
                    value={this.state.HOST}
                />
                <Button title="Join group" onPress={() => this.joinRoom('darwin')} />
                <Button title="Left group" onPress={() => this.leftRoom('darwin')} />
                <FlatList
                    data={this.state.message}
                    renderItem={({ item }) => <Text>{this.toString(item)}</Text>} />
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}
                />
                <Button title="Send" onPress={() => this.sendMessage()} />
            </View>
        );
    }
}



export default InitScreen;