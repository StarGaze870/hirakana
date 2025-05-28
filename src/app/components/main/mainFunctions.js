// ------------------------------------ STOPWATCH ------------------------------------

import { MAX_PLAYERS } from "@/app/constants";

// username's space will be replaced as '_'
// streak = array
// lap = array
// c = count
// d = date
// t = time 

const STORING_SAMPLE_FORMAT = {

    // PARENT
    hirakana: {

        // MANY
        users: [
            {
                username: {
                    streak: [
                        { c: 1, d: 1 },
                        { c: 1, d: 1 },
                    ],
                    lap: [
                        { t: 1, d: 1 },
                        { t: 1, d: 1 },
                    ]
                },
            },
        ],

        // ONE
        selectedUser: 'username',
    }
}

export const formatTime = (ms) => {
    const minutes = String(Math.floor(ms / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
    const hundredths = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
    return `${minutes}:${seconds}:${hundredths}`;
};

export const getUsersData = () => {
    const data = JSON.parse(localStorage.getItem('hirakana') || '{}');
    if (!data.hirakana) {
        return [];
    }

    if (!data.hirakana['users']) {
        return [];
    }
    return data.hirakana['users'].map((e) => ({ ...e, username: decryptName(e.username), }));
}

export const insertNewUserName = (name) => {

    name = encryptName(name);
    let data = getRawData();
    let users = data.hirakana['users'] || [];

    users = insertUser(users, name);
    users = checkUsersLimit(users);
    data = setCurrentUserHelper(data, name)
    data.hirakana['users'] = users;

    storeData(data);
};

const getRawData = () => {
    try {
        return JSON.parse(localStorage.getItem('hirakana')) || { hirakana: {} };
    } catch {
        return { hirakana: {} };
    }
};

const storeData = (data) => {
    localStorage.setItem('hirakana', JSON.stringify(data));
}

const checkUsersLimit = (users) => {
    if (users.length > MAX_PLAYERS) {
        users = users.slice(0, MAX_PLAYERS);
    }
    return users;
}

const insertUser = (users, name) => {
    if (!users.some(u => u.username === name)) {
        users.unshift({ username: name, streak: [], lap: [] });
    }
    return users;
}

const setCurrentUserHelper = (data, name) => {
    data.hirakana['selectedUser'] = name;
    return data;
}

export const setCurrentUserSelected = (name) => {
    name = encryptName(name);
    let data = getRawData();
    data = setCurrentUserHelper(data, name)

    storeData(data);
};

export const getCurrentUser = () => {
    const data = getRawData();
    return decryptName(data.hirakana.selectedUser) || null;
}

const encryptName = (name) => {
    return name?.trim().replace(/ /g, '_');
}

const decryptName = (name) => {
    return name?.replace(/_/g, ' ');
}

// --------------- LIBRARY MODAL ----------------

const syllables = ['a', 'e', 'i', 'o', 'u', '_']

export const ConvertToTableForm = (data) => {
    ;
    const rowForm = {};

    syllables.forEach((s) => {
        rowForm[s] = [];
    });

    data.forEach((e) => {
        let matched = false;
        for (const x of syllables) {
            if (x !== '_' && e[1].includes(x)) {
                rowForm[x].push(e);
                matched = true;
                break;
            }
        }
        if (!matched) {
            rowForm['_'].push(e);
        }
    });

    return rowForm;
};

export const CreateRowsForTableForm = (arr) => {
    const res = [];
    const data = ConvertToTableForm(arr);
    const dataKeys = Object.keys(data).filter(key => key !== '_');

    const maxRows = Math.max(...dataKeys.map(key => data[key].length));

    for (let i = 0; i < maxRows; i++) {
        const row = {};

        dataKeys.forEach(key => {
            const cell = data[key][i];
            row[key] = cell
                ? { character: cell[0], romaji: cell[1] }
                : { character: '', romaji: '' };
        });

        res.push(row);
    }

    // REMAINING DATA THAT IS NOT A VOWEL
    const remaining = data['_'] || [];
    const columns = syllables.slice(0, -1);
    const rowsNeeded = Math.ceil(remaining.length / columns.length);

    let index = 0;

    for (let i = 0; i < rowsNeeded; i++) {
        const row = {};

        columns.forEach(key => {
            const cell = remaining[index++];
            row[key] = cell
                ? { character: cell[0], romaji: cell[1] }
                : { character: '', romaji: '' };
        });

        res.push(row);
    }

    return res;
}