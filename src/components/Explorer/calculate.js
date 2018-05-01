import { Dimensions, StyleSheet } from 'react-native'
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window')

let wp = (percentage) => {
  const value = (percentage * viewportWidth) / 100
  return Math.round(value)
}

export const slideHeight = viewportHeight * 0.58
const slideWidth = wp(95)
const itemHorizontalMargin = wp(1)

export const sliderWidth = viewportWidth
export const itemWidth = slideWidth + itemHorizontalMargin * 2
export const colors = {
  black: '#1a1917',
  black: '#fff',
  gray: '#888888',
  background1: '#B721FF',
  background2: '#21D4FD'
}
const entryBorderRadius = 2
export const styles = StyleSheet.create({
  otherSide: {
    height: 0.22 * viewportHeight,
    backgroundColor: colors.black
  },
  container: {
    flex: 1,
    backgroundColor: colors.black
  },
  // exampleContainer: {
  //   paddingVertical: 30
  // },
  exampleContainerDark: {
    backgroundColor: colors.black
  },
  slider: {
    // height: 0.65 * slideHeight,
    backgroundColor: colors.black,
    // overflow: 'visible' // for custom animations
    overflow: 'hidden' // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 1 // for custom animation

  },
  imageContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius
  },
  imageContainerEven: {
    backgroundColor: colors.black
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius
  },
  slideInnerContainer: {
    paddingLeft: 1,
    width: itemWidth,
    height: slideHeight,
    // paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 1 // needed for shadow
  },
  shadow: {
    position: 'absolute',
    top: 0,
    left: itemHorizontalMargin,
    right: itemHorizontalMargin,
    bottom: 20,
    shadowColor: colors.black,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    borderRadius: entryBorderRadius
  },
  radiusMask: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: entryBorderRadius,
    backgroundColor: 'white'
  },
  radiusMaskEven: {
    backgroundColor: colors.black
  }
})
