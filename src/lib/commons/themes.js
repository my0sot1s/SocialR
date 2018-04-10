import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const theme = {
  // primaryColor: '#317DEB',
  primaryColor: '#00A0E3',
  primaryColorFade: 'rgba(0, 160, 227, 0.8)',
  secondaryColor: '#06512D',
  // secondaryColor: '#15CA8D',
  underlayColor: 'rgba(49, 125, 235, 1)',
  textColor: '#363C4D',
  tabBackgroundColor: '#363C4D',
  backgroundColor: '#EBEBF3',
  likedColor: '#F2547D',
  divider: 'rgba(0,0,0,0.05)',
  borderStyle: 'solid',
  borderWidth: 1,
  lightBackground: '#fff',
  inactiveColor: '#8293A9',
  smallSizeText: 12,
  defaultPadding: 16,
  defaultMargin: 16,
  radius: 2,
  shadow: {
    shadowColor: 'rgba(0,0,0,0.05)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  leftIcon: 'chevron-left',
  lightOverlay: 'rgba(255, 255, 224, 0.8)'
};

export const styled = {
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 48 / 2
  },
  thumbnail: {
    height: width - 150,
    alignSelf: 'stretch'
  }
};
export const flexCenter = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: "center"
}
export const shadow = {
  shadowOffset: {
    width: 0.75,
    height: 0.75,
  },
  shadowColor: 'rgba(0,0,0,0.3)',
  shadowOpacity: 1.0,
}
export const shadow2 = {
  shadowOffset: {
    width: 1,
    height: 1,
  },
  shadowColor: 'rgba(0,0,0,0.3)',
  shadowOpacity: 1.0,
}
export const relatived = {
  possition: 'ralative',
}