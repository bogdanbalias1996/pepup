import * as React from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import format from 'date-fns/format';
import {Dispatch} from 'redux';

import {openContestModal, getContest, getContestsByCategory} from './actions';

import {ContestItemsProps, Contest} from './';
import {
  colorTextGray,
  colorBlack,
  defaultFont,
  semiboldFont,
  colorBlueberry,
} from '../../variables';
import {IGlobalState} from '../../coreTypes';
import {Loader} from '../../components/Loader/Loader';
import {ErrorModal} from '../../components/ErrorState/ErrorState';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openContestModal: () => dispatch(openContestModal()),
  getContest: (contestId: string) => dispatch(getContest(contestId) as any),
  getContestsByCategory: (id: string) => dispatch(getContestsByCategory(id) as any),
});

const mapStateToProps = (state: IGlobalState) => ({
  isFetching: state.ContestState.isFetching,
  contests: state.ContestState.contests,
});

export class Component extends React.PureComponent<ContestItemsProps> {
  componentDidMount() {
    const {getContestsByCategory, categoryId} = this.props;

    getContestsByCategory(categoryId);
  }
  renderItem = ({item}: any) => {
    const {openContestModal, getContest, isFetching} = this.props;

    const getModal = () => {
      openContestModal();
      getContest(item.id);
    };

    return (
      <Loader size="large" color={colorBlueberry} isDataLoaded={!isFetching}>
        <TouchableOpacity onPress={() => getModal()} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.text}>{`${item.entries} entries`}</Text>
            <Text style={styles.text}>{`Ends: ${item.endDt}`}</Text>
          </View>
          <View style={styles.wrapTitle}>
            <Image
              style={styles.imageLogo}
              source={{uri: item.mediaBasePath + item.organizerLogo}}
              resizeMode="contain"
            />
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      </Loader>
    );
  };

  render() {
    const {isFetching, contests} = this.props;
    return (
      <Loader isDataLoaded={!isFetching} color={colorBlueberry} size="large">
        <FlatList
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          data={contests}
          renderItem={this.renderItem}
          keyExtractor={(item:Contest) => item.id}
        />
      </Loader>
    );
  }
}

export const ContestItems = connect(
  mapStateToProps,
  mapDispatchToProps,
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
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 12,
    fontFamily: defaultFont,
    color: colorTextGray,
  },
  wrapTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 24,
    alignItems: 'center',
  },
  imageLogo: {
    width: 72,
    height: 72,
    marginRight: 16,
    borderRadius: 8,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontFamily: semiboldFont,
    color: colorBlack,
    lineHeight: 24,
  },
});
