import { Hiragana } from "../../public/texts/Hiragana";
import { Katakana } from "../../public/texts/Katakana";

export const MAX_PLAYERS = 100;
export const MAX_HISTORY_LOG = 10_000;
export const MAX_STREAK_LOG = 10_000;
export const MAX_LAP_LOG = 10_000;

export const ADD_NEW_PLAYER = 'New Player';

export const DIFFICULTY_EASY = 0;
export const DIFFICULTY_MEDIUM = 1;
export const DIFFICULTY_HARD = 2;

export const SIDE_BAR_LEFT_LAP_TABLE = true;
export const SIDE_BAR_LEFT_STREAK_TABLE = false;

export const HIRAKANA_ARRAY = Hiragana.concat(Katakana);

export const SIDE_BAR_LEFT_STREAK_HEADERS = [
    { id: 'streak', label: 'Best Streaks', minWidth: 5, fw: 'bold' },
    { id: 'date', label: 'Date', minWidth: 10 },
];

export const SIDE_BAR_LEFT_LAP_HEADERS = [
    { id: 'lap', label: 'Best Records', minWidth: 5, fw: 'bold' },
    { id: 'date', label: 'Date', minWidth: 10 },
];

export const STREAK_COLUMNS = [
    "streak",
    "date",
]

export const LAP_COLUMNS = [
    "lap",
    "date",
]

export const LEADERBOARDS_LAP_HEADERS = [
    { id: 'user', label: 'Player', minWidth: 5, fw: 'bold' },
    { id: 'time', label: 'Time', minWidth: 5, fw: 'bold' },
    { id: 'date', label: 'Date', minWidth: 10, fw: 'bold' },
]

export const LEADERBOARDS_STREAK_HEADERS = [
    { id: 'user', label: 'Player', minWidth: 5, fw: 'bold' },
    { id: 'streak', label: 'Streaks', minWidth: 5, fw: 'bold' },
    { id: 'date', label: 'Date', minWidth: 10, fw: 'bold' },
]

export const LEADERBOARDS_LAP_COLUMNS = [
    "user",
    "time",
    "date",
]

export const LEADERBOARDS_STREAK_COLUMNS = [
    "user",
    "streak",
    "date",
]