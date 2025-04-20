import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const LoadingComponent = () => {
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color={"#4CAF50"} />
    </View>
  )
}

export default LoadingComponent

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 10,
      },
})