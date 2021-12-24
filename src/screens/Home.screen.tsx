import * as React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {gql, useQuery} from 'urql';

/* Component */
import {Story} from '../components/Story';

/* Graphql */
import {StorySummaryFields} from '../graphql/fragments';
import {
  AllStoriesQuery,
  AllStoriesQueryVariables,
} from '../graphql/__generate__/operationTypes';

const STORIES_QUERY = gql`
  query AllStories {
    stories {
      ...StorySummaryFields
    }
  }

  ${StorySummaryFields}
`;

export const HomeScreen: React.FC = () => {
  const [{data, fetching, error}, refreshStories] = useQuery<
    AllStoriesQuery,
    AllStoriesQueryVariables
  >({query: STORIES_QUERY});

  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefreshStories = React.useCallback(() => {
    setIsRefreshing(true);
    refreshStories({requestPolicy: 'network-only'});
  }, [refreshStories]);

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
      onRefresh={handleRefreshStories}
      contentContainerStyle={styles.flatListContainer}
      style={styles.flatList}
      data={data?.stories}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({item}) => <Story item={item} cta="add" />}
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
