import * as React from 'react';
import { View, Modal } from 'react-native';

import { PepupModalProps } from '.';
import styles from './PepupModal.styles';
import { getTopBarOffset } from '../../helpers';
import { Loader } from '../../components/Loader/Loader';

export class PepupModal extends React.PureComponent<PepupModalProps> {
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
              onRequestClose={onRequestClose}
            >
              <View
                style={[
                  styles.wrapper,
                  heightContent ? { paddingTop: getTopBarOffset() + 10 } : {}                  
                ]}
                >
                <View
                  style={[
                    styles.wrapModalContent,
                    { 
                      maxHeight: heightContent ? heightContent + 150 : '100%', 
                      height: '100%' 
                    }                    
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

export default PepupModal;