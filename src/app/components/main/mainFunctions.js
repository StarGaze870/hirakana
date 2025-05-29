// ------------------------------------ STOPWATCH ------------------------------------

import { MAX_LAP_LOG, MAX_PLAYERS, MAX_STREAK_LOG } from "@/app/constants";

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
        users: {
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

// -------------------- LOCAL STORAGE -------------------------

export const getUsersData = () => {
    const data = getRawData();
    if (!data.hirakana) {
        return [];
    }

    if (!data.hirakana['users']) {
        return [];
    }

    return Object.entries(data.hirakana['users'])
        .map(([username, value]) => ({
            ...value,
            username: decryptName(username),
        }))
        .sort((a, b) => a.username.localeCompare(b.username));
}

export const insertNewUserName = (name) => {

    name = encryptName(name);
    let data = getRawData();
    let users = data.hirakana['users'] || {};

    users = insertUser(users, name);
    users = checkUsersLength(users);
    data = setCurrentUserHelper(data, name)
    data.hirakana['users'] = users;

    storeData(data);
};

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

export const saveStreakAndLap = (time, streakCount) => {
    let data = getRawData();
    const date = Date.now();

    data = saveCurrentStreak(data, streakCount, date)
    data = saveCurrentLapTime(data, time, date);
    storeData(data);
}

export const getStreakAndLap = () => {
    let data = getRawData();

    const currentUser = data.hirakana.selectedUser;
    if (!currentUser || !data.hirakana || !data.hirakana.users || !data.hirakana.users[currentUser]) {
        return { streak: [], lap: [] };
    }

    const streak = data.hirakana.users[currentUser].streak || [];
    const lap = data.hirakana.users[currentUser].lap || [];

    return { streak, lap }
}

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

const checkUsersLength = (users) => {
    const userEntries = Object.entries(users);

    if (userEntries.length > MAX_PLAYERS) {
        const limitedEntries = userEntries.slice(0, MAX_PLAYERS);
        return Object.fromEntries(limitedEntries);
    }

    return users;
};

const insertUser = (users, name) => {
    if (!users[name]) {
        users[name] = {
            streak: [],
            lap: []
        };
    }
    return users;
}

const setCurrentUserHelper = (data, name) => {
    data.hirakana['selectedUser'] = name;
    return data;
}

const encryptName = (name) => {
    return name?.trim().replace(/ /g, '_');
}

const decryptName = (name) => {
    return name?.replace(/_/g, ' ');
}

const saveCurrentLapTime = (data, time, date) => {

    const currentUser = data?.hirakana?.selectedUser;
    if (!currentUser || !data.hirakana || !data.hirakana.users || !data.hirakana.users[currentUser]) {
        return;
    }

    const existingData = data.hirakana.users[currentUser]['lap'] || []
    const newLapData = { t: time, d: date };
    data.hirakana.users[currentUser]['lap'] = sliceArrayData([newLapData, ...existingData], MAX_LAP_LOG);

    return data;
}

const saveCurrentStreak = (data, streakCount, date) => {

    const currentUser = data?.hirakana?.selectedUser;
    if (!currentUser || !data.hirakana || !data.hirakana.users || !data.hirakana.users[currentUser]) {
        return;
    }

    const existingData = data.hirakana.users[currentUser]['streak'] || []
    const newStreakData = { c: streakCount, d: date };
    data.hirakana.users[currentUser]['streak'] = sliceArrayData([newStreakData, ...existingData], MAX_STREAK_LOG);

    return data;
}

const sliceArrayData = (array, limit) => {
    if (array.length > limit) {
        array = array.slice(0, limit);
    }
    return array;
}

// ------------------------- LIBRARY MODAL ---------------------------

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

// ------------------------ COMMON FUNCTIONS --------------------------

export const DateNow_MMDDmmms = (timeStamp) => {
    const date = new Date(timeStamp);
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate();
    const time = date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    return `${month} ${day}, ${time}`;
}

const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

export const getComparator = (order, orderBy) => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}