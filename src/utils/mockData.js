const mockThreads = [
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
  {
    id: 'thread-3',
    title: 'Thread Ketiga',
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium temporibus enim reiciendis, tenetur commodi, quod laudantium ipsum, vitae nostrum animi maiores ad minima iure beatae odio. Qui harum accusamus soluta. Reprehenderit nostrum deserunt quasi animi molestiae ab voluptatum. Sunt aliquid natus dignissimos est itaque iure ducimus laborum sint voluptatum! Iure excepturi corporis voluptas sequi! Saepe repudiandae quos reprehenderit autem odio, voluptates ipsa iusto quas reiciendis numquam optio est sapiente, earum ad neque porro, inventore iure totam dolore? A deserunt doloribus error placeat veniam sit ratione! Nobis quis iure ea possimus? Officia alias maxime tempora quis dolore adipisci, pariatur neque? Vitae! Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium temporibus enim reiciendis, tenetur commodi, quod laudantium ipsum, vitae nostrum animi maiores ad minima iure beatae odio. Qui harum accusamus soluta. Reprehenderit nostrum deserunt quasi animi molestiae ab voluptatum. Sunt aliquid natus dignissimos est itaque iure ducimus laborum sint voluptatum! Iure excepturi corporis voluptas sequi! Saepe repudiandae quos reprehenderit autem odio, voluptates ipsa iusto quas reiciendis numquam optio est sapiente, earum ad neque porro, inventore iure totam dolore? A deserunt doloribus error placeat veniam sit ratione! Nobis quis iure ea possimus? Officia alias maxime tempora quis dolore adipisci, pariatur neque? Vitae!',
    category: 'Fun Fact',
    createdAt: '2026-01-04T07:00:00.000Z',
    ownerId: 'users-3',
    upVotesBy: ['users-1'],
    downVotesBy: ['users-2'],
    totalComments: 0,
  },
];

const detailThread = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  owner: {
    id: 'users-1',
    name: 'John Doe',
    avatar: 'https://generated-image-url.jpg',
  },
  upVotesBy: [],
  downVotesBy: [],
  comments: [
    {
      id: 'comment-1',
      content: 'Ini adalah komentar pertama',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
    },
    {
      id: 'comment-2',
      content: 'Ini adalah komentar kedua',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-2',
        name: 'Jane Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
    },
  ],
};

export { detailThread, mockThreads };
