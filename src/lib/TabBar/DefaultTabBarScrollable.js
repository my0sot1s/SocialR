import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, ViewPropTypes, ScrollView } from 'react-native';
import Button from '../commons/Button';
import { theme } from "../commons/themes";
// import { isIos } from '../../utils/platform'

// const propTypes = {
//     goToPage: PropTypes.func,
//     activeTab: PropTypes.number,
//     tabs: PropTypes.array,
//     backgroundColor: PropTypes.string,
//     activeTextColor: PropTypes.string,
//     inactiveTextColor: PropTypes.string,
//     textStyle: Text.propTypes.style,
//     tabStyle: ViewPropTypes.style,
//     renderTab: PropTypes.func,
//     underlineStyle: ViewPropTypes.style,
// };
const borderBottomActived = (borderColor) => (
    {
        borderBottomWidth: 1,
        borderColor: borderColor
    }
)
const defaultProps = {
    activeTextColor: theme.primaryColor,
    inactiveTextColor: theme.inactiveColor,
    backgroundColor: theme.lightBackground,
};

class DefaultTabBarScrollable extends PureComponent {
    renderTabOption(name, page) {
    }

    renderTab = (name, page, isTabActive, onPressHandler) => {
        const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
        const textColor = isTabActive ? activeTextColor : inactiveTextColor;
        const fontWeight = isTabActive ? '600' : 'normal';
        const numberOfTabs = this.props.tabs.length;
        const containerWidth = this.props.containerWidth;
        let tabStyleCustom = isTabActive ? borderBottomActived(activeTextColor) : {};
        if (numberOfTabs <= 4) {
            tabStyleCustom['width'] = containerWidth / numberOfTabs;
        } else {
            tabStyleCustom['paddingHorizontal'] = 8;
        }

        return <Button
            style={[styles.flexOne, tabStyleCustom]}
            key={name}
            accessible={true}
            accessibilityLabel={name}
            accessibilityTraits='button'
            onPress={() => onPressHandler(page)}
        >
            <View style={isTabActive ? [styles.tab, styles.tabActive, this.props.tabStyle,] : [styles.tab, this.props.tabStyle,]}>
                <Text style={[{ color: textColor, fontWeight, fontSize: 14, }, textStyle,]}>
                    {name.toUpperCase()}
                </Text>
            </View>

        </Button >;
    };

    render() {
        // const containerWidth = this.props.containerWidth;
        // const numberOfTabs = this.props.tabs.length;
        // const tabUnderlineStyle = {
        //     position: 'absolute',
        //     width: containerWidth / numberOfTabs,
        //     height: 2,
        //     backgroundColor: theme.primaryColor,
        //     bottom: 0,
        // };

        // const left = this.props.scrollValue.interpolate({
        //     inputRange: [0, 1, ], outputRange: [0,  containerWidth / numberOfTabs, ],
        // });
        return (
            <View style={[styles.tabs, { backgroundColor: this.props.backgroundColor, }, this.props.style,]}>
                <ScrollView
                    horizontal
                    centerContent
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    {this.props.tabs.map((name, page) => {
                        const isTabActive = this.props.activeTab === page;
                        const renderTab = this.props.renderTab || this.renderTab;
                        return renderTab(name, page, isTabActive, this.props.goToPage);
                    })}
                    {/*<Animated.View style={[tabUnderlineStyle, { left, }, this.props.underlineStyle, ]} />*/}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 36
        // borderTopWidth: 2,
        // borderTopColor: 'transparent',
        // borderBottomWidth: 2,
        // borderBottomColor: 'transparent'
    },
    flexOne: {
        flex: 1
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 1,
        borderColor: theme.divider,
        borderColor: "#eee"
    },
    tabActive: {
        // borderBottomColor: theme.primaryColor
    },
    tabBorder: {
        borderRightWidth: 0.5,
        borderRightColor: "#eee",
    }
});

// DefaultTabBarScrollable.propTypes = propTypes;
// DefaultTabBarScrollable.defaultProps = defaultProps;

export default DefaultTabBarScrollable;