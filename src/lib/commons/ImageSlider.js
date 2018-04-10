import React, { PureComponent } from 'react'
import { Animated, View, StyleSheet, Image, Dimensions, ScrollView, FlatList } from 'react-native'
const deviceWidth = Dimensions.get('window').width
const FIXED_BAR_WIDTH = 280
const BAR_SPACE = 10
const MAX_HEIGHT = 280
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
		top: 10,
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

	numItems = this.props.images.length
	itemWidth = 8 || (FIXED_BAR_WIDTH / this.numItems) - ((this.numItems - 1) * BAR_SPACE)
	animVal = new Animated.Value(0)
	calculateImageSize(imageLink) {
		return imageLink.replace('/upload/', `/upload/c_scale,w_${deviceWidth * 3}/`)
	}
	render() {
		let ImageListRender = (item) =>
			<Image
				source={{ uri: this.calculateImageSize(item.url) }}
				style={{ width: deviceWidth }}
				placeholderColor="#eee"
			/>

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
							marginLeft: key === 0 ? 0 : BAR_SPACE,
						},
					]}
				>
					<Animated.View
						style={[styles.bar, {
							width: this.itemWidth,
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
		// if (this.props.images.length > 1)
		return (
			<View
				style={styles.container}
				flex={1}
			>
				<FlatList
					horizontal
					showsHorizontalScrollIndicator={false}
					scrollEventThrottle={10}
					pagingEnabled
					style={{ height: '100%' }}
					onScroll={
						Animated.event(
							[{ nativeEvent: { contentOffset: { x: this.animVal } } }]
						)}
					data={this.props.images}
					extraData={this.props}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item }) => ImageListRender(item)}
				/>
				<View
					style={styles.barContainer}
				>
					{barArray}
				</View>
			</View>
		)
		// else return (
		// 	<ImageListRender url={this.props.images[0]} />
		// )
	}
}
