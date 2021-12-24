import * as React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {gql, useQuery} from 'urql';

import {Story} from '../components/Story';

import {StorySummaryFields} from '../graphql/fragments';
import {
  AllBookmarksQuery,
  AllBookmarksQueryVariables,
} from '../graphql/__generate__/operationTypes';

export const BOOKMARKS_QUERY = gql`
  query allBookmarks {
    bookmarks {
      id
      story {
        ...StorySummaryFields
      }
    }
  }

  ${StorySummaryFields}
`;

export const BookmarksScreen: React.FC = () => {
  const [{data, error, fetching}, refreshBookmarks] = useQuery<
    AllBookmarksQuery,
    AllBookmarksQueryVariables
  >({query: BOOKMARKS_QUERY});

  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefreshBookmarks = React.useCallback(() => {
    setIsRefreshing(true);
    refreshBookmarks({requestPolicy: 'network-only'});
  }, [refreshBookmarks]);

  React.useEffect(() => {
    if (!fetching) {
      setIsRefreshing(false);
    }
  }, [fetching]);

  if (fetching && !isRefreshing) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="grey" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Something went wrong: {error.message}</Text>
      </View>
    );
  }

  return (
    <FlatList
      refreshing={isRefreshing}
      onRefresh={handleRefreshBookmarks}
      contentContainerStyle={styles.flatListContainer}
      style={styles.flatList}
      data={data?.bookmarks}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({item}) => <Story item={item.story} cta="remove" />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContainer: {
    paddingVertical: 20,
  },
  flatList: {
    paddingHorizontal: 20,
  },
  separator: {
    height: 1,
    backgroundColor: 'black',
    marginVertical: 20,
  },
});
