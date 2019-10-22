import * as React from "react";
import { TouchableOpacity, Text, View, ScrollView, Image } from "react-native";
import { connect } from "react-redux";
import Modal from "react-native-modalbox";
import format from "date-fns/format";
import { Dispatch } from "redux";

import {
  closeContestModal,
  openContestTestModal
} from "../../pages/Contests/actions";
import { Icon } from "../../components/Icon/Icon";
import { ButtonStyled } from "../../components/ButtonStyled/ButtonStyled";
import { ModalContestsProps } from "./";
import styles from "./ModalContests.styles";
import { colorBlack } from "../../variables";
import { IGlobalState } from "../../coreTypes";
import { ModalContestTest } from "./ModalContestTest";
import { ModalContestDesign } from "./ModalContestDesign";

const mapStateToProps = (state: IGlobalState) => ({
  isModalShown: state.ContestState.isModalShown,
  contestData: state.ContestState.contestData
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeContestModal: () => dispatch(closeContestModal()),
  openContestTestModal: () => dispatch(openContestTestModal())
});

const media = [
  {
    id: "01",
    avatar: require("../../../assets/mock_avatar.jpg")
  }
];

const THRESHOLD = 200;

export class Component extends React.PureComponent<ModalContestsProps> {
  state = {
    heightDescription: 0
  };

  render() {
    const {
      closeContestModal,
      isModalShown,
      contestData,
      openContestTestModal
    } = this.props;

    if (!contestData) return null;

    const parsedContestData = contestData.data
      ? JSON.parse(contestData.data)
      : {};

    return (
      <Modal
        position="bottom"
        isOpen={isModalShown}
        swipeToClose={true}
        coverScreen={true}
        useNativeDriver={false}
        swipeArea={100}
        onClosed={() => closeContestModal()}
        style={[
          styles.modal,
          {
            maxHeight: this.state.heightDescription + THRESHOLD,
            height: "100%",
            marginTop: 50
          }
        ]}
      >
        {Object.keys(contestData).length !== 0 ? (
          <View style={styles.wrapModalContent}>
            <View style={styles.swiperLine} />
            <ScrollView>
              <View
                onLayout={event => {
                  const { height } = event.nativeEvent.layout;
                  Object.keys(contestData).length !== 0 &&
                    this.setState({ heightDescription: height });
                }}
              >
                <Image
                  style={styles.image}
                  source={media[0].avatar}
                  resizeMode="cover"
                />
                <Text style={styles.title}>{contestData.title}</Text>
                <Text style={styles.descriptionTitle}>Contest details:</Text>
                <Text style={[styles.text, styles.infoText]}>
                  {parsedContestData.details}
                </Text>
                <Text style={styles.descriptionTitle}>Contest rules:</Text>
                <Text style={[styles.text, styles.infoText]}>
                  {parsedContestData.rules}
                </Text>
                <View style={styles.infoBlock}>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Prize</Text>
                    <Text style={styles.infoValue}>{contestData.prize}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>End Date</Text>
                    <Text style={styles.infoValue}>
                      {format(contestData.endDate, "d MMM y")}
                    </Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Participants</Text>
                    <Text style={styles.infoValue}>{contestData.entries}</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.btnCancel}
                onPress={() => closeContestModal()}
              >
                <Icon size={24} name="cancel" color={colorBlack} />
              </TouchableOpacity>
              <ButtonStyled
                style={styles.btnSubmit}
                onPress={() => openContestTestModal()}
                text="Enter contest"
              />
            </View>
          </View>
        ) : null}
        {contestData.type === 'QUIZ' ? <ModalContestTest /> : <ModalContestDesign />}
      </Modal>
    );
  }
}

export const ModalContests = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
