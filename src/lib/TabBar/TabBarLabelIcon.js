import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../Button'
import { H1, H2, H3 } from '../H'
const borderBottomActived = (borderColor) => (
    {
        borderBottomWidth: 1,
        borderColor: borderColor
    }
)
class ScrollTabIcon extends React.PureComponent {
    constructor(props) {
        super(props);
        this.icons = [];
    }
    render() {
        return <View>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={[styles.tabs, this.props.style]}>
                {this.props.tabs.map((tab, i) => {
                    return <Button key={tab} onPress={() => this.props.goToPage(i)}
                        style={[styles.tab,
                        this.props.activeTab === i
                            ? borderBottomActived(`#00a0e3`) : {}
                        ]}>
                        <Icon
                            name={tab}
                            size={25}
                            color={this.props.activeTab === i ? '#00a0e3' : 'rgb(204,204,204)'}
                            ref={(icon) => { this.icons[i] = icon; }}
                        />
                    </Button>
                })}
            </ScrollView>
        </View>
    }
}

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
        height: 40,
        // paddingVertical: 5,
    },
    tabs: {
        height: 40,
        flexDirection: 'row',
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
});

export default ScrollTabIcon;