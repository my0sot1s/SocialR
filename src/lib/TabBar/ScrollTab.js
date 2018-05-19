import React, { PureComponent } from 'react'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import DefaultTabBarScrollable from "./DefaultTabBarScrollable"



/**
 * useage:
    <ScrollableTabView >
        <Exam tabLabel="React" />
        <Exam tabLabel="Angular" />
        <Exam tabLabel="JQuery" />
        <Exam tabLabel="1111" />
    </ScrollableTabView>
 */

export default class ScrollTab extends PureComponent {
  changeTab(...args) {
    let { onChangeTab } = this.props
    onChangeTab && this.props.onChangeTab(args)
  }

  render() {
    return <ScrollableTabView
      renderTabBar={() => <DefaultTabBarScrollable />}
      prerenderingSiblingsNumber={0}
      onChangeTab={this.changeTab.bind(this)}
      locked={false}
      scrollWithoutAnimation={false}
      {...this.props}
    >
      {this.props.children}
    </ScrollableTabView>
  }
}
