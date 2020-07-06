import { ProjectInfo, ProjectTask, AppUser } from 'src/modules/server/Types';

//Credit: https://stackoverflow.com/questions/105034/how-to-create-guid-uuid
export const uuidv4 = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
});
///////

const colours = [
    'rgb(211, 13, 211)',
    'rgb(7, 182, 123)',
    'rgb(3, 180, 171)'
];

export const getColour = (index: number) => colours[index % colours.length];

export const testProjects: ProjectInfo[] = [{
    id: '1',
    title: 'Project 1',
    belongsToUser: true,
    isFavourite: true
}, {
    id: '2',
    title: 'Project 2',
    belongsToUser: true,
    isFavourite: false
}, {
    id: '3',
    title: 'Project 3',
    belongsToUser: false,
    isFavourite: false
}, {
    id: '4',
    title: 'Project 4',
    belongsToUser: false,
    isFavourite: false
}].map((item, index) => ({ ...item, colour: getColour(index) }));

export const getProjectLookup = projects => projects.reduce((acc, next) => ({ ...acc, [next.id]: next }), {});
export const toPositiveOption = item => ({ some: true, item });

export type TaskLookup = { [id: string]: ProjectTask[] };

export const tasks: TaskLookup = {
    '1': [{
        id: '1',
        projectId: '1',
        assignedTo: { email: 'john.smith@gmail.com', displayName: 'John Smith' },
        label: 'Task 1',
        description: 'First task',
        completed: false
    }, {
        id: '2',
        projectId: '1',
        assignedTo: { email: 'john.smith@gmail.com', displayName: 'John Smith' },
        label: 'Task 2',
        description: 'Second task',
        completed: false
    }, {
        id: '3',
        projectId: '1',
        assignedTo: { email: 'a.smith@gmail.com', displayName: 'Andrew' },
        label: 'Task 3',
        description: 'Third task',
        completed: false
    }, {
        id: '4',
        projectId: '1',
        assignedTo: { email: 'b.smith@gmail.com', displayName: 'Bill' },
        label: 'Task 4',
        description: 'Another task',
        completed: true
    }],
    '2': [{
        id: '5',
        projectId: '2',
        assignedTo: { email: 'j.smith@gmail.com', displayName: 'James' },
        label: 'Task 5',
        description: 'First task',
        completed: false
    }, {
        id: '6',
        projectId: '2',
        assignedTo: { email: 'j.smith@gmail.com', displayName: 'Josh' },
        label: 'Task 6',
        description: 'Second task',
        completed: false
    }, {
        id: '7',
        projectId: '2',
        assignedTo: { email: 'a.smith@gmail.com', displayName: 'Andrew' },
        label: 'Task 7',
        description: 'Third task',
        completed: false
    }, {
        id: '8',
        projectId: '2',
        assignedTo: { email: 'b.smith@gmail.com', displayName: 'Bob' },
        label: 'Task 8',
        description: 'Another task',
        completed: true
    }],
    '3': [],
    '4': []
};

export type MemberLookup = { [id: string]: AppUser[]};

export const commonUsers = [{
    email: 'john.smith@gmail.com',
    displayName: 'John Smith'
}, { 
    email: 'a.smith@gmail.com',
    displayName: 'Andrew' 
}, { 
    email: 'b.smith@gmail.com',
    displayName: 'Bill'
}, { 
    email: 'j.smith@gmail.com',
    displayName: 'Josh'
}]

export const members: MemberLookup = {
    '1': commonUsers,
    '2': commonUsers,
    '3': commonUsers,
    '4': commonUsers
};

export const flatten = (lookup: TaskLookup): ProjectTask[] => Object.keys(lookup).reduce((acc, next) => [ ...acc, ...lookup[next] ] , []);