import { images } from '../components/Images';

export const slides = [
  {
    key: 1,
    title: 'Start boosting your therapy!',
    text: 'Notes for Therapy was created to help you take notes and organize your thoughts to make the most of your therapy.',
    image: images.notesImage,
    //   backgroundColor: '#59b2ab',
  },
  // {
  //   key: 2,
  //   title: 'Start boosting your therapy!',
  //   text: 'Notes for Therapy was created to help you take notes and organize your thoughts to make the most of your therapy.',
  //   image: images.notesImage,
  //   //   backgroundColor: '#59b2ab',
  // },
  // {
  //   key: 3,
  //   title: 'Start boosting your therapy!',
  //   text: 'Notes for Therapy was created to help you take notes and organize your thoughts to make the most of your therapy.',
  //   image: images.notesImage,
  //   //   backgroundColor: '#59b2ab',
  // },

];
export const boxes = [
  {
    id: 0, title1: "Therapy", title2: "Notes"
  },
  // {
  //     id:1,title1:"Couple",title2:"Therapy"
  // },
  // {
  //     id:2,title1:"Group",title2:"Therapy/Other"
  // },
]
export const notesData = [
  {
    id: 0, date: "Mon-12-21", notes: "Lorem Ipsum is simply dummy text of the printing and...", time: "7:30 am ",
    image: images.redRightArrow
  },
  {
    id: 1, date: "Wed-11-22", notes: "Lorem Ipsum is simply dummy text of the printing and...", time: "7:30 am ",
    image: images.redRightArrow
  },
  {
    id: 2, date: "Wed-03-01", notes: "Lorem Ipsum is simply dummy text of the printing and...", time: "7:30 am ",
    image: images.redRightArrow
  },
  {
    id: 3, date: "Mon-02-12", notes: "Lorem Ipsum is simply dummy text of the printing and...", time: "7:30 am ",
    image: images.redRightArrow
  },
  {
    id: 4, date: "Wed-02-10", notes: "Lorem Ipsum is simply dummy text of the printing and...", time: "7:30 am ",
    image: images.redRightArrow
  },
]
export const notesDropdownList = [
  { label: 'Item 1', value: 'Note 1' },
  { label: 'Item 2', value: 'Note 2' },
  { label: 'Item 3', value: 'Note 3' },
  { label: 'Item 4', value: 'Note 4' },
  { label: 'Item 5', value: 'Note 5' },
  { label: 'Item 6', value: 'Note 6' },
  { label: 'Item 7', value: 'Note 7' },
  { label: 'Item 8', value: 'Note 8' },
];
export const ratingList = [
  { id: 0, num: 1, image: images.ratingCircle, isSelected: false },
  { id: 1, num: 2, image: images.ratingCircle, isSelected: false },
  { id: 2, num: 3, image: images.ratingCircle, isSelected: false },
  { id: 3, num: 4, image: images.ratingCircle, isSelected: false },
  { id: 4, num: 5, image: images.ratingCircle, isSelected: false },
  { id: 5, num: 6, image: images.ratingCircle, isSelected: false },
  { id: 6, num: 7, image: images.ratingCircle, isSelected: false },
  { id: 7, num: 8, image: images.ratingCircle, isSelected: false },
  { id: 8, num: 9, image: images.selectedRating, isSelected: false },
  { id: 9, num: 10, image: images.ratingCircle, isSelected: false },
]
export const previousWeakRatingList = [
  { id: 0, num: 1, isSelected: false },
  { id: 1, num: 2, isSelected: false },
  { id: 2, num: 3, isSelected: false },
  { id: 3, num: 4, isSelected: false },
  { id: 4, num: 5, isSelected: false },
  { id: 5, num: 6, isSelected: false },
  { id: 6, num: 7, isSelected: false },
  { id: 7, num: 8, isSelected: false },
  { id: 8, num: 9, isSelected: false },
  { id: 9, num: 10, isSelected: false },
]
export const titles = [
  { id: 0, title: "Therapy", isSelected: true },
  // { id: 1, title: "Challenges", count: "12", isSelected: false },
]
export const dummyData = [
  { id: 0, title: "Therapy", isSelected: true },
  { id: 1, title: "Challenges", count: "12", isSelected: false },
  { id: 2, title: "Therapyqwe", isSelected: true },
  { id: 3, title: "Challq   q", count: "12", isSelected: false },
  { id: 4, title: "Therq  ee", isSelected: true },
  { id: 5, title: "Challengeeqee d qd", count: "12", isSelected: false },
]
export const notesQuestions = [
  { id: 0, title: "Notes During Session", isSelected: true },
  { id: 1, title: "What I feel proud of this week!", isSelected: true },
  { id: 2, title: "Wins of the week ", count: "12", isSelected: false },
  { id: 3, title: "Challenges of the week ", isSelected: true },
  { id: 4, title: "Topics I want to talk about in therapy", count: "12", isSelected: false },
  { id: 5, title: "Write about your self care for the week ", isSelected: true },
  { id: 6, title: "General journal entry for the week ", count: "12", isSelected: false },
  { id: 7, title: "Growth or change I noticed over the week  ", count: "12", isSelected: false },
  { id: 8, title: "New things I tried this week  ", count: "12", isSelected: false },
  { id: 9, title: "Things to work on this week", count: "12", isSelected: false },
  { id: 10, title: "Other", count: "12", isSelected: false },


]
export const therapyList = [
  {
    id: 0, title: "Today Appointment @ 12:00", appointmentTime: "12:00", notificationAt: "1m ago.",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor sit amet, consectetur adipiscing elit.  "
  },
  {
    id: 1, title: "Today Appointment @ 12:00", appointmentTime: "12:00", notificationAt: "1m ago.",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor sit amet, consectetur adipiscing elit.  "
  },
  {
    id: 2, title: "Today Appointment @ 12:00", appointmentTime: "12:00", notificationAt: "1m ago.",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor sit amet, consectetur adipiscing elit.  "
  },
]
export const yearList = [
  { id: 0, title: "2010" },
  { id: 1, title: "2011" },
  { id: 2, title: "2012" },
  { id: 3, title: "2013" },
  { id: 4, title: "2014" },
  { id: 5, title: "2015" },
  { id: 6, title: "2016" },
  { id: 7, title: "2017" },
  { id: 8, title: '2018' },
  { id: 9, title: "2019" },
  { id: 10, title: "2020" },
  { id: 11, title: "2021" },
  { id: 12, title: "2022" },
  { id: 13, title: "2023" },
  { id: 14, title: "2024" },
  { id: 15, title: "2025" },
  { id: 16, title: "2026" },
  { id: 17, title: "2027" },
  { id: 18, title: "2028" },
  { id: 19, title: '2029' },
  { id: 20, title: "2030" },
  { id: 21, title: "2031" },
  { id: 22, title: '2032' },
  { id: 23, title: "2033" },
  { id: 24, title: '2034' },
  { id: 25, title: "2035" },
]
export const monthList = [
  { id: 1, title: "JAN", month: "1" },
  { id: 2, title: "FEB", month: "2" },
  { id: 3, title: "MAR", month: "3" },
  { id: 4, title: "APR", month: "4" },
  { id: 5, title: "MAY", month: "5" },
  { id: 6, title: "JUN", month: "6" },
  { id: 7, title: "JUL", month: "7" },
  { id: 8, title: "AUG", month: "8" },
  { id: 9, title: "SEP", month: "9" },
  { id: 10, title: "OCT", month: "10" },
  { id: 11, title: "NOV", month: "11" },
  { id: 12, title: "DEC", month: "12" }
]
export const weekList = [
  { id: 1, title: "WEEK-1" },
  { id: 2, title: "WEEK-2" },
  { id: 3, title: "WEEK-3" },
  { id: 4, title: "WEEK-4" },
  { id: 5, title: "WEEK-5" },
]
export const timimgs = [
  "2023-01-30 06:03 41",
  "2023-01-30 06:09 41",
  "2023-01-30 06:32 41",
  "2023-01-30 06:31 00",
  "2023-01-30 06:28 01",
  "2023-01-30 06:29 41",
  "2023-01-30 06:34 41",
]
export const SymptomsList = [
  { id: 0, Symptoms: 'general depression', isSelected: false },
  { id: 1, Symptoms: 'general anxiety', isSelected: false },
  { id: 2, Symptoms: 'high appetite', isSelected: false },
  { id: 3, Symptoms: 'low appetite', isSelected: false },
  { id: 4, Symptoms: 'brain fog', isSelected: false },
  { id: 5, Symptoms: 'feelings of isolation', isSelected: false },
  { id: 6, Symptoms: 'trouble sleeping/insomnia', isSelected: false },
  { id: 7, Symptoms: 'sleeping too much', isSelected: false },
  { id: 8, Symptoms: 'feelings of sadness', isSelected: false },
  { id: 9, Symptoms: 'feelings of hopelessness', isSelected: false },
  { id: 10, Symptoms: 'diminished interest or pleasure in hobbies or activities', isSelected: false },
  { id: 11, Symptoms: 'low energy', isSelected: false },
  { id: 12, Symptoms: 'feelings of worthlessness', isSelected: false },
  { id: 13, Symptoms: 'difficulty concentrating', isSelected: false },
  { id: 14, Symptoms: 'fatigue or lack of energy', isSelected: false },
  { id: 15, Symptoms: 'feelings of grief or sadness', isSelected: false },
  { id: 16, Symptoms: 'irritability', isSelected: false },
  { id: 17, Symptoms: 'phobia', isSelected: false },
  { id: 18, Symptoms: 'mania', isSelected: false },
  { id: 19, Symptoms: 'hypervigilence', isSelected: false },
  { id: 20, Symptoms: 'social anxiety', isSelected: false },
  { id: 21, Symptoms: 'avoidance', isSelected: false },
  { id: 22, Symptoms: 'sensations of panic', isSelected: false },
  { id: 23, Symptoms: 'panic attacks', isSelected: false },
  { id: 24, Symptoms: 'feeling on edge or restless', isSelected: false },
  { id: 25, Symptoms: 'intrusive or unwanted thoughts', isSelected: false },
  { id: 26, Symptoms: 'repetitious behaviors (e.g. handwashing, checking things)', isSelected: false },
  { id: 27, Symptoms: 'body dysmorphia', isSelected: false },
  { id: 28, Symptoms: 'difficulty discarding excessive items', isSelected: false },
  { id: 29, Symptoms: 'avoidance of anxiety/PTSD stimuli', isSelected: false },
  { id: 30, Symptoms: 'flashbacks', isSelected: false },
  { id: 31, Symptoms: 'dissociation', isSelected: false },
  { id: 32, Symptoms: 'nightmares', isSelected: false },
  { id: 33, Symptoms: 'inability to experience positive emotions', isSelected: false },
  { id: 33, Symptoms: 'other', isSelected: false },

]
export const tableData = [
  {
    data:{
      id:0,
      month:"2023-May",
      month:{
        weeks:[
          {
          week:"1",
          rating:9,
          addedWord:"added-word"
          },
          {
            week:"4",
            rating:9,
            addedWord:"added-word"
          },
      ]
      }

    }
  }
]