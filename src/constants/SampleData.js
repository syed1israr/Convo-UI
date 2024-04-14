export const sampleChats = [
    {
      avatar: ["https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553_640.jpg"],
      name: "John Doe",
      _id: "chat_1",
      groupChat: false,
      members: ["user_1", "user_2"]
    },
    {
      avatar: [
        "https://cdn.pixabay.com/photo/2021/06/15/16/11/man-6339003_640.jpg",
        "https://cdn.pixabay.com/photo/2016/11/22/21/42/woman-1850703_640.jpg",
        "https://cdn.pixabay.com/photo/2020/05/17/20/21/cat-5183427_1280.jpg",
        "https://cdn.pixabay.com/photo/2014/11/29/19/33/bald-eagle-550804_640.jpg",
        "https://cdn.pixabay.com/photo/2020/10/05/08/04/boys-5628502_640.jpg"
      ],
      name: "Alice Bob Charlie",
      _id: "chat_2",
      groupChat: true,
      members: ["user_1", "user_2"]
    },
    // Repeat the modified chat objects as needed
  ];
  
  export const sampleUsers = [
    {
      avatar: "https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553_640.jpg",
      name: "John Doe",
      _id: "user_1",
    },
    {
      avatar: "https://cdn.pixabay.com/photo/2021/06/15/16/11/man-6339003_640.jpg",
      name: "Alice Bob Charlie",
      _id: "user_2",
    },
    // Repeat the modified user objects as needed
  ];
  
  export const SampleNotification = [
    {
      sender: {
        avatar: "https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553_640.jpg",
        name: "John Doe",
      },
      _id: "notification_1",
    },
    {
      sender: {
        avatar: "https://cdn.pixabay.com/photo/2021/06/15/16/11/man-6339003_640.jpg",
        name: "Alice Bob Charlie",
      },
      _id: "notification_2",
    }
  ];
  
  export const sampleMessage = [
    {
      attachments: [
        {
          public_id: "attachment_1",
          url: "https://www.w3schools.com/howto/img_avatar.png"
        }
      ],
      content: "Updated content for the first message.",
      _id: "message_1",
      sender: {
        _id: "user_1",
        name: "Chaman"
      },
      chat: "chat_1",
      createdAt: "2024-02-12T10:41:30.630Z"
    },
    {
      attachments: [
        {
          public_id: "attachment_2",
          url: "https://www.w3schools.com/howto/img_avatar.png"
        }
      ],
      content: "Updated content for the second message.",
      _id: "message_2",
      sender: {
        _id: "user_2",
        name: "Chaman"
      },
      chat: "chat_2",
      createdAt: "2024-03-19T20:10:00.000Z"
    }
    // Repeat the modified message objects as needed
  ];
  
  export const dashboardData = {
    users: [
      {
        name: "John Doe",
        avatar: "https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553_640.jpg",
        _id: "user_1",
        username: "isaq123",
        friends: 20,
        groups: 4
      },
      {
        name: "Alice Bob Charlie",
        avatar: "https://cdn.pixabay.com/photo/2021/06/15/16/11/man-6339003_640.jpg",
        _id: "user_2",
        username: "isaq123",
        friends: 40,
        groups: 65
      }
      // Repeat the modified user objects as needed
    ],
    chats: [
      {
        name: "Chomu Log ka Group",
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        _id: "chat_1",
        groupChat: false,
        members: [
          { name: "John", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
          { name: "Doe", avatar: "https://www.w3schools.com/howto/img_avatar.png" }
        ],
        totalMembers: 2,
        totalMessages: 20,
        creator: {
          name: "Syed Israr",
          avatar: "https://www.w3schools.com/howto/img_avatar.png"
        }
      },
      {
        name: "Awesome Group",
        avatar: ["https://www.example.com/avatar7.png", "https://www.example.com/avatar8.png"],
        _id: "chat_2",
        groupChat: false,
        members: [
            { name: "Alice", avatar: "https://www.example.com/avatar9.png" },
            { name: "Bob", avatar: "https://www.example.com/avatar10.png" },
            { name: "Charlie", avatar: "https://www.example.com/avatar11.png" }
        ],
        totalMembers: 3,
        totalMessages: 50,
        creator: { name: "Alice", avatar: "https://www.example.com/avatar9.png" }
      },
      // Repeat the modified chat objects as needed
    ],
    messages: [
      {
        attachments: [],
        content: "Updated content for the third message.",
        _id: "message_3",
        sender: {
          avatar: "https://www.w3schools.com/howto/img_avatar.png",
          name: "Chaman"
        },
        chat: "chat_1",
        groupChat: true,
        createdAt: "2024-03-11T12:00:00Z"
      },
      {
        attachments: [
          {
            public_id: "attachment_3",
            url: "https://www.w3schools.com/howto/img_avatar.png"
          }
        ],
        content: "Updated content for the fourth message.",
        _id: "message_4",
        sender: {
          avatar: "https://www.w3schools.com/howto/img_avatar.png",
          name: "Chaman"
        },
        chat: "chat_1",
        groupChat: false,
        createdAt: "2024-03-11T12:00:00Z"
      }
      // Repeat the modified message objects as needed
    ]
  };
  