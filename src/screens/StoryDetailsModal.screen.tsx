import * as React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {gql, useQuery} from 'urql';
import {useRoute, RouteProp} from '@react-navigation/core';

/* Types */
import {RootStackParamList} from '../types';
import {
  StoryByIdQuery,
  StoryByIdQueryVariables,
} from '../graphql/__generate__/operationTypes';

const STORY_BY_ID = gql`
  query StoryById($id: ID!) {
    story(id: $id) {
      author
      id
      summary
      text
      title
    }
  }
`;

export const StoryDetailsModal: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'StoryDetailsModal'>>();
  const [{data, fetching, error}] = useQuery<
    StoryByIdQuery,
    StoryByIdQueryVariables
  >({
    query: STORY_BY_ID,
    variables: {id: route.params.id},
  });

  if (fetching) {
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

  if (!data?.story) {
    return (
      <View style={styles.container}>
        <Text>Story not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      <Text style={styles.author}>by {data.story.author}</Text>
      <Text style={styles.summary}>{data.story.summary}</Text>
      <Text style={styles.text}>{data.story.text}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    padding: 20,
  },
  author: {
    fontStyle: 'italic',
    fontSize: 16,
    color: 'grey',
    marginBottom: 20,
  },
  summary: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
    textAlign: 'justify',
    color: 'gray',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    color: 'gray',
  },
});
