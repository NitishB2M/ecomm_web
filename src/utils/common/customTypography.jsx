
const CustomProductTypography = ({
  variant = 'body1',
  component = 'p',
  className = '',
  fontSize = 16,
  fontFamily = 'Poppins, sans-serif',
  color = '#000',
  hoverColor = '#222',
  cursor = 'pointer',
  textAlign = 'left',
  fontWeight = 'normal',
  lineHeight = 'normal',
  textDecoration = 'none',
  textTransform = 'none',
  letterSpacing = 'normal',
  lineThrough = 'none',
  children,
}) => {
  return(
    <div
      variant={variant}
      component={component}
      className={className}
      sx={{
        fontSize: { xs: fontSize, sm: fontSize, md: fontSize },
        fontFamily: fontFamily,
        color: color,
        ':hover': { color: hoverColor },
        cursor: cursor,
        textAlign: textAlign,
        fontWeight: fontWeight,
        lineHeight: lineHeight,
        textDecoration: textDecoration,
        textTransform: textTransform,
        letterSpacing: letterSpacing,
        textDecorationLine: lineThrough
      }}
    >
      {children}
    </div>
  )
}

export { CustomProductTypography }