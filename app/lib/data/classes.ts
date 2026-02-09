// Classes with lessons
type Lesson = { id: string; title: string; description: string };
type Class = { id: string; name: string; theme: string; lessons: Lesson[] };

export const classes: Class[] = [
  {
    id: 'mobile-app',
    name: 'Create a Mobile App',
    theme: 'purple',
    lessons: [
      { id: 'lesson1', title: "The Feature That Isn't Yours", description: 'Learn about adopting existing features.' },
      { id: 'lesson2', title: "The Happy Accident", description: 'Explore the benefits of unforeseen results.' },
      { id: 'lesson3', title: "The Broken Promise", description: 'Understand when to change course.' },
      { id: 'lesson4', title: "The Handoff", description: 'Master the transfer of work.' }
    ]
  },
  {
    id: 'copilot-students',
    name: 'Microsoft Copilot for Students',
    theme: 'blue',
    lessons: [] // To be filled with actual lesson data
  },
  // Additional classes can be added
];
