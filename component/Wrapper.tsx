import { StyleSheet, Text, View, KeyboardAvoidingView, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react'

const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const insets = useSafeAreaInsets();

    return (
        <KeyboardAvoidingView
            style={[
                styles.container,
                { paddingTop: insets.top, paddingBottom: insets.bottom },
            ]}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            {children}
        </KeyboardAvoidingView>
    )
}

export default Wrapper

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
    },
})