export const json = [
  {
    id: 'brand',
    question: '你更喜欢哪个汽车品牌？',
    answers: [
      { name: '奥迪', key: 'audi', next: 'audi-series' },
      { name: '宝马', key: 'bmw', next: 'bmw-series' },
      { name: '奔驰', key: 'benz', next: 'benz-series' },
    ],
  },
  {
    id: 'audi-series',
    question: '你更喜欢奥迪的哪个系列？',
    answers: [
      { name: 'A系列', key: 'a-series', next: 'a-model' },
      { name: 'Q系列', key: 'q-series', next: 'q-model' },
    ],
  },
  {
    id: 'bmw-series',
    question: '你更喜欢宝马的哪个系列？',
    answers: [
      { name: '1系列', key: '1-series', next: '1-model' },
      { name: '3系列', key: '3-series', next: '3-model' },
    ],
  },
  {
    id: 'benz-series',
    question: '你更喜欢奔驰的哪个系列？',
    answers: [
      { name: 'C系列', key: 'c-series', next: 'c-model' },
      { name: 'E系列', key: 'e-series', next: 'e-model' },
    ],
  },
  {
    id: 'a-model',
    question: '你更喜欢奥迪A系列的哪个车型？',
    answers: [
      { name: 'A3', key: 'a3', next: 'Thanks' },
      { name: 'A4', key: 'a4', next: 'Thanks' },
    ],
  },
  {
    id: 'q-model',
    question: '你更喜欢奥迪Q系列的哪个车型？',
    answers: [
      { name: 'Q5', key: 'q5', next: 'Thanks' },
      { name: 'Q7', key: 'q7', next: 'Thanks' },
    ],
  },
  {
    id: '1-model',
    question: '你更喜欢宝马1系列的哪个车型？',
    answers: [
      { name: '118i', key: '118i', next: 'Thanks' },
      { name: '120i', key: '120i', next: 'Thanks' },
    ],
  },
  {
    id: '3-model',
    question: '你更喜欢宝马3系列的哪个车型？',
    answers: [
      { name: '320i', key: '320i', next: 'Thanks' },
      { name: '328i', key: '328i', next: 'Thanks' },
    ],
  },
  {
    id: 'c-model',
    question: '你更喜欢奔驰C系列的哪个车型？',
    answers: [
      { name: 'C200L', key: 'c200l', next: 'Thanks' },
      { name: 'C300L', key: 'c300l', next: 'Thanks' },
    ],
  },
  {
    id: 'e-model',
    question: '你更喜欢奔驰E系列的哪个车型？',
    answers: [
      { name: 'E200L', key: 'e200l', next: 'Thanks' },
      { name: 'E300L', key: 'e300l', next: 'Thanks' },
    ],
  },
  {
    id: 'Thanks',
    question: '感谢您的回答',
    answers: [{ name: '再次填写', key: '0', next: 'brand' }],
  },
]