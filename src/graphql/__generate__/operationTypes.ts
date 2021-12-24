export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Bookmark = {
  __typename?: 'Bookmark';
  id: Scalars['ID'];
  story: Story;
};

export type Mutation = {
  __typename?: 'Mutation';
  addBookmark?: Maybe<Bookmark>;
  removeBookmark?: Maybe<Scalars['Boolean']>;
};

export type MutationAddBookmarkArgs = {
  storyId: Scalars['ID'];
};

export type MutationRemoveBookmarkArgs = {
  bookmarkId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  bookmarks?: Maybe<Array<Bookmark>>;
  stories?: Maybe<Array<Story>>;
  story?: Maybe<Story>;
};

export type QueryStoryArgs = {
  id: Scalars['ID'];
};

export type Story = {
  __typename?: 'Story';
  author?: Maybe<Scalars['String']>;
  bookmarkId?: Maybe<Scalars['ID']>;
  id: Scalars['ID'];
  summary: Scalars['String'];
  text?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type _Fragment = {
  __typename?: 'Story';
  id: string;
  bookmarkId?: string | null | undefined;
};

export type AddBookmarkMutationVariables = Exact<{
  storyId: Scalars['ID'];
}>;

export type AddBookmarkMutation = {
  __typename?: 'Mutation';
  addBookmark?:
    | {
        __typename?: 'Bookmark';
        id: string;
        story: {
          __typename?: 'Story';
          id: string;
          title: string;
          summary: string;
          bookmarkId?: string | null | undefined;
        };
      }
    | null
    | undefined;
};

export type RemoveBookmarkMutationVariables = Exact<{
  bookmarkId: Scalars['ID'];
}>;

export type RemoveBookmarkMutation = {
  __typename?: 'Mutation';
  removeBookmark?: boolean | null | undefined;
};

export type StorySummaryFieldsFragment = {
  __typename?: 'Story';
  id: string;
  title: string;
  summary: string;
  bookmarkId?: string | null | undefined;
};

export type AllBookmarksQueryVariables = Exact<{[key: string]: never}>;

export type AllBookmarksQuery = {
  __typename?: 'Query';
  bookmarks?:
    | Array<{
        __typename?: 'Bookmark';
        id: string;
        story: {
          __typename?: 'Story';
          id: string;
          title: string;
          summary: string;
          bookmarkId?: string | null | undefined;
        };
      }>
    | null
    | undefined;
};

export type AllStoriesQueryVariables = Exact<{[key: string]: never}>;

export type AllStoriesQuery = {
  __typename?: 'Query';
  stories?:
    | Array<{
        __typename?: 'Story';
        id: string;
        title: string;
        summary: string;
        bookmarkId?: string | null | undefined;
      }>
    | null
    | undefined;
};

export type StoryByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type StoryByIdQuery = {
  __typename?: 'Query';
  story?:
    | {
        __typename?: 'Story';
        author?: string | null | undefined;
        id: string;
        summary: string;
        text?: string | null | undefined;
        title: string;
      }
    | null
    | undefined;
};
