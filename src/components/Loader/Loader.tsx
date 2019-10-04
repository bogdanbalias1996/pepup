import * as React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { LoaderProps } from './'

export const Loader = (
  {
    color = '#003980',
    size = 'large',
    children,
    isDataLoaded = false
  }: LoaderProps
) => {
  return isDataLoaded
    ? children
    : (
      <View style={styles.loader}>
        <ActivityIndicator size={size} color={color} />
      </View>
    )
}

const styles = StyleSheet.create({
  loader: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200
  }
})