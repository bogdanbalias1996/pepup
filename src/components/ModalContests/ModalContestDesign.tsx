import * as React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  Image,
  Modal,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {connect} from 'react-redux';
import ModalBox from 'react-native-modalbox';
import {Dispatch} from 'redux';
import {Formik} from 'formik';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as Yup from 'yup';

import {closeContestTestModal} from '../../pages/Contests/actions';
import {Icon} from '../Icon/Icon';
import {ButtonStyled} from '../ButtonStyled/ButtonStyled';
import {ModalContestTestProps} from '.';
import styles from './ModalContests.styles';
import {
  colorBlack,
  colorLightGradStart,
  colorLightGradEnd,
} from '../../variables';
import {IGlobalState} from '../../coreTypes';
import {TextInputBorderStyled} from '../TextInputStyled/TextInputBorderStyled';
const defaultImage = require('../../../assets/avatarPlaceholder.png');

const mapStateToProps = (state: IGlobalState) => ({
  isModalTestShown: state.ContestState.isModalTestShown,
  contestData: state.ContestState.contestData,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeContestTestModal: () => dispatch(closeContestTestModal()),
});

const TestSchema = Yup.object().shape({
  text: Yup.string().required("Please type person's name"),
});

export class Component extends React.PureComponent<ModalContestTestProps> {
  state = {
    image: null,
  };

  onImageChange = async () => {
    setTimeout(async () => {
      const hanlder = ImagePicker.launchImageLibraryAsync;

      const result = await hanlder({
        allowsEditing: true,
        aspect: [4, 3],
        base64: true,
        quality: 0.5,
      });

      if (!result.cancelled) {
        this.setState({
          image: {
            uri: `data:image/${result.uri.split('.').pop()};base64,${
              result.base64
            }`,
          },
        });
      }
    }, 1000);
  };

  openModalWindow = async () => {
    const perms = [Permissions.CAMERA_ROLL];

    const {status} = await Permissions.askAsync(...perms);

    if (status === 'granted') {
      this.onImageChange();
    }
  };

  handleSubmit = () => {};

  render() {
    const {closeContestTestModal, isModalTestShown, contestData} = this.props;

    return (
      <ModalBox
        isOpen={isModalTestShown}
        swipeToClose={true}
        coverScreen={true}
        useNativeDriver={false}
        swipeArea={100}
        onClosed={() => closeContestTestModal()}
        style={styles.modal}>
        <View style={styles.wrapModalContent}>
          <View style={styles.swiperLine} />
          <Formik
            initialValues={{text: ''}}
            //validationSchema={TestSchema}
            onSubmit={this.handleSubmit}>
            {(props: any) => {
              const {
                values,
                handleSubmit,
                errors,
                touched,
                setFieldValue,
              } = props;
              const formattedErrorString = Object.keys(errors)
                .reduce((acc: Array<string>, key: string) => {
                  const value = (errors as any)[key];
                  if ((touched as any)[key] && acc.indexOf(value) < 0) {
                    acc.push(value);
                  }
                  return acc;
                }, [])
                .join('. ');

              return (
                <View style={styles.wrap}>
                  <ScrollView>
                    <View style={styles.conTitle}>
                      <Image
                        style={styles.avatar}
                        source={{
                          uri:
                            contestData.mediaBasePath +
                            contestData.organizerLogo,
                        }}
                        resizeMode="cover"
                      />
                      <Text style={styles.title}>{contestData.title}</Text>
                    </View>
                    <View style={styles.form}>
                      {Boolean(formattedErrorString) && (
                        <View style={styles.formErrorContainer}>
                          <Text style={styles.formError}>
                            {formattedErrorString}
                          </Text>
                        </View>
                      )}
                      <View style={{justifyContent: 'space-between'}}>
                        {contestData.dataInfo[
                          'contest-info'
                        ].submissionInfo.prompts.map(item => {
                          return (
                            <View style={styles.itemWrap}>
                              <Text style={styles.subTitle}>{item.prompt}</Text>
                              <TextInputBorderStyled
                                name="text"
                                label="Type your description here"
                                inputStyle={{height: 100}}
                                multiline={true}
                                numberOfLines={3}
                                formProps={props}
                              />
                            </View>
                          );
                        })}
                        <View style={styles.itemWrap}>
                          <Text style={styles.subTitle}>
                            Upload your designs
                          </Text>
                          <View style={styles.mediaWrap}>
                            <LinearGradient
                              colors={[colorLightGradEnd, colorLightGradStart]}
                              style={styles.mediaGrad}>
                              <TouchableOpacity
                                style={styles.mediaBtn}
                                activeOpacity={0.8}
                                onPress={() => {
                                  this.openModalWindow();
                                }}>
                                <Icon size={40} name="add" />
                              </TouchableOpacity>
                            </LinearGradient>
                            {this.state.image && (
                              <View style={styles.itemGalleryWrap}>
                                <Image
                                  style={styles.itemGallery}
                                  source={this.state.image}
                                />
                                <TouchableOpacity
                                  style={styles.btnDelete}
                                  onPress={() => this.setState({image: null})}>
                                  <Icon size={10} name="cancel" />
                                </TouchableOpacity>
                              </View>
                            )}
                          </View>
                        </View>
                      </View>
                    </View>
                  </ScrollView>
                  <View style={[styles.modalFooter, styles.modalFooterContest]}>
                    <TouchableOpacity
                      style={styles.btnCancel}
                      onPress={() => closeContestTestModal()}>
                      <Icon size={24} name="cancel" color={colorBlack} />
                    </TouchableOpacity>
                    <ButtonStyled
                      style={styles.btnSubmit}
                      onPress={() => handleSubmit()}
                      text="Submit"
                    />
                  </View>
                </View>
              );
            }}
          </Formik>
        </View>
      </ModalBox>
    );
  }
}

export const ModalContestDesign = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
