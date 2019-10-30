import * as React from 'react';
import { View, Modal } from 'react-native';
import { connect } from 'react-redux';

import { PepupModalProps } from '.';
import styles from './PepupModal.styles';
import { deviceInfoCheck } from '../../helpers';
import { Loader } from '../../components/Loader/Loader';

export class Component extends React.Component<PepupModalProps> {
  render() {
    const {
      visible,
      heightContent,
      onRequestClose,
      children,
      isLoading
    } = this.props;
    return (
      visible && (
        <View style={styles.overlay}>
          <Loader color="white" size="large" isDataLoaded={!isLoading}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={visible}
              onRequestClose={onRequestClose}>
              <View
                style={[
                  styles.wrapper,
                  { paddingTop: deviceInfoCheck() ? 55 : 25 }
                ]}>
                <View
                  style={[
                    styles.wrapModalContent,
                    { maxHeight: heightContent + 150, height: '100%' }
                  ]}>
                  {children}
                </View>
              </View>
            </Modal>
          </Loader>
        </View>
      )
    );
  }
}

export const PepupModal = connect(
  null,
  null
)(Component);
