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
import {Dispatch} from 'redux';
import {format} from 'date-fns';

import {HistoryItemsProps} from './';
import {
  colorBlack,
  italicFont,
  semiboldFont,
  colorDotGray,
  colorBlueberry,
  colorTextGray,
  boldFont,
  colorStat,
  defaultFont,
} from '../../variables';
import {IGlobalState} from '../../coreTypes';
import {getAllPepups} from './actions';
import {Loader} from '../../components/Loader/Loader';
import {getCeleb} from '../Pepups/actions';

const mapStateToProps = (state: IGlobalState) => ({
  profileData: state.ProfileState.profileData,
  pepups: state.ProfileState.pepups,
  isFetching: state.ProfileState.isFetching,
  celebData: state.PepupState.celebData,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  getAllPepups: () => dispatch(getAllPepups() as any),
  getCeleb: (id: string) => dispatch(getCeleb(id) as any),
});

const kFormatter = (num: number) => {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'K'
    : Math.sign(num) * Math.abs(num);
};

export class Component extends React.PureComponent<HistoryItemsProps> {
  componentDidMount() {
    const {getAllPepups, getCeleb, profileData} = this.props;

    getAllPepups();
    getCeleb(profileData.id);
  }

  renderItem = ({item}: any) => {
    return (
      <TouchableOpacity onPress={() => alert('Open pepup')}>
        <View style={styles.card}>
          <View style={styles.avatarWrap}>
            <Image
              resizeMode="cover"
              style={styles.avatar}
              source={{uri: this.props.profileData.icon}}
            />
          </View>
          <View style={styles.textWrap}>
            <View>
              <Text style={styles.text}>
                {format(item.requestedOn, 'd MMM y')}
              </Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[styles.text, styles.pepupWrap]}>
                {`${this.props.profileData.name} > ${item.requestFor}`}
              </Text>
            </View>
            <View style={styles.pepupWrap}>
              <Text numberOfLines={3} ellipsizeMode="tail" style={styles.pepup}>
                {item.request}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {isFetching, pepups, celebData} = this.props;
    const [rating, totalRating] = celebData.weightedRating.split('/');

    return (
      <Loader isDataLoaded={!isFetching} size="large" color={colorBlueberry}>
        <View style={styles.statistics}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{pepups.length}</Text>
            <Text style={styles.statText}>PEPUPS</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {kFormatter(celebData.billRate * pepups.length)}
            </Text>
            <Text style={styles.statText}>EARNINGS</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{rating}</Text>
            <Text style={styles.statText}>RATING</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{celebData.reviews}</Text>
            <Text style={styles.statText}>REVIEWS</Text>
          </View>
        </View>
        <FlatList
          style={{flex: 1}}
          showsVerticalScrollIndicator={true}
          data={pepups}
          renderItem={this.renderItem}
          keyExtractor={(item: any) => item.id}
        />
      </Loader>
    );
  }
}

export const History = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginRight: 16,
    padding: 14,
    backgroundColor: 'white',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderRadius: 32,
  },
  avatarWrap: {
    borderRightColor: colorDotGray,
    borderRightWidth: 1,
  },
  avatar: {
    width: 90,
    height: 120,
    borderRadius: 16,
    marginRight: 10,
  },
  textWrap: {
    justifyContent: 'flex-start',
    marginLeft: 14,
  },
  text: {
    lineHeight: 24,
    fontSize: 14,
    fontFamily: semiboldFont,
    color: colorBlack,
  },
  pepupWrap: {
    width: 200,
  },
  pepup: {
    lineHeight: 24,
    fontFamily: italicFont,
    fontSize: 14,
    color: colorTextGray,
    marginRight: 14,
  },
  statistics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingBottom: 17,
  },
  statItem: {},
  statNumber: {
    fontFamily: boldFont,
    fontSize: 18,
    textAlign: 'center',
    color: colorStat,
  },
  statText: {
    fontFamily: defaultFont,
    fontSize: 12,
    textAlign: 'center',
    color: colorStat,
  },
});
