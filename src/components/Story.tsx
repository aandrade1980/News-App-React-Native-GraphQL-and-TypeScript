import * as React from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {gql, useMutation} from 'urql';

import {RootStackParamList} from '../types';
import {
  AddBookmarkMutation,
  AddBookmarkMutationVariables,
  RemoveBookmarkMutation,
  RemoveBookmarkMutationVariables,
  StorySummaryFieldsFragment,
} from '../graphql/__generate__/operationTypes';
import {StorySummaryFields} from '../graphql/fragments';

const ADD_BOOKMARK_MUTATION = gql`
  mutation AddBookmark($storyId: ID!) {
    addBookmark(storyId: $storyId) {
      id
      story {
        ...StorySummaryFields
      }
    }
  }
  ${StorySummaryFields}
`;

const REMOVE_BOOKMARK_MUTATION = gql`
  mutation RemoveBookmark($bookmarkId: ID!) {
    removeBookmark(bookmarkId: $bookmarkId)
  }
`;

export const Story: React.FC<{
  item: StorySummaryFieldsFragment;
  cta: 'add' | 'remove';
}> = ({item, cta}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [{fetching: isAddingBookmark}, addBookmark] = useMutation<
    AddBookmarkMutation,
    AddBookmarkMutationVariables
  >(ADD_BOOKMARK_MUTATION);

  const [{fetching: isRemovingBookmark}, removeBookmark] = useMutation<
    RemoveBookmarkMutation,
    RemoveBookmarkMutationVariables
  >(REMOVE_BOOKMARK_MUTATION);

  const handleAddBookmark = React.useCallback(async () => {
    const result = await addBookmark({storyId: item.id});

    if (result.error && result.error.message.includes('You are offline!')) {
      Alert.alert(
        'You are offline!',
        'Please connect to the internet to add this story to your bookmark',
      );
    }
  }, [addBookmark, item.id]);

  const handleremoveBookmark = React.useCallback(async () => {
    const result = await removeBookmark({
      bookmarkId: item.bookmarkId as string,
    });

    if (result.error && result.error.message.includes('You are offline!')) {
      Alert.alert(
        'You are offline!',
        'Please connect to the internet to remove this story to your bookmark',
      );
    }
  }, [removeBookmark, item.bookmarkId]);

  return (
    <Pressable
      onPress={() => navigation.navigate('StoryDetailsModal', {...item})}>
      <View style={styles.row}>
        <Text style={styles.title}>
          {item.title} {item.bookmarkId ? '🔖' : ''}
        </Text>
        {!item.bookmarkId && !isAddingBookmark && cta === 'add' ? (
          <Pressable onPress={handleAddBookmark}>
            <Text style={styles.action}>Add Bookmark</Text>
          </Pressable>
        ) : null}
        {item.bookmarkId && !isRemovingBookmark && cta === 'remove' ? (
          <Pressable onPress={handleremoveBookmark}>
            <Text style={styles.action}>Remove Bookmark</Text>
          </Pressable>
        ) : null}
        {isAddingBookmark || isRemovingBookmark ? <ActivityIndicator /> : null}
      </View>
      <Text style={styles.summary}>{item.summary}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '400',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: 'black',
  },
  summary: {
    fontSize: 18,
    color: 'gray',
  },
  row: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  action: {
    color: 'black',
  },
});
