import * as React from 'react';
import { TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { withFormik } from 'formik';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import FastImage from 'react-native-fast-image';
import firebase from 'react-native-firebase';

import {
  closeContestQuizModal,
  submitEnrty
} from '../../pages/Contests/actions';
import { Icon } from '../Icon/Icon';
import { ButtonStyled } from '../ButtonStyled/ButtonStyled';
import { PepupModal } from '../PepupModal/PepupModal';
import { ModalContestQuizProps } from './';
import styles from './ModalContests.styles';
import {
  colorBlack,
  colorLightGradStart,
  colorLightGradEnd
} from '../../variables';
import { IGlobalState } from '../../coreTypes';
import { TextInputBorderStyled } from '../TextInputStyled/TextInputBorderStyled';
import { SuccessfulAlert } from '../SuccessfulAlert/SuccessfulAlert';
import { ErrorModal } from '../ErrorState/ErrorState';
import Card from '../Card';
import CardGradient from '../CardGradient';

const mapStateToProps = (state: IGlobalState) => ({
  isModalTestShown: state.ContestState.isModalTestShown,
  contestData: state.ContestState.contestData,
  isFetching: state.ContestState.isFetching,
  submitEntryData: state.ContestState.submitEntryData
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeContestQuizModal: () => dispatch(closeContestQuizModal()),
  submitEnrty: (values: any, id: string, type: string, contestType: string) =>
    dispatch(submitEnrty(values, id, type, contestType) as any)
});
export class Component extends React.Component<ModalContestQuizProps> {
  state = {
    image: null,
    heightDescription: 0
  };

  onImageChange = async () => {
    const { setFieldValue, values, contestData } = this.props;

    setTimeout(async () => {
      const hanlder = ImagePicker.launchImageLibraryAsync;
      const mediaTypeImage =
        contestData.dataInfo['contest-info'].submissionInfo.mediaType ===
        'PHOTO';
      // const mediaTypeImage = false;

      const result = await hanlder({
        mediaTypes: mediaTypeImage
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
        aspect: [4, 3],
        base64: true,
        quality: 0.5
      });

      if (!result.cancelled) {
        let array = values.media.length ? values.media : [];
        array.push({
          mediaItem: {
            id: new Date().getTime(),
            uri: mediaTypeImage
              ? `data:image/${result.uri.split('.').pop()};base64,${
                  result.base64
                }`
              : result.uri,
            type: mediaTypeImage ? 'image' : 'video'
          }
        });
        setFieldValue('media', array);
      }
    }, 0);
  };

  removeItem = (item: any) => {
    const { setFieldValue, values } = this.props;

    setFieldValue(
      'media',
      values.media.filter((val: any) => {
        return item.mediaItem.id !== val.mediaItem.id;
      })
    );
  };

  openModalWindow = async () => {
    const perms = [Permissions.CAMERA_ROLL];

    const { status } = await Permissions.askAsync(...perms);

    if (status === 'granted') {
      this.onImageChange();
      firebase.analytics().logEvent('permissions_gallery_accepted');
    } else {
      firebase.analytics().logEvent('permissions_gallery_denied');
    }
  };

  getMediaElement = (type: boolean, item: any) => {
    return type ? (
      <FastImage
        style={styles.itemGallery}
        source={{
          uri: item,
          priority: FastImage.priority.normal
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    ) : (
      <Video
        source={{
          uri: item
        }}
        resizeMode="cover"
        style={styles.itemGallery}
      />
    );
  };

  isAllFieldsFilled = (obj: any) => {
    for (var i in obj) {
      if (obj[i] === '' || obj[i].length === 0) return false;
    }
    return true;
  };

  render() {
    const {
      closeContestQuizModal,
      isModalTestShown,
      isFetching,
      contestData,
      values,
      handleSubmit,
      errors,
      touched
    } = this.props;
    const requiresMedia =
      contestData.dataInfo['contest-info'].submissionInfo.requiresMedia;
    const mediaTypeImage =
      contestData.dataInfo['contest-info'].submissionInfo.mediaType === 'PHOTO';
    // const mediaTypeImage = false;

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
      <PepupModal
        visible={isModalTestShown}
        onRequestClose={() => closeContestQuizModal()}
        heightContent={this.state.heightDescription}>
        <View style={[styles.upperWrap, {paddingHorizontal: 24}]}>
          <TouchableOpacity
            style={styles.btnCancel}
            onPress={() => closeContestQuizModal()}>
            <Icon size={20} name="cancel" color={colorBlack} />
          </TouchableOpacity>
          <View style={styles.wrap}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={styles.scrollContent}
                onLayout={event => {
                  const { height } = event.nativeEvent.layout;
                  Object.keys(contestData).length !== 0 &&
                    this.setState({ heightDescription: height });
                }}>
                <View style={styles.conTitle}>
                  <Card style={styles.cardAvatar} radius={8}>
                    <CardGradient style={styles.gradient} />
                    <FastImage
                      style={styles.contestImage}
                      source={{
                        uri: `${contestData.mediaBasePath}${
                          contestData.organizerLogo
                        }`,
                        priority: FastImage.priority.normal
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  </Card>
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
                  <View style={{ justifyContent: 'space-between' }}>
                    {contestData.dataInfo[
                      'contest-info'
                    ].submissionInfo.prompts.map((item: any, i: number) => {
                      return (
                        <View style={styles.itemWrap} key={i}>
                          <Text style={styles.subTitle}>{item.prompt}</Text>
                          <TextInputBorderStyled
                            name={`text${i}`}
                            label="Type your description here"
                            inputStyle={{ height: 100 }}
                            multiline={true}
                            numberOfLines={3}
                            formProps={this.props}
                            blurOnSubmit={true}
                          />
                        </View>
                      );
                    })}
                    {requiresMedia && (
                      <View style={styles.itemWrap}>
                        <Text style={styles.subTitle}>Upload your designs</Text>
                        <View style={styles.mediaWrap}>
                          {values.media.length <
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
                            {!!values.media.length &&
                              values.media.map((item: any) => {
                                return (
                                  <View style={styles.itemGalleryWrap}>
                                    {this.getMediaElement(
                                      mediaTypeImage,
                                      item.mediaItem.uri
                                    )}
                                    <TouchableOpacity
                                      style={styles.btnDelete}
                                      onPress={() => this.removeItem(item)}>
                                      <Icon size={10} name="cancel" />
                                    </TouchableOpacity>
                                  </View>
                                );
                              })}
                          </ScrollView>
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </ScrollView>
            <View style={styles.modalFooter}>
              <ButtonStyled
                style={[
                  styles.btnSubmit,
                  { opacity: this.isAllFieldsFilled(values) ? 1 : 0.5 }
                ]}
                loader={isFetching}
                onPress={() =>
                  this.isAllFieldsFilled(values) ? handleSubmit() : {}
                }
                text="Submit"
              />
            </View>
          </View>
        </View>
        <SuccessfulAlert />
        <ErrorModal />
      </PepupModal>
    );
  }
}

const ContestForm = withFormik({
  mapPropsToValues: (props: any) => {
    const questions = props.contestData.dataInfo[
      'contest-info'
    ].submissionInfo.prompts.reduce((acc: any, current: any, i: number) => {
      return { ...acc, [`text${i}`]: '' };
    }, {});

    return { ...questions, media: [] };
  },

  handleSubmit: (values, { props }) => {
    props.submitEnrty(
      values,
      props.contestData.id,
      props.contestData.dataInfo['contest-info'].submissionInfo.mediaType,
      props.contestData.type
    );
  }
})(Component);

export const ModalContestDesign = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContestForm);
