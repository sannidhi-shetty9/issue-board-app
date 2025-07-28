import type { User } from "../types";

export const currentUser = {
    name: 'Alice',
    role: 'admin' // or 'contributor'
};

export const registeredUsers: User[] = [
    {
        id: 1,
        name: 'alice',
        role: 'admin'
    },
     {
        id: 2,
        name: 'bob',
        role: 'contributor'
    },
     {
        id: 3,
        name: 'carol',
        role: 'contributor'
    }
]
