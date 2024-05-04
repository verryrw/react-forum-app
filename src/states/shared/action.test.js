import { describe, it, beforeEach, afterEach, vi } from 'vitest';
import api from '../../utils/network-api';
/*
 * skenario test
 *
 * - asyncPopulateUsersAndThreads thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

// fake data
const fakeThreadsResponse = [
  {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
  {
    id: 'thread-2',
    title: 'Thread Kedua',
    body: 'Ini adalah thread kedua',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-2',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

const fakeUsersResponse = [
  {
    id: 'users-1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
  {
    id: 'users-2',
    name: 'Jane Doe',
    email: 'jane@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncPopulateUsersAndThreads thunk', () => {
  // backup and restore
  beforeEach(() => {
    api.getUsersBackup = api.getUsers;
    api.getThreadsBackup = api.getThreads;
  });

  afterEach(() => {
    api.getUsers = api.getUsersBackup;
    api.getThreads = api.getThreadsBackup;

    delete api.getUsersBackup;
    delete api.getThreadsBackup;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    api.getUsers = () => Promise.resolve(fakeUsersResponse);
    api.getThreads = () => Promise.resolve(fakeThreadsResponse);

    // action
    const dispatch = vi.fn();

    // assert
  });
});
