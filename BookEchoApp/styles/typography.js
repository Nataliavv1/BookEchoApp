// Definim les fonts i estils

const typography = {
    // Fonts base Urbanist i Raleway
    fontFamilyUrbanist: 'Urbanist',
    fontFamilyRaleway: 'Raleway',
  
    // H1
    H1Light: {
      fontSize: 24,
      lineHeight: 28,
      letterSpacing: 0,
      fontFamily: 'Urbanist',
      fontWeight: '300', // Light
    },
    H1Regular: {
      fontSize: 24,
      lineHeight: 28,
      letterSpacing: 0,
      fontFamily: 'Urbanist',
      fontWeight: '400', // Regular
    },
    H1Medium: {
      fontSize: 24,
      lineHeight: 28,
      letterSpacing: 0,
      fontFamily: 'Urbanist',
      fontWeight: '500', // Medium
    },
    H1SemiBold: {
      fontSize: 24,
      lineHeight: 28,
      letterSpacing: 0,
      fontFamily: 'Urbanist',
      fontWeight: '600', // SemiBold
    },
    H1Bold: {
      fontSize: 24,
      lineHeight: 28,
      letterSpacing: 0,
      fontFamily: 'Urbanist',
      fontWeight: '700', // Bold
    },
    H1ExtraBold: {
      fontSize: 24,
      lineHeight: 28,
      letterSpacing: 0,
      fontFamily: 'Urbanist',
      fontWeight: '800', // ExtraBold
    },
    H1Black: {
      fontSize: 24,
      lineHeight: 28,
      letterSpacing: 0,
      fontFamily: 'Urbanist',
      fontWeight: '900', // Black
    },
  
    // H2
    H2Light: {
      fontSize: 20,
      lineHeight: 24,
      letterSpacing: 0,
      fontFamily: 'Urbanist',
      fontWeight: '300', // Light
    },
    H2Regular: {
      fontSize: 20,
      lineHeight: 24,
      letterSpacing: 0,
      fontFamily: 'Urbanist',
      fontWeight: '400', // Regular
    },
    H2Medium: {
      fontSize: 20,
      lineHeight: 24,
      letterSpacing: 0,
      fontFamily: 'Urbanist',
      fontWeight: '500', // Medium
    },
    H2SemiBold: {
      fontSize: 20,
      lineHeight: 24,
      letterSpacing: 0,
      fontFamily: 'Urbanist',
      fontWeight: '600', // SemiBold
    },
    H2Bold: {
      fontSize: 20,
      lineHeight: 24,
      letterSpacing: 0,
      fontFamily: 'Urbanist',
      fontWeight: '700', // Bold
    },
    H2ExtraBold: {
      fontSize: 20,
      lineHeight: 24,
      letterSpacing: 0,
      fontFamily: 'Urbanist',
      fontWeight: '800', // ExtraBold
    },
    H2Black: {
      fontSize: 20,
      lineHeight: 24,
      letterSpacing: 0,
      fontFamily: 'Urbanist',
      fontWeight: '900', // Black
    },
  
    // H3
    H3Light: {
      fontSize: 18,
      lineHeight: 22,
      letterSpacing: 0,
      fontFamily: 'Urbanist',
      fontWeight: '300', // Light
    },
    H3Regular: {
      fontSize: 18,
      lineHeight: 22,
      letterSpacing: 0,
      fontFamily: 'Urbanist',
      fontWeight: '400', // Regular
    },
    H3Medium: {
      fontSize: 18,
      lineHeight: 22,
      letterSpacing: 0,
      fontFamily: 'Urbanist',
      fontWeight: '500', // Medium
    },
    H3SemiBold: {
      fontSize: 18,
      lineHeight: 22,
      letterSpacing: 0,
      fontFamily: 'Urbanist',
      fontWeight: '600', // SemiBold
    },
    H3Bold: {
      fontSize: 18,
      lineHeight: 22,
      letterSpacing: 0,
      fontFamily: 'Urbanist',
      fontWeight: '700', // Bold
    },
    H3ExtraBold: {
      fontSize: 18,
      lineHeight: 22,
      letterSpacing: 0,
      fontFamily: 'Urbanist',
      fontWeight: '800', // ExtraBold
    },
    H3Black: {
      fontSize: 18,
      lineHeight: 22,
      letterSpacing: 0,
      fontFamily: 'Urbanist',
      fontWeight: '900', // Black
    },
  
    // Subtitle
    subtitleLight: {
      fontSize: 16,
      lineHeight: 20,
      letterSpacing: 0,
      fontFamily: 'Raleway',
      fontWeight: '300', // Light
    },
    subtitleRegular: {
      fontSize: 16,
      lineHeight: 20,
      letterSpacing: 0,
      fontFamily: 'Raleway',
      fontWeight: '400', // Regular
    },
    subtitleMedium: {
      fontSize: 16,
      lineHeight: 20,
      letterSpacing: 0,
      fontFamily: 'Raleway',
      fontWeight: '500', // Medium
    },
    subtitleSemiBold: {
      fontSize: 16,
      lineHeight: 20,
      letterSpacing: 0,
      fontFamily: 'Raleway',
      fontWeight: '600', // SemiBold
    },
    subtitleBold: {
      fontSize: 16,
      lineHeight: 20,
      letterSpacing: 0,
      fontFamily: 'Raleway',
      fontWeight: '700', // Bold
    },
    subtitleExtraBold: {
      fontSize: 16,
      lineHeight: 20,
      letterSpacing: 0,
      fontFamily: 'Raleway',
      fontWeight: '800', // ExtraBold
    },
    subtitleBlack: {
      fontSize: 16,
      lineHeight: 20,
      letterSpacing: 0,
      fontFamily: 'Raleway',
      fontWeight: '900', // Black
    },
  
    // Body
    bodyLight: {
      fontSize: 16,
      lineHeight: 20,
      letterSpacing: 0,
      fontFamily: 'Raleway',
      fontWeight: '300', // Light
    },
    bodyRegular: {
      fontSize: 16,
      lineHeight: 20,
      letterSpacing: 0,
      fontFamily: 'Raleway',
      fontWeight: '400', // Regular
    },
    bodyMedium: {
      fontSize: 16,
      lineHeight: 20,
      letterSpacing: 0,
      fontFamily: 'Raleway',
      fontWeight: '500', // Medium
    },
    bodySemiBold: {
      fontSize: 16,
      lineHeight: 20,
      letterSpacing: 0,
      fontFamily: 'Raleway',
      fontWeight: '600', // SemiBold
    },
    bodyBold: {
      fontSize: 16,
      lineHeight: 20,
      letterSpacing: 0,
      fontFamily: 'Raleway',
      fontWeight: '700', // Bold
    },
    bodyExtraBold: {
      fontSize: 16,
      lineHeight: 20,
      letterSpacing: 0,
      fontFamily: 'Raleway',
      fontWeight: '800', // ExtraBold
    },
    bodyBlack: {
      fontSize: 16,
      lineHeight: 20,
      letterSpacing: 0,
      fontFamily: 'Raleway',
      fontWeight: '900', // Black
    },
  
    // Button
    buttonLight: {
      fontSize: 16,
      lineHeight: 20,
      letterSpacing: 0,
      fontFamily: 'Urbanist',
      fontWeight: '300', // Light
    },
    buttonRegular: {
      fontSize: 16,
      lineHeight: 20,
      letterSpacing: 0,
      fontFamily: 'Urbanist',
      fontWeight: '400', // Regular
    },
    buttonMedium: {
      fontSize: 16,
      lineHeight: 20,
      letterSpacing: 0,
      fontFamily: 'Urbanist',
      fontWeight: '500', // Medium
    },
    buttonSemiBold: {
      fontSize: 16,
      lineHeight: 20,
      letterSpacing: 0,
      fontFamily: 'Urbanist',
      fontWeight: '600', // SemiBold
    },
    buttonBold: {
      fontSize: 16,
      lineHeight: 20,
      letterSpacing: 0,
      fontFamily: 'Urbanist',
      fontWeight: '700', // Bold
    },
    buttonExtraBold: {
      fontSize: 16,
      lineHeight: 20,
      letterSpacing: 0,
      fontFamily: 'Urbanist',
      fontWeight: '800', // ExtraBold
    },
  
    // Label
    labelLight: {
      fontSize: 14,
      lineHeight: 18,
      letterSpacing: 0,
      fontFamily: 'Raleway',
      fontWeight: '300', // Light
    },
    labelRegular: {
      fontSize: 14,
      lineHeight: 18,
      letterSpacing: 0,
      fontFamily: 'Raleway',
      fontWeight: '400', // Regular
    },
    labelMedium: {
      fontSize: 14,
      lineHeight: 18,
      letterSpacing: 0,
      fontFamily: 'Raleway',
      fontWeight: '500', // Medium
    },
    labelSemiBold: {
      fontSize: 14,
      lineHeight: 18,
      letterSpacing: 0,
      fontFamily: 'Raleway',
      fontWeight: '600', // SemiBold
    },
    labelBold: {
      fontSize: 14,
      lineHeight: 18,
      letterSpacing: 0,
      fontFamily: 'Raleway',
      fontWeight: '700', // Bold
    },
    labelExtraBold: {
      fontSize: 14,
      lineHeight: 18,
      letterSpacing: 0,
      fontFamily: 'Raleway',
      fontWeight: '800', // ExtraBold
    },
    labelBlack: {
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0,
      fontFamily: 'Raleway',
      fontWeight: '900', // Black
    },
  
    // Footer
    footerLight: {
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0,
      fontFamily: 'Raleway',
      fontWeight: '300', // Light
    },
    footerRegular: {
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0,
      fontFamily: 'Raleway',
      fontWeight: '400', // Regular
    },
    footerMedium: {
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0,
      fontFamily: 'Raleway',
      fontWeight: '500', // Medium
    },
    footerSemiBold: {
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0,
      fontFamily: 'Raleway',
      fontWeight: '600', // SemiBold
    },
    footerBold: {
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0,
      fontFamily: 'Raleway',
      fontWeight: '700', // Bold
    },
    footerExtraBold: {
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0,
      fontFamily: 'Raleway',
      fontWeight: '800', // ExtraBold
    },
    footerBlack: {
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0,
      fontFamily: 'Raleway',
      fontWeight: '900', // Black
    },
  };
  
  export default typography;
  