import * as React from 'react';
import {TouchableOpacity, Text, View, ScrollView, Image} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {connect} from 'react-redux';
import ModalBox from 'react-native-modalbox';
import {Dispatch} from 'redux';
import {withFormik} from 'formik';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import {closeContestTestModal, submitEnrty} from '../../pages/Contests/actions';
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

const mapStateToProps = (state: IGlobalState) => ({
  isModalTestShown: state.ContestState.isModalTestShown,
  contestData: state.ContestState.contestData,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeContestTestModal: () => dispatch(closeContestTestModal()),
  submitEnrty: (values: any, id: string) =>
    dispatch(submitEnrty(values, id) as any),
});
export class Component extends React.Component<ModalContestTestProps> {
  state = {
    image: null,
  };

  onImageChange = async () => {
    const {setFieldValue, values} = this.props;

    setTimeout(async () => {
      const hanlder = ImagePicker.launchImageLibraryAsync;

      const result = await hanlder({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        base64: true,
        quality: 0.5,
      });

      if (!result.cancelled) {
        let array = values.images.length ? values.images : [];
        array.push({
          image: {
            id: new Date().getTime(),
            uri: `data:image/${result.uri.split('.').pop()};base64,${
              result.base64
            }`,
          },
        });
        setFieldValue('images', array);
      }
    }, 1000);
  };

  removeItem = item => {
    const {setFieldValue, values} = this.props;

    let array = values.images;
    const newArray = array.filter(val => {
      return item.image.id !== val.image.id;
    });

    setFieldValue('images', newArray);
  };

  openModalWindow = async () => {
    const perms = [Permissions.CAMERA_ROLL];

    const {status} = await Permissions.askAsync(...perms);

    if (status === 'granted') {
      this.onImageChange();
    }
  };

  render() {
    const {
      closeContestTestModal,
      isModalTestShown,
      contestData,
      values,
      handleSubmit,
      errors,
      touched,
    } = this.props;

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
          <View style={styles.wrap}>
            <ScrollView>
              <View style={styles.conTitle}>
                <Image
                  style={styles.avatar}
                  source={{
                    uri: contestData.mediaBasePath + contestData.organizerLogo,
                  }}
                  resizeMode="cover"
                />
                <Text style={styles.title}>{contestData.title}</Text>
              </View>
              <View style={styles.form}>
                {Boolean(formattedErrorString) && (
                  <View style={styles.formErrorContainer}>
                    <Text style={styles.formError}>{formattedErrorString}</Text>
                  </View>
                )}
                <View style={{justifyContent: 'space-between'}}>
                  {contestData.dataInfo[
                    'contest-info'
                  ].submissionInfo.prompts.map((item, i) => {
                    return (
                      <View style={styles.itemWrap}>
                        <Text style={styles.subTitle}>{item.prompt}</Text>
                        <TextInputBorderStyled
                          name={`text${i}`}
                          label="Type your description here"
                          inputStyle={{height: 100}}
                          multiline={true}
                          numberOfLines={3}
                          formProps={this.props}
                        />
                      </View>
                    );
                  })}
                  <View style={styles.itemWrap}>
                    <Text style={styles.subTitle}>Upload your designs</Text>
                    <View style={styles.mediaWrap}>
                      {values.images.length <
                        contestData.dataInfo['contest-info'].submissionInfo
                          .limitMedia && (
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
                      )}
                      <ScrollView horizontal>
                        {values.images.length
                          ? values.images.map(item => {
                              return (
                                <View style={styles.itemGalleryWrap}>
                                  <Image
                                    style={styles.itemGallery}
                                    source={{uri: item.image.uri}}
                                  />
                                  <TouchableOpacity
                                    style={styles.btnDelete}
                                    onPress={() => this.removeItem(item)}>
                                    <Icon size={10} name="cancel" />
                                  </TouchableOpacity>
                                </View>
                              );
                            })
                          : null}
                      </ScrollView>
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
        </View>
      </ModalBox>
    );
  }
}

const ContestForm = withFormik({
  mapPropsToValues: props => {
    const questions = props.contestData.dataInfo[
      'contest-info'
    ].submissionInfo.prompts.reduce((acc, current, i) => {
      return {...acc, [`text${i}`]: ''};
    }, {});

    return {...questions, images: []};
  },

  handleSubmit: (values, {props}) => {
    // props.submitEnrty(values, props.contestData.id);
    console.log(values);
  },
})(Component);

export const ModalContestDesign = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContestForm);
