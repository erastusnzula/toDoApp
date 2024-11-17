React Native Todo App
=========================

Project Overview
----------------
The React Native Todo app is a simple application that allows users to manage their tasks. It provides functionality to add, edit, delete, and mark tasks as complete.

Features
--------
1.	Task Management: Add, edit, delete, and mark tasks as completed.
2.	Responsive UI: Compatible with Android devices.
3.	State Persistence: Tasks are saved locally using AsyncStorage.
4.	Interactive Interface: User-friendly interface.

Approach
----------
**1.	Planning:**

    1. Defined the core features
    2. Created  the UI flow.

**2.	Development Process:**

    1. Initialized the project using expo-cli.

    2. Used React Native components (e.g., FlatList TextInput, TouchableOpacity) for building the interface.

    3. Styled with StyleSheet for a consistent look and feel.
    4. Managed state locally using React's useState and useEffect hooks.

    5. Implemented data persistence using AsyncStorage to save tasks between app sessions.

    6. Integrated React Navigation for seamless transitions between screens.

**3. Testing:**

    1. Performed manual testing on Android.

Challenges & Solutions
---------------------
1.	Data Persistence Issue

    Integrated AsyncStorage to persist task data. Used useEffect to load and save tasks during app initialization and changes.

2.	UI Responsiveness

    Used Flexbox and percentage-based dimensions to create a responsive design.

3.  Navigation Bugs

    Properly configured React Navigation stack and passed states explicitly between screens.

Future Enhancements
--------------------
1. Reminders for incomplete tasks.
2. Integrate with Firebase.
3. Allow users to organize tasks into categories.
