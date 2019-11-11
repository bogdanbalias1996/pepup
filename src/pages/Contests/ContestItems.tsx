import * as React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Dispatch } from 'redux';
import { openContestModal, getContest, getContestsByCategory } from './actions';
import { ContestItemsProps, Contest } from './';
import {
  colorBlack,
  defaultFont,
  boldFont,
  colorLightOrange,
  colorTextGreyIntro
} from '../../variables';
import { IGlobalState } from '../../coreTypes';
import { Loader } from '../../components/Loader/Loader';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openContestModal: () => dispatch(openContestModal()),
  getContest: (contestId: string) => dispatch(getContest(contestId) as any),
  getContestsByCategory: (id: string) =>
    dispatch(getContestsByCategory(id) as any)
});

const mapStateToProps = (state: IGlobalState) => ({
  isFetching: state.ContestState.isFetching,
  contests: state.ContestState.contests
});

export class Component extends React.PureComponent<ContestItemsProps> {
  componentDidMount() {
    const { getContestsByCategory, categoryId } = this.props;

    getContestsByCategory(categoryId);
  }

  renderItem = ({ item }: any) => {
    const { openContestModal, getContest } = this.props;

    const getModal = () => {
      openContestModal();
      getContest(item.id);
    };

    return (
      <TouchableOpacity
        onPress={() => getModal()}
        style={styles.card}
        activeOpacity={1}>
        <View style={styles.cardHeader}>
          <Text style={styles.text}>{`${item.entries} entries`}</Text>
          <Text style={styles.text}>{`Ends: ${item.endDt}`}</Text>
        </View>
        <View style={styles.wrapTitle}>
          <FastImage
            style={styles.imageLogo}
            source={{
              uri: item.mediaBasePath + item.organizerLogo,
              priority: FastImage.priority.normal
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { isFetching, contests, categoryId } = this.props;

    return (
      <Loader
        isDataLoaded={(contests && contests[categoryId]) || !isFetching}
        color={colorLightOrange}
        size="large">
        <FlatList
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          data={contests[categoryId]}
          renderItem={this.renderItem}
          keyExtractor={(item: Contest) => item.id}
        />
      </Loader>
    );
  }
}

export const ContestItems = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);

const styles = StyleSheet.create({
  card: {
    padding: 24,
    marginBottom: 24,
    marginHorizontal: 6,
    backgroundColor: 'white',
    borderRadius: 24,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 14,
    fontFamily: defaultFont,
    color: colorTextGreyIntro
  },
  wrapTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 24,
    alignItems: 'center'
  },
  imageLogo: {
    width: 72,
    height: 72,
    marginRight: 16,
    borderRadius: 8
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontFamily: boldFont,
    color: colorBlack,
    lineHeight: 24
  }
});
