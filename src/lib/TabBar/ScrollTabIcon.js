import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';

import TabBarLabelIcon from './TabBarLabelIcon';
import ScrollableTabView from 'react-native-scrollable-tab-view';

export class ScrollViewItem extends React.PureComponent {
    render() {
        return (
            <ScrollView {...this.props}>
                {this.props.children}
            </ScrollView>
        );
    }
}

export default (props) => {
    return <ScrollableTabView
        style={{ backgroundColor: "#fff", ...props.style }} initialPage={0}
        renderTabBar={() => <TabBarLabelIcon />}>
        {props.children}
    </ScrollableTabView>;
}

export const styles = StyleSheet.create({
    tabView: {
        flex: 1,
        // padding: 5,
        backgroundColor: 'rgba(0,0,0,0.01)',
        height: '100%'
        // height:30
    },
    card: {
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: 'rgba(0,0,0,0.1)',
        margin: 5,
        height: 150,
        padding: 15,
        shadowColor: '#ccc',
        shadowOffset: { width: 2, height: 2, },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
});