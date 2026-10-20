// Mock version — abhi real API call nahi ho rahi, dummy data return ho raha hai
// Jab OpenAI credit available ho, is function ko real API call se replace kar denge

const mockQuestionBank = {
  'DBMS': {
    Beginner: [
      'What is DBMS and how is it different from a file system?',
      'What is a Primary key and foreign key?',
      'What is the difference between DBMS and RDBMS?',
      'What is the difference between data and information',
      'What is the difference between a table and a database?',
    ],
    Intermediate: [
      'Explain normalization and why it is needed.',
      'What is the difference between 2NF and 3NF?',
      'What are ACID properties in a transaction?',
      'What is the difference between clustered and non-clustered indexes?',
      'What is a database transaction, and how does transaction management work?',
    ],
    Advanced: [
      'Explain deadlock in DBMS and how it can be prevented.',
      'What is the difference between optimistic and pessimistic concurrency control?',
      'Explain indexing and its impact on query performance.',
      'What is denormalization and when would you use it?',
      'Explain isolation levels in transactions and their trade-offs.',
    ],
  },
  'SQL': {
    Beginner: [
      'What is SQL, and what is it used for?',
      'What is the difference between DDL, DML, DCL, and TCL?',
      'What is the difference between SELECT and SELECT DISTINCT?',
      'What is the difference between WHERE and ORDER BY?',
      'What is a NULL value in SQL?',
    ],
    Intermediate: [
      'Explain different types of JOINs in SQL.',
      'What is the difference between WHERE and HAVING?',
      'What is a subquery, and when would you use it?',
      'Write an SQL query to find the second-highest salary in an Employee table.',
      'How do primary keys and foreign keys maintain data integrity?',
    ],
    Advanced: [
      'What is a correlated subquery, and when would you use it?',
      'Explain window functions with an example.',
      'What is a stored procedure and how is it different from a function?',
      'How would you optimize a slow SQL query?',
      'What is the difference between clustered and non-clustered indexes?',
    ],
  },
  'OOPs': {
    Beginner: [
      'What is a class and an object?',
      'What is encapsulation?',
      'What is inheritance?',
      'What is the difference between a method and a function?',
      'What is a constructor?',
    ],
    Intermediate: [
      'What is polymorphism? Explain with an example.',
      'What is the difference between overloading and overriding?',
      'What is an abstract class?',
      'What is an interface and how is it different from an abstract class?',
      'What is the difference between a static method and an instance method?',
    ],
    Advanced: [
      'Explain the difference between composition and inheritance? When would you prefer composition?',
      'What are SOLID principles?',
      'What is method resolution order in multiple inheritance?',
      'What is the diamond problem and how is it solved?',
      'Explain the concept of virtual functions.',
    ],
  },
  'Operating System': {
    Beginner: [
      'What is an operating system, and what are its main functions?',
      'What is the difference between a process and a thread?',
      'What is virtual memory??',
      'What is multitasking?',
      'What is the difference between RAM and ROM?',
    ],
    Intermediate: [
      'What are the four necessary conditions for a deadlock?',
      'What is context switching, and why is it needed?',
      'Explain FCFS, SJF, and Round Robin CPU scheduling algorithms.',
      'What is the difference between user mode and kernel mode?',
      'Explain the difference between paging and segmentation?',
    ],
    Advanced: [
      'Explain the Bankers algorithm for deadlock avoidance.',
      'What is thrashing and how can it be avoided?',
      'How does a page replacement algorithm work? Compare FIFO and LRU.',
      'Explain semaphores and mutex locks. How do they prevent race conditions?',
      'What happens internally when multiple processes compete for the same shared resource?',
    ],
  },
  'Computer Networks': {
    Beginner: [
      'What is a computer network?',
      'What is an IP address?',
      'What is the difference between LAN, MAN and WAN?',
      'What is a router?',
      'What is the difference between TCP and UDP?',
    ],
    Intermediate: [
      'Explain the OSI model layers.',
      'What is the difference between IPv4 and IPv6?',
      'How does the TCP three-way handshake work?',
      'What is the difference between a switch, router, and hub?',
      'What is the difference between HTTP and HTTPS?',
    ],
    Advanced: [
      'Explain how NAT works.',
      'What is the difference between a proxy server and a load balancer?',
      'What is congestion control in TCP?',
      'Explain subnetting and CIDR notation.',
      'What is the difference between symmetric and asymmetric encryption?',
    ],
  },
  'Data Structures & Algorithms': {
    Beginner: [
      'What is the difference between an array and a linked list?',
      'What is a linked list?',
      'What is the difference between a stack and a queue?',
      'What is time complexity?',
      'What is the difference between linear search and binary search?',
    ],
    Intermediate: [
      'What is a binary search tree?',
      'Explain BFS and DFS.',
      'What is the time complexity of quicksort?',
      'How would you detect a cycle in a linked list?',
      'Given an array of integers, how would you find the maximum sum of a contiguous subarray?',
    ],
    Advanced: [
      'How would you detect a cycle in a linked list?',
      'Explain dynamic programming with an example.',
      "What is the difference between Dijkstra's and Bellman-Ford algorithm?",
      'How do you balance a binary search tree (AVL/Red-Black)?',
      'Explain time and space complexity trade-offs in your approach to a problem.',
    ],
  },
  'Software Engineering': {
    Beginner: [
      'What is software engineering',
      'What is SDLC, and what are its main phases?',
      'What is the difference between verification and validation??',
      'What is software testing?',
      'What is the purpose of software documentation??',
    ],
    Intermediate: [
      'Explain the difference between the Waterfall and Agile models.',
      'What is the difference between unit testing, integration testing, and system testing?',
      'What is regression testing, and why is it important??',
      'What is version control, and how does Git help developers?',
      'What is the difference between functional and non-functional requirements?',
    ],
    Advanced: [
      'How would you handle changing requirements during an ongoing software project?',
      'How would you identify the root cause of a bug that appears only in production?',
      'How would you design a testing strategy for a large web application?',
      'What is continuous integration and continuous delivery (CI/CD), and how do they improve software quality?',
      'How would you balance software quality, delivery deadlines, and limited development resources?',
    ],
  },
  'System Design Basics': {
    Beginner: [
      'What is client-server architecture?',
      'What is an API?',
      'What is system design, and why is it important?',
      'What is the difference between vertical and horizontal scaling?',
      'What is caching, and why is it used?',
    ],
    Intermediate: [
      'What is load balancing, and how does it work?',
      'What is the difference between SQL and NoSQL databases??',
      'What is a content delivery network (CDN)?',
      'What is horizontal vs vertical scaling?',
      'What is database replication, and how does it improve availability?',
    ],
    Advanced: [
      'How would you design a URL shortening service like Bitly?',
      'Explain database sharding.',
      'What is the difference between monolithic and microservices architecture?',
      'How would you design a rate-limiting system for a public API?',
      'What is eventual consistency and where is it used?',
    ],
  },
  'JavaScript': {
    Beginner: [
      'What is a variable in JavaScript?',
      'What is the difference between let, const and var?',
      'What is a function?',
      'What is an array in JavaScript?',
      'What is a loop used for?',
    ],
    Intermediate: [
      'What is the difference between == and ===?',
      'What are closures with an example?',
      'What is the difference between let, const, and block scope?',
      'What is the difference between synchronous and asynchronous JavaScript?',
      'What is the difference between map(), filter(), and reduce()?',
    ],
    Advanced: [
      'Explain the difference between call, apply, and bind.',
      'What is prototypal inheritance in JavaScript?',
      'Explain async/await and how it differs from promises.',
      'How would you identify and fix a memory leak in a JavaScript application?',
      'What is the difference between deep copy and shallow copy?',
    ],
  },
  'React': {
    Beginner: [
      'What is React and why is it used?',
      'What is JSX?',
      'What is a component?',
      'What is the difference between props and state?',
      'What is the purpose of the useState hook?',
    ],
    Intermediate: [
      'What is the useEffect hook, and when is it used?',
      'What is prop drilling, and how can it be avoided??',
      'What is conditional rendering?',
      'What is the key prop and why is it important?',
      'What is the difference between controlled and uncontrolled components?',
    ],
    Advanced: [
      'How does React reconciliation work?',
      'How would you optimize a React application that frequently re-renders?',
      'What is the difference between useMemo and useCallback?',
      'What is the Context API and when would you use it?',
      "How does React's Fiber architecture improve rendering performance?",
    ],
  },
}

export async function generateQuestions(topics, level) {
  // Real API call ki jagah, thoda delay simulate kar rahe hain (jaise AI soch raha ho)
  await new Promise((resolve) => setTimeout(resolve, 1500))

  let questions = []
  topics.forEach((topic) => {
    if (mockQuestionBank[topic] && mockQuestionBank[topic][level]) {
      questions = [...questions, ...mockQuestionBank[topic][level]]
    }
  })

  if (questions.length === 0) {
    questions = ['Tell us about yourself.', 'Why do you want this role?']
  }

  return questions
}