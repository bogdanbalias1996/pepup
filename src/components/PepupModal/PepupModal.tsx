import * as React from 'react';
import { View, Modal } from 'react-native';
import Constants from 'expo-constants';
import { connect } from 'react-redux';

import { PepupModalProps } from '.';
import styles from './PepupModal.styles';

export class Component extends React.Component<PepupModalProps> {
  render() {
    const { visible, heightContent, onRequestClose, children } = this.props;
    return (
      visible && (
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '100%',
          }}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onRequestClose}>
            <View
              style={[
                styles.wrapper,
                { paddingTop: Constants.statusBarHeight > 40 ? 50 : 25 },
              ]}>
              <View
                style={[
                  styles.wrapModalContent,
                  { maxHeight: heightContent + 150, height: '100%' },
                ]}>
                {children}
              </View>
            </View>
          </Modal>
        </View>
      )
    );
  }
}

export const PepupModal = connect(
  null,
  null,
)(Component);
