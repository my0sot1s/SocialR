import React, { PureComponent } from 'react'
import {
	Animated, View, StyleSheet, Image,
	Dimensions, ScrollView, FlatList
} from 'react-native'
import Button from '../commons/Button'
const deviceWidth = Dimensions.get('window').width
const FIXED_BAR_WIDTH = 280
const BAR_SPACE = 10
const MAX_HEIGHT = 320
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		maxHeight: MAX_HEIGHT,
	},
	barContainer: {
		position: 'absolute',
		zIndex: 2,
		bottom: -20,
		flexDirection: 'row',
	},
	track: {
		backgroundColor: '#ccc',
		overflow: 'hidden',
		height: 2,
	},
	bar: {
		backgroundColor: '#5294d6',
		height: 2,
		position: 'absolute',
		left: 0,
		top: 0,
	},
})
export default class ImageSlider extends PureComponent {
	constructor(props) {
		super(props)
		this.ImageListRender = this.ImageListRender.bind(this)
	}
	numItems = this.props.images.length
	itemWidth = 6 || (FIXED_BAR_WIDTH / this.numItems) - ((this.numItems - 1) * BAR_SPACE)
	animVal = new Animated.Value(0)
	calculateImageSize(imageLink) {
		// return imageLink.replace('/upload/', `/upload/c_scale,w_${deviceWidth * 3}/`)
		return imageLink
	}
	ImageListRender(item) {
		return (
			<Button activeOpacity={1}
				style={{ flex: 1, width: deviceWidth, height: MAX_HEIGHT }}
				onPress={this.props.onDoubleClick}>
				<Image
					source={{ uri: this.calculateImageSize(item.url) }}
					style={{ width: deviceWidth, height: MAX_HEIGHT }}
					placeholderColor="#eee"
				/>
			</Button>
		)
	}
	render() {
		let barArray = []
		this.props.images.forEach((image, key) => {
			const scrollBarVal = this.animVal.interpolate({
				inputRange: [deviceWidth * (key - 1), deviceWidth * (key + 1)],
				outputRange: [-this.itemWidth, this.itemWidth],
				extrapolate: 'clamp',
			})

			const thisBar = (
				<View
					key={`bar${key}`}
					style={[
						styles.track,
						{
							width: this.itemWidth,
							height: this.itemWidth,
							borderRadius: this.itemWidth / 2,
							marginLeft: key === 0 ? 0 : BAR_SPACE,
						},
					]}
				>
					<Animated.View
						style={[styles.bar, {
							width: this.itemWidth,
							height: this.itemWidth,
							transform: [
								{ translateX: scrollBarVal },
							]
						},
						]}
					/>
				</View>
			)
			barArray.push(thisBar)
		})
		let renderSubIcon
		return (
			// this.props.images.length > 1 ?
			<View
				style={[styles.container, { position: 'relative' }]}
				flex={1}
			>
				{renderSubIcon}
				<FlatList
					horizontal
					showsHorizontalScrollIndicator={false}
					scrollEventThrottle={10}
					pagingEnabled
					style={{ height: '100%' }
					}
					onScroll={
						Animated.event(
							[{ nativeEvent: { contentOffset: { x: this.animVal } } }]
						)
					}
					data={this.props.images}
					extraData={this.props}
					keyExtractor={(item, index) => index.toString()
					}
					renderItem={({ item }) => this.ImageListRender(item)}
				/>
				< View
					style={styles.barContainer}
				>
					{barArray}
				</View >
			</View >
			// :
			// <View
			// 	style={[styles.container, { position: 'relative' }]}
			// 	flex={1}
			// >
			// 	<ImageListRender url={this.props.images[0]} />
			// </View>
		)
	}
}
