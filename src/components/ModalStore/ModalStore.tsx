import * as React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  FlatList,
  ScrollView,
  Image
} from "react-native";
import { connect } from "react-redux";
import Modal from "react-native-modalbox";
import ModalSelector from "react-native-modal-selector";

import { closeStoreModal } from "../../pages/Store/actions";
import { Icon } from "../Icon/Icon";
import { ButtonStyled } from "../ButtonStyled/ButtonStyled";
import { ModalStoreProps } from ".";
import styles from "./ModalStore.styles";
import { colorBlack, colorLightGray, boldFont, defaultFont } from "../../variables";

const mapStateToProps = state => ({
  showModal: state.StoreState.showModal
});
const mapDispatchToProps = dispatch => ({
  closeStoreModal: () => dispatch(closeStoreModal())
});

const storeData = {
  title: "Sindhu Signed Olympics 2016 pic",
  description:
    "Sindhu received silver medal at Olympic 2016 in Rio. Personally autographed pic in color.  Free shipping with eligible orders.",
  salePrize: "1550",
  prize: "5,000",
  sale: "15",
  media: [
    {
      id: "01",
      avatar: require("../../../assets/mock_avatar.jpg")
    },
    {
      id: "02",
      avatar: require("../../../assets/mock_avatar.jpg")
    },
    {
      id: "03",
      avatar: require("../../../assets/mock_avatar.jpg")
    },
    {
      id: "04",
      avatar: require("../../../assets/mock_avatar.jpg")
    }
  ]
};

const sizeOptions = [
  {
    key: "1",
    text: "S"
  },
  {
    key: "2",
    text: "M"
  },
  {
    key: "3",
    text: "L"
  }
];

const quantityOptions = [
  { key: 1, label: "1" },
  { key: 2, label: "2" },
  { key: 3, label: "3" },
  { key: 4, label: "4" },
  { key: 5, label: "5" },
  { key: 6, label: "6" },
  { key: 7, label: "7" },
  { key: 8, label: "8" },
  { key: 9, label: "9" },
  { key: 10, label: "10" },
  { key: 11, label: "11" },
  { key: 12, label: "12" },
  { key: 13, label: "13" },
  { key: 14, label: "14" },
  { key: 15, label: "15" },
  { key: 16, label: "16" },
  { key: 17, label: "17" },
  { key: 18, label: "18" }
];

const THRESHOLD = 200;

export class Component extends React.PureComponent<ModalStoreProps> {
  state = {
    heightDescription: 0,
    value: {
      key: "2",
      text: "M"
    },
    quantity: ""
  };
  renderItem = ({ item }) => {
    return (
      <Image
        style={styles.imageCarousel}
        source={item.avatar}
        resizeMode="cover"
      />
    );
  };

  render() {
    const { closeStoreModal, showModal } = this.props;
    const { value } = this.state;
    return (
      <Modal
        position="bottom"
        isOpen={showModal}
        swipeToClose={true}
        coverScreen={true}
        useNativeDriver={false}
        swipeArea={100}
        onClosed={() => closeStoreModal()}
        style={[
          styles.modal,
          {
            marginTop: 50,
            maxHeight: this.state.heightDescription + THRESHOLD,
            height: "100%"
          }
        ]}
      >
        {Object.keys(storeData).length !== 0 ? (
        <View style={styles.wrapModalContent}>
          <View style={styles.swiperLine} />
          <ScrollView style={styles.scrollView}>
            <View
              onLayout={event => {
                const { height } = event.nativeEvent.layout;
                this.setState({ heightDescription: height });
              }}
              style={styles.insidePadding}
            >
              <Text style={styles.title}>{storeData.title}</Text>
              {storeData.media ? (
                <View style={styles.imagesWrap}>
                  <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={storeData.media}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                    style={styles.carousel}
                  />
                </View>
              ) : null}
              <Text style={[styles.text, styles.infoText]}>
                {storeData.description}
              </Text>
              <View style={styles.infoBlock}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Discounted Price</Text>
                  <Text style={styles.infoValue}>
                    {`${storeData.salePrize} INR`}
                  </Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Regular Price</Text>
                  <Text style={styles.infoValue}>
                    {`${storeData.prize} INR`}
                  </Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Discount</Text>
                  <View style={styles.wrapSale}>
                    <Text style={styles.saleText}>
                      {`${storeData.sale}% OFF`}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.wrapChanging}>
                <View style={styles.changeItem}>
                  <Text style={styles.infoLabel}>Choose a size</Text>
                  <View style={styles.sizeWrap}>
                    {sizeOptions.map(item => {
                      return (
                        <TouchableOpacity
                          key={item.key}
                          style={[
                            styles.sizeItem,
                            {
                              backgroundColor:
                                value.key === item.key
                                  ? "#d8d8d8"
                                  : colorLightGray
                            }
                          ]}
                          onPress={() => {
                            this.setState({
                              value: item
                            });
                          }}
                        >
                          <Text
                            style={[
                              styles.sizeItemText,
                              {
                                fontFamily:
                                  value.key === item.key
                                    ? boldFont
                                    : defaultFont
                              }
                            ]}
                          >
                            {item.text}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
                <View style={styles.changeItem}>
                  <Text style={styles.infoLabel}>Choose quantity</Text>
                  <ModalSelector
                    data={quantityOptions}
                    initValue={"0"}
                    onChange={option => {
                      this.setState({ quantity: option.label });
                    }}
                    cancelStyle={styles.modalCancelStyle}
                    overlayStyle={styles.modalOverlayStyle}
                    cancelTextStyle={styles.modalCancelTextStyle}
                    optionContainerStyle={styles.modalOptionContainer}
                    optionTextStyle={styles.modalOptionTextStyle}
                    selectStyle={{ borderRadius: 30, width: 100, padding: 5 }}
                    cancelText="Cancel"
                  />
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.btnCancel}
              onPress={() => closeStoreModal()}
            >
              <Icon size={24} name="cancel" color={colorBlack} />
            </TouchableOpacity>
            <ButtonStyled
              style={styles.btnSubmit}
              onPress={() => alert("ok")}
              text="Buy Now"
            />
          </View>
        </View>
         ) : null}
      </Modal>
    );
  }
}

export const ModalStore = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
